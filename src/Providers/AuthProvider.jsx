import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  /* Sign Up*/
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /*Sign Out */
  const logOut = () => {
    return signOut(auth);
  };
  /*Sign In */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /*google sign in */
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  /*On Auth State Change */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    user,
    setUser,
    signUp,
    logOut,
    login,
    loading,
    setLoading,
    signInWithGoogle,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
