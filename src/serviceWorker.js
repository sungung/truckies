// Convert environment variables to URL `search` parameters
const firebaseConfig = new URLSearchParams({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}).toString();

// Service worker URL w/config variables
const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js?${firebaseConfig}`;

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then(function (registration) {
        console.log("Registration successful, scope is:", registration.scope);
        return registration.scope;
      })
      .catch(function (err) {
        console.log("Service worker registration failed, error:", err);
        return err;
      });
  }
};