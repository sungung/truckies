import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword} from 'firebase/auth';

// Creating auth context  
const AuthContext = createContext();

// Using a combination of hooks and context makes it
// easy to access user anywhere in react app.
export const useAuth = () => {
  // Consuming auth context
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // initialise state from a function
  const [ state, setState ] = useState((loading, user) => {
    return {loading: !user, currentUser: user}
  });

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  }

  const changeEmail = (email) => {
    return updateEmail(state.currentUser, email);
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  const changePassword = (password) => {
    return updatePassword(state.currentUser, password);
  }

  // Side effect runs once after initial rendering 
  // because dependency is empty array.
  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ loading: false, currentUser: user });
    });
    // unsubcribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  const value = {
    state,
    login,
    signup,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
  }

  if (state.loading){
    return <div>Loading !!!</div>
  }
  return (
    // Provide auth context to pass current value object to the children tree.
    // When context value is changed, all of consumbers are being notified
    // and re-rendered.
    <AuthContext.Provider value={ value }>
      {!state.loading && children}
    </AuthContext.Provider>
  )
};
