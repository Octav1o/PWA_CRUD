import axios from "axios"

const API_BASE_URL = 'https://pwaback-production-2ffd.up.railway.app/api/notifications' || ''

export const sendPushSubscription = async(subscription: PushSubscription, payload: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/subscribe`, {
            subscription,
            payload
        });

        console.log('Subscripcion enviada con exito', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error al enviar la suscripcion al backend: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al enviar la suscripcion');
    }
}

export const sendPushNotification = async (subscription: PushSubscription, title: string, body: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/subscribe`, {
            subscription,  // Aquí debes obtener la suscripción activa
            payload: 'Nuevo contenido disponible'  // Este es el mensaje que se enviará en la notificación
        });
        console.log('Respuesta del backend', response.data);
    } catch (error: any) {
        console.error('Error sending notification: ', error.response?.data || error.message);
        throw new Error('Failed to send notification');
    }
};