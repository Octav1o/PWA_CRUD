import React, { useEffect } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import SavedMovies from './components/SavedMovies';
import { Movie } from './models/Movie';
import { registerPushNotifications } from './serviceWorkerRegistration';
import { sendPushSubscription } from './services/apiService';

const App: React.FC = () =>   {

  const handleSaveToLocalStorage = (movie: Movie) => {
    const currentSavedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
    const updateSavedMovies = [...currentSavedMovies, movie];
    localStorage.setItem('savedMovies', JSON.stringify(updateSavedMovies));
  }

  useEffect(() => {
    const initPushNotifications = async () => {
      if('Notification' in window) {
        const permission = await Notification.requestPermission();
        if(permission === 'granted') {
          console.log('Notificaciones permitidas');

          try {
            const subscription = await registerPushNotifications();
            if(subscription) {
              await sendPushSubscription(subscription, 'Bienvenido a nuestra app de peliculas')
            }
          } catch (error) {
            console.error('Error configurando las notificaciones push: ', error);
          }
        } else {
          console.error('Permiso de notificaciones denegado');
        }
      }
    }

    initPushNotifications();
  }, []);

  return (
    <div className="App">
      <h1>Movies App</h1>
      <MovieForm/>
      <MovieList onSaveToLocalStorage={handleSaveToLocalStorage}/>
      <SavedMovies/>
    </div>
  );
}

export default App;