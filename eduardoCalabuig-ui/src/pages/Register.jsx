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
  exit:    { opacity: 0, y: 10 },
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <NavBar alwaysLight />

      <main>
        <div className="container containerLogin">
          <div className="row pt-5 gx-0">
            {/* Formulario: ocupa 12 cols en móvil, 6 en md+ */}
            <div className="col-12 col-md-6 mt-5 containerFormLogin">
              <motion.p
                className="text-center fs-1 fw-semibold pb-2"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8 }}
              >
                Regístrate
              </motion.p>

              <form className="login-form px-4" autoComplete="off">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="login-input"
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Apellidos"
                  className="login-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="login-input"
                  required
                />

                {/* Contraseña */}
                <div className="password-wrapper position-relative mb-3">
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

                {/* Repite contraseña */}
                <div className="password-wrapper position-relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repite contraseña"
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

                                {/* Checkboxes finales */}
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    id="acceptEmail"
                    name="acceptEmail"
                    className="form-check-input"
                  />
                  <label htmlFor="acceptEmail" className="form-check-label">
                    Acepto recibir contenido de Eduardo Calabuig vía email
                  </label>
                </div>
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="form-check-input"
                    required
                  />
                  <label htmlFor="terms" className="form-check-label">
                    He leído y entendido los{' '}
                    <Link to="/terms" className="text-decoration-none linkTerms text-dark fw-semibold">
                      Términos &amp; Condiciones
                    </Link>{' '}
                    *
                  </label>
                </div>

                <button type="submit" className="login-button w-100 mb-0">
                  Registrarse
                </button>

                <p className="login-footer mt-3 mb-2 text-center">
                  ¿Ya tienes cuenta?{' '}
                  <Link to="/login" className="fw-semibold">
                    Inicia Sesión
                  </Link>
                </p>
              </form>
            </div>

            {/* Imagen: oculta en xs/sm, muestra en md+ */}
            <motion.div
              className="col-md-6 d-none d-md-block pt-5 position-relative columnClip"
              layoutId="hero-image-wrapper"
            >
              <motion.img
                src={Hero}
                alt="Registro"
                className="w-100 imagenLogin"
                layoutId="hero-image"
              />
              <motion.p
                className="textLogin"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                transformTemplate={(props, generated) =>
                  `translate(-50%, -50%) ${generated}`
                }
              >
                ¡Únete a nuestro espacio de inspiración!
              </motion.p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
