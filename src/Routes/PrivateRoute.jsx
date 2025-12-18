import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading } = useContext(AuthContext);

  if (loading || roleLoading) {
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-infinity loading-xl"></span>
    </div>;
  }

  if(!user) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
