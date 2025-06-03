import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { motion } from "framer-motion";

import CookieConsent from "./components/CookieConsent";

import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import Proyectos from "./pages/Proyectos";
import ExteriorIbizenco from "./pages/Projects/ExteriorIbizenco";
import Cocina from "./pages/Projects/Cocina";
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import Noticias from "./pages/Noticias";
import EstiloIbizenco from "./pages/Notices/EstiloIbizenco";
import Error404 from "./pages/Error404";
import Productos from "./pages/Productos";
import ProductoDetallado from "./pages/Products/ProductoDetallado";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaCookies from "./pages/PoliticaCookies";
import Privacidad from "./pages/Privacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const pageTransition = {
  duration: 3,
  ease: "easeInOut",
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
            path="/proyectos/exteriorIbizenco"
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
            path="/noticias"
            element={
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={pageTransition}
              >
                <Noticias />
              </motion.div>
            }
          />
          <Route
            path="/noticias/estiloIbizenco"
            element={
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={pageTransition}
              >
                <EstiloIbizenco />
              </motion.div>
            }
          />
          <Route
            path="/productos"
            element={
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={pageTransition}
              >
                <Productos />
              </motion.div>
            }
          />
          <Route path="/productos/:id" element={<ProductoDetallado />} />

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
          <Route
            path="/avisoLegal"
            element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={pageTransition}
              >
                <AvisoLegal />
              </motion.div>
            }
          />
          <Route
            path="/politicaCookies"
            element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={pageTransition}
              >
                <PoliticaCookies />
              </motion.div>
            }
          />
          <Route
            path="/politicaPrivacidad"
            element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={pageTransition}
              >
                <Privacidad />
              </motion.div>
            }
          />
          <Route
            path="/terminosCondiciones"
            element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={pageTransition}
              >
                <TerminosCondiciones />
              </motion.div>
            }
          />
          {/* ======= Ruta catch-all 404 ======= */}
          <Route
            path="*"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Error404 />
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
    <>
      <CookieConsent />
      <BrowserRouter>
        {/* ScrollToTop asegura que cada cambio de ruta haga scroll al top */}
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}
