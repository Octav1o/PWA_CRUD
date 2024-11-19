import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


serviceWorkerRegistration.register();

reportWebVitals();

  if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        // .then(reg => {
        //   console.log('Service Worker registered!')
        // })
        // .catch(err => {
        //   console.error('Service Worker registration failed:', err)
        // })
    })
  }

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/service-worker.js', {
  //     scope: '/'
  //   }).then((registration) => {
  //     console.log('Service Worker registrado con éxito', registration);
  //   }).catch((error) => {
  //     console.error('Error al registrar el Service Worker:', error);
  //   });
  // }