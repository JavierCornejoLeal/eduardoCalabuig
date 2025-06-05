// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// Comprueba si el usuario está autenticado; si no, redirige a /login
const PrivateRoute = ({ children }) => {
  // Obtenemos el objeto usuario de sessionStorage (o el token)
  const storedUser = sessionStorage.getItem("user");
  const authToken = sessionStorage.getItem("auth_token");

  // Consideramos “autenticado” si existe cualquiera de los dos
  const isLoggedIn = !!storedUser && !!authToken;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
