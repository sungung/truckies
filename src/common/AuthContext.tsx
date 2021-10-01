import React, { useState, useEffect, useContext, createContext } from 'react';
import fireabaseApp from './firebase';
import firebase from 'firebase/app';

export interface IState {
  loading: boolean;
  currentUser: firebase.User | null;
}

export interface IAuthCtx {
  state: IState,
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
  changeEmail: (email: string) => Promise<void> | undefined,
  changePassword: (password: string) => Promise<void> | undefined
}

// Creating auth context  
const AuthContext = createContext<IAuthCtx|null>(null);

// Using a combination of hooks and context makes it
// easy to access user anywhere in react app.
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children } ) => {
  // initialise state from a function
  const [ state, setState ] = useState<IState>({loading: true, currentUser: null});

  const signup = (email: string, password: string) => {
    return fireabaseApp.auth().createUserWithEmailAndPassword(email, password);
  };
  
  const login = (email: string, password: string) => {
    return fireabaseApp.auth().signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return fireabaseApp.auth().signOut();
  }

  const changeEmail = (email: string) => {
    return fireabaseApp.auth().currentUser?.updateEmail(email);
  }

  const resetPassword = (email: string) => {
    return fireabaseApp.auth().sendPasswordResetEmail(email);
  }

  const changePassword = (password: string) => {
    return fireabaseApp.auth().currentUser?.updatePassword(password);
  }

  // Side effect runs once after initial rendering 
  // because dependency is empty array.
  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = fireabaseApp.auth().onAuthStateChanged((user) => {
      setState({ loading: false, currentUser: user });
    });
    // unsubcribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  const AuthCtx : IAuthCtx = {
    state,
    login,
    signup,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
  }

  if (state?.loading){
    return <div>Loading !!!</div>
  }

  return (
    // Provide auth context to pass current value object to the children tree.
    // When context value is changed, all of consumbers are being notified
    // and re-rendered.
    <AuthContext.Provider value={ AuthCtx }>
      {!state.loading && children}
    </AuthContext.Provider>
  )
};
