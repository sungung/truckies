// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyB7piu4CcSLKkEG3sY_B4ODU8-0La0kO34',
  authDomain: 'test-react-auth-83920.firebaseapp.com',
  databaseURL: 'https://test-react-auth-83920-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'test-react-auth-83920',
  storageBucket: 'test-react-auth-83920.appspot.com',
  messagingSenderId: '210103557637',
  appId: '1:210103557637:web:059d6b60d985b11a43066c'        
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});