import firebase from "firebase";
import firebaseApp from "../common/firebase"

const firebaseUIConfig : firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUr) => {
      firebaseApp.firestore().collection('drivers').doc(authResult.user.uid).set({
        name: authResult.user.displayName, 
        email: authResult.user.email
      })
      .catch((error) => {
        console.error("Error writing driver details: ", error);
      });
      // Avoid redirects after sign-in.
      return false;
    },
  },
};

export default firebaseUIConfig;