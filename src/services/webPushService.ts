import axios from "axios";

const VAPID_PUBLIC_KEY = 'BEVgcQRoKkL6DslTvFX7LYdqpvpUeyqhAtfUxLhnz7hAures9TIUF7OBcmPHNQME0ZGhCtNDWjkO3VvcZbpnIi4';
console.log('Clave publica', VAPID_PUBLIC_KEY);
let isSubscribed = false;

export const urlBase64ToUin8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  console.log('Base64 con padding y sustituciones: ', base64);
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  console.log('Datos decodificados: ', rawData)

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};


// export const subscribeToPushNotifications = async (): Promise<PushSubscription | null> => {
//   if ("serviceWorker" in navigator && "PushManager" in window) {
//     try {
//       const registration = await navigator.serviceWorker.ready;

//       const applicationServerKey = urlBase64ToUin8Array(
//         VAPID_PUBLIC_KEY!
//       );

//       // Crear la suscripción
//       const subscription = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: applicationServerKey,
//       });

//       console.log("Suscripción a notificaciones push creada:", subscription);

//       // Ahora puedes enviar esta suscripción al backend
//       await sendPushSubscriptionToBackend(subscription);
//     } catch (error) {
//       console.error("Error al crear la suscripción push:", error);
//     }
//   }
//   return null;
// };


export const subscribeToPushNotifications = async (): Promise<PushSubscription | null> => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      // Si ya hemos hecho la suscripción, no volvemos a intentar crearla
      if (isSubscribed) {
        console.log("Ya existe una suscripción activa.");
        return null;
      }

      const registration = await navigator.serviceWorker.ready;

      // Verificar si ya existe una suscripción activa
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("Ya existe una suscripción activa:", existingSubscription);
        isSubscribed = true; // Marcamos como suscrito para evitar crear otra suscripción
        return existingSubscription; // Si ya hay una suscripción activa, no creamos una nueva.
      }

      // Si no existe, crear una nueva suscripción
      const applicationServerKey = urlBase64ToUin8Array(VAPID_PUBLIC_KEY!);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });

      console.log("Nueva suscripción a notificaciones push creada:", subscription);

      // Ahora puedes enviar esta suscripción al backend
      await sendPushSubscriptionToBackend(subscription);

      isSubscribed = true; // Marcamos como suscrito
      return subscription;
    } catch (error) {
      console.error("Error al crear la suscripción push:", error);
    }
  }
  return null;
};

const sendPushSubscriptionToBackend = async (
  subscription: PushSubscription
) => {
  try {
    const response = await axios.post(
      "https://pwaback-production-2ffd.up.railway.app/api/notifications/subscribe",
      {
        subscription,
        payload: "Nuevo contenido disponible", // Mensaje que quieres enviar
      }
    );
    console.log("Suscripción enviada al backend:", response.data);
  } catch (error) {
    console.error("Error al enviar la suscripción al backend:", error);
  }
};
