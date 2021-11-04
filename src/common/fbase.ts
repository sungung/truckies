import firebase from 'firebase';
import {auth as uiAuth} from 'firebaseui';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID      
};

const fbase = firebase.initializeApp(config);

/* Comment out if want to play with local emulator
 *
if (window.location.hostname === "localhost") {
  fireabaseApp.functions().useEmulator("localhost", 5001);
  fireabaseApp.auth().useEmulator("http://localhost:9099");
  fireabaseApp.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
  fireabaseApp.database().useEmulator("localhost", 9000);
}
*/

export const fbaseui : firebaseui.auth.Config = {
  //signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      clientId: "210103557637-bqsdsdnu1e69ml4eo68p8bhfse461r9d.apps.googleusercontent.com",
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID,   
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image', // 'audio'
        size: 'normal', // 'invisible' or 'compact'
        badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
      },
      defaultCountry: 'AU', 
      defaultNationalNumber: '1234567890',
      loginHint: '+621234567890'
    },
  ],
  credentialHelper: uiAuth.CredentialHelper.GOOGLE_YOLO,
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUr) => {
      // Avoid redirects after sign-in.
      return false;
    },
  },
};

export const fmessage = fbase.messaging();

export const fstore = fbase.firestore();

export default fbase;

