import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

import NavBar from "../components/NavBar";
import Hero from "../assets/images/projects/exterior2.webp";
import "../assets/styles/login.css";

const textVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 10 }
};

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [recovering, setRecovering] = useState(false);

  return (
    <>
      <NavBar alwaysLight />
      <main>
        <div className="container containerLogin">
          <div className="row pt-5 gx-0">
            {/* If recovering, show only recovery form */}
            {!recovering ? (
              // Login view
              <>
                {/* OCULTA EN MÓVIL, MUESTRA EN MD+ */}
                <motion.div
                  className="col-md-6 d-none d-md-block pt-5 columnClip"
                  layoutId="hero-image-wrapper"
                >
                  <motion.img
                    src={Hero}
                    alt="Login"
                    className="w-100 imagenLogin"
                    layoutId="hero-image"
                  />
                  <motion.p
                    className="textLogin"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transformTemplate={(props, generated) =>
                      `translate(-50%, -50%) ${generated}`
                    }
                    transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                  >
                    ¡Bienvenido, a tu<br/>espacio de inspiración!
                  </motion.p>
                </motion.div>

                {/* EN MÓVIL OCUPA 12 COLUMNAS, EN MD+ 6 */}
                <div className="col-12 col-md-6 mt-5 columnClip containerFormLogin">
                  <motion.p
                    className="text-center fs-1 fw-semibold pb-5"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
                  >
                    Login
                  </motion.p>

                  <form className="login-form px-4" autoComplete="off">
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className="login-input"
                      required
                    />
                    <div className="password-wrapper position-relative mb-4">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        className="login-input password-input"
                        required
                      />
                      <span
                        className="password-toggle-icon"
                        onClick={() => setShowPassword(p => !p)}
                      >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </span>
                    </div>

                    <div className="login-forgot text-center mb-4">
                      <button
                        type="button"
                        className="btn btn-link login-forgot-password"
                        onClick={() => setRecovering(true)}
                      >
                        ¿Has olvidado tu contraseña?
                      </button>
                    </div>

                    <button type="submit" className="login-button w-100 mb-3">
                      Acceder
                    </button>

                    <p className="login-footer mt-3 text-center">
                      No tienes cuenta?{' '}
                      <Link to="/register" className="fw-semibold">
                        Crear cuenta
                      </Link>
                    </p>
                  </form>
                </div>
              </>
            ) : (
              // Recovery view
              <div className="col-12 col-md-6 offset-md-3 mt-5 containerFormLogin">
                <motion.p
                  className="text-center fs-1 fw-semibold pb-4"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.8 }}
                >
                  Recuperar contraseña
                </motion.p>
                <form className="login-form px-4" autoComplete="off">
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="login-input mb-4"
                    required
                  />
                  <button type="submit" className="login-button w-100 mb-3">
                    Recuperar
                  </button>
                </form>
                <p className="login-footer text-center">
                  ¿Recuerdas tu contraseña?{' '}
                  <button
                    type="button"
                    className="btn btn-link login-forgot-password"
                    onClick={() => setRecovering(false)}
                  >
                    Volver al inicio de sesión
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default LogIn;