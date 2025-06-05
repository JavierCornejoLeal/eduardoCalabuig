import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const storedUser = sessionStorage.getItem("user");
  const authToken = sessionStorage.getItem("auth_token");

  const isLoggedIn = !!storedUser && !!authToken;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
