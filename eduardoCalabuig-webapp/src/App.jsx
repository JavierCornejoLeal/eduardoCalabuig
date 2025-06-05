// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Productos from "./pages/Productos";
import Clientes from "./pages/Clientes";
import Analytics from "./pages/Analytics";
import Pedidos from "./pages/Pedidos";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas: solo Admin (se envuelven en PrivateRoute) */}
        <Route
          path="/productos"
          element={
            <PrivateRoute>
              <Productos />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <Pedidos />
            </PrivateRoute>
          }
        />

        {/* Ruta comodín: muestra Error404 si la URL no coincide */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
