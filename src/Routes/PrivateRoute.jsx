import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);

  if (loading || roleLoading) {
    return <div className="flex justify-center items-center min-h-screen">
    <span className="loading loading-infinity w-24 h-24"></span>
  </div>;
  }

  if(!user || !userStatus=='active') {
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
