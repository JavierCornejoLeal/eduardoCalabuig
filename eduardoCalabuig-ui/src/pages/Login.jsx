import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

import NavBar from "../components/NavBar";
import SEO from "../components/SEO";

import Hero from "../assets/images/projects/exterior2.webp";
import "../assets/styles/login.css";

const textVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recovering, setRecovering] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      // Realiza la solicitud POST para iniciar sesión
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        userData
      );

      // Si la respuesta es exitosa, guarda el token
      if (response.data.token) {
        sessionStorage.setItem("auth_token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      }    } catch (error) {
      // Manejo de errores
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Hubo un error al iniciar sesión.");
      }
    }
  };

  return (
    <>
      <SEO
        title="Diseño de Interiorismo | Inicio de sesión"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint="login"
      />
      <NavBar alwaysLight />
      <main>
        <div className="container containerLogin">
          <div className="row pt-5 gx-0">
            {!recovering ? (
              <>
                <motion.div
                  className="col-md-6 d-none d-md-block pt-5 columnClip"
                  layoutId="hero-image-wrapper"
                >
                  <motion.img
                    src={Hero}
                    alt="Eduardo Calabuig Interiorismo Login"
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
                    ¡Bienvenido, a tu
                    <br />
                    espacio de inspiración!
                  </motion.p>
                </motion.div>

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

                  <form
                    className="login-form px-4"
                    autoComplete="off"
                    onSubmit={handleLogin}
                  >
                    {errorMessage && (
                      <p className="error-message text-center">
                        {errorMessage}
                      </p>
                    )}

                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className="login-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <div className="password-wrapper position-relative mb-4">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        className="login-input password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="password-toggle-icon"
                        onClick={() => setShowPassword((p) => !p)}
                      >
                        {showPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
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
                      No tienes cuenta?{" "}
                      <Link to="/register" className="fw-semibold">
                        Crear cuenta
                      </Link>
                    </p>
                  </form>
                </div>
              </>
            ) : (
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
                  ¿Recuerdas tu contraseña?{" "}
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
