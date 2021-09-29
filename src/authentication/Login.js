import { useState } from "react";
import { useAuth } from "../common/AuthContext";
import { Redirect } from "react-router-dom";
import { FirebaseAuth } from "react-firebaseui";
import firebaseApp from "../common/firebase";
import firebaseUIConfig from "../common/firebaseUI";

const Login = () => {
  const { state } = useAuth();

  return (
    <>
      {!!state.currentUser ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <div>
          <p>Please Sign In</p>
          <FirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={firebaseApp.auth()} />
        </div>
      )}
    </>
  )
}

export default Login;