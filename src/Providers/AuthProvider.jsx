import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
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

  /*On Auth State Change */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const authInfo = { user, setUser, signUp, logOut, login };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
