import React, { useState, useEffect, useContext, createContext, FC } from "react";
import fbase, { fmessage } from "./fbase";
import firebase from "firebase";
import { persistUser } from "./userManage";

export interface IUserContext {
  state: {
    loading: boolean,
    currentUser: firebase.User,

  },
  logout: () => Promise<void>,
  changePassword: (password: string) => Promise<void> | undefined
}

// Creating empty auth context
const UserContext = createContext<IUserContext>({} as IUserContext);

// Using a combination of hooks and context makes it
// easy to access user anywhere in react app.
export const useUser = () => useContext(UserContext);

export const UserProvider: FC = ({ children }) => {

  // initialise state from a function
  const [ state, setState ] = useState({ loading: true,  currentUser: {} as any });

  const logout = () => {
    return fbase.auth().signOut();
  }

  const changePassword = (password: string) => {
    return fbase.auth().currentUser?.updatePassword(password);
  }

  // Side effect runs once after initial rendering 
  // because dependency is empty array.
  // TODO housekeeping obsolete tokens in firestore
  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = fbase.auth().onAuthStateChanged((user) => {
      setState({ loading: false, currentUser: user });
      if (!!user) {
        // User is signed in
        fmessage.getToken({vapidKey: process.env.REACT_APP_FIREBASE_VAPIDKEY})
        .then((token) => {
          if (token) {
            persistUser(user, token);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((error) => {
          console.error("An error occurred while retrieving token. ", error);
        });        
      } else {
        // User is signed out
      }
    });
    // unsubcribe to the listener when unmounting
    return () => {
      // TODO remove a token from user? fb creating a new token
      // whenever regist service worker in browser
      unsubscribe();
    }
  }, []);

  if (state?.loading){
    return <div>Loading...</div>
  }

  return (
    // Provide auth context to pass current value object to the children tree.
    // When context value is changed, all of consumbers are being notified
    // and re-rendered.
    <UserContext.Provider value={{ state, logout, changePassword }}>
      {!state.loading && children}
    </UserContext.Provider>
  )
};

export default useUser
