import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const registerWithEmailPassword = (email, pass) => {
    // console.log(email, pass);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const handleGoogleSignin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  console.log(user);
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // console.log(currentUser);
    });


    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(()=>{
    if(!user) return;
     axios.get(`http://localhost:5001/users/role/${user.email}`).then((res) => {
      setRole(res.data.role);
      setRoleLoading(false)
    })
  },[user])

// console.log(role);


  const authData = {
    registerWithEmailPassword,
    setUser,
    user,
    loading,
    setLoading,
    handleGoogleSignin,
    role,
    roleLoading
  };

  // return <AuthContext value={authData}>{children}</AuthContext>;
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
