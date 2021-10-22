import firebase from "firebase";
//import * as firebaseui from 'firebaseui'
const firebaseui = require('firebaseui');
const fbaseui : firebaseui.auth.Config = {
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
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUr) => {
      // Avoid redirects after sign-in.
      return false;
    },
  },
};

export default fbaseui;