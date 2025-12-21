import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  const location = useLocation();

  // console.log(userStatus);
  // console.log(loading);
  // console.log(roleLoading);

  // 1️⃣ Wait for Firebase auth to resolve
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity w-24 h-24"></span>
      </div>
    );
  }

  // 2️⃣ After auth resolved — user not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3️⃣ User exists — wait for role
  if (roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity w-24 h-24"></span>
      </div>
    );
  }

  // console.log("hello");

  // 4️⃣ User inactive
  if (userStatus !== "active") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
