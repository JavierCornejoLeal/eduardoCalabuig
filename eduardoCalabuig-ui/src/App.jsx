// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { motion } from "framer-motion";

import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import Proyectos from "./pages/Proyectos";
import ExteriorIbizenco from "./pages/Projects/ExteriorIbizenco";
import Cocina from "./pages/Projects/Cocina";
import LogIn from "./pages/Login";
import Register from "./pages/Register";

const pageTransition = {
  duration: 3,
  ease: "easeInOut"
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <LayoutGroup>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={pageTransition}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/contacto"
            element={
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={pageTransition}
              >
                <Contacto />
              </motion.div>
            }
          />
          <Route
            path="/proyectos"
            element={
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={pageTransition}
              >
                <Proyectos />
              </motion.div>
            }
          />
          <Route
            path="/proyectos/exterior-ibizenco"
            element={
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={pageTransition}
              >
                <ExteriorIbizenco />
              </motion.div>
            }
          />
          <Route
            path="/proyectos/cocina"
            element={
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={pageTransition}
              >
                <Cocina />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={pageTransition}
              >
                <LogIn />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={pageTransition}
              >
                <Register />
              </motion.div>
            }
          />
        </Routes>
      </LayoutGroup>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
