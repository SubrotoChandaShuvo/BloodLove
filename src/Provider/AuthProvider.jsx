import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
  const [userStatus, setUserStatus] = useState(null);
  const [isFatching, setIsFatching] = useState(false);

  const registerWithEmailPassword = (email, pass) => {
    // console.log(email, pass);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  // Detect mobile browsers
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const handleGoogleSignin = () => {
    if (isMobile) {
      // On mobile, use redirect (popups get blocked)
      return signInWithRedirect(auth, googleProvider);
    }
    return signInWithPopup(auth, googleProvider);
  };

  console.log(user);

  // Handle redirect result after returning from Google login on mobile
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
          // Save user to DB
          axios.post("https://bloodlove.vercel.app/users", {
            email: result.user.email,
            name: result.user.displayName,
            mainPhotoUrl: result.user.photoURL,
            blood: "Unknown",
            district: "Unknown",
            upazila: "Unknown",
          }).catch(() => {});
          // Navigate home after returning from Google redirect
          window.location.href = "/";
        }
      })
      .catch((err) => console.error("Redirect result error:", err));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => { unsubscribe(); };
  }, []);

  // useEffect(() => {
  //   if (!user) return;
  //   axios.get(`https://bloodlove.vercel.app/users/role/${user.email}`).then((res) => {
  //     setRole(res.data.role);
  //     setUserStatus(res.data.status);
  //     setRoleLoading(true);
  //   });
  // }, [user]);

  useEffect(() => {
    setRoleLoading(true);

    const controller = new AbortController();

    if (user) {
      axios
        .get(`https://bloodlove.vercel.app/users/role/${user.email}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setRole(res.data.role);
          // console.log(res.data);
          setUserStatus(res.data.status);
        })
        .catch((err) => {
          if (err.name !== "CanceledError") {
            console.error(err);
            setRole("");
            setUserStatus("");
          }
        })
        .finally(() => {
          setRoleLoading(false);
        });
    }

    // Cleanup to prevent cascading renders
    return () => controller.abort();
  }, [user, isFatching]);

  // console.log(role);

  const authData = {
    registerWithEmailPassword,
    setUser,
    user,
    loading,
    setLoading,
    handleGoogleSignin,
    role,
    roleLoading,
    userStatus,
    setIsFatching,
  };

  // return <AuthContext value={authData}>{children}</AuthContext>;
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
