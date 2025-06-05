import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import api from "../utils/api";

import NavBar from "../components/NavBar";
import SEO from "../components/SEO";

import Hero from "../assets/images/projects/exterior2.webp";
import "../assets/styles/login.css";

const textVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo se permiten letras y espacios")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(30, "El nombre no puede superar los 30 caracteres"),
  surname: yup
    .string()
    .required("Los apellidos son obligatorios")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo se permiten letras y espacios")
    .min(2, "Los apellidos deben tener al menos 2 caracteres")
    .max(30, "Los apellidos no pueden superar los 30 caracteres"),
  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .email("Formato de correo inválido")
    .test(
      "email-domain",
      "Solo se permiten correos de Gmail, Hotmail, Outlook, Yahoo y ProtonMail",
      (value) => {
        if (!value) return false;
        // Dominios permitidos
        const allowedDomains = [
          "gmail.com",
          "hotmail.com",
          "outlook.com",
          "yahoo.com",
          "protonmail.com",
          "icloud.com",
          "live.com",
          "msn.com",
        ];
        const domain = value.split("@")[1]?.toLowerCase();
        return allowedDomains.includes(domain);
      }
    ),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_.])[A-Za-z\d@$!%*?&\-_.]+$/,
      "La contraseña debe contener mayúsculas, minúsculas, números y símbolos"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Confirma la contraseña"),
  terms: yup.bool().oneOf([true], "Debes aceptar los términos y condiciones"),
  acceptEmail: yup.bool(),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      apellidos: data.surname,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
    };

    try {
      // Realizar la petición a la API
      const response = await api.createData("register", userData);

      const token = response.data.token;

      if (token) {
        // Guardar el token en localStorage o sessionStorage
        sessionStorage.setItem("auth_token", token);

        // Redirigir al login después de un registro exitoso
        navigate("/login");
      } 
    } catch (error) {
      if (error.response) {
        // Error de respuesta del servidor (e.g., el correo ya está registrado)
        console.error("Error al crear el usuario:", error.response.data);
      } else {
        // Error de red o de conexión
        console.error("Error de red:", error);
      }
    }
  };

  return (
    <>
      <SEO
        title="Diseño de Interiorismo | Registrate"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint="register"
      />
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

              <form
                className="login-form px-4"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  placeholder="Nombre"
                  className={`login-input ${errors.name ? "input-error" : ""}`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}

                <input
                  type="text"
                  placeholder="Apellidos"
                  className={`login-input ${
                    errors.surname ? "input-error" : ""
                  }`}
                  {...register("surname")}
                />
                {errors.surname && (
                  <p className="error-message">{errors.surname.message}</p>
                )}

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className={`login-input ${errors.email ? "input-error" : ""}`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}

                {/* Contraseña */}
                <div className="password-wrapper position-relative mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    className={`login-input password-input ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password")}
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
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}

                {/* Repite contraseña */}
                <div className="password-wrapper position-relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Repite contraseña"
                    className={`login-input password-input ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    {...register("confirmPassword")}
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
                {errors.confirmPassword && (
                  <p className="error-message">
                    {errors.confirmPassword.message}
                  </p>
                )}

                {/* Checkboxes finales */}
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    id="acceptEmail"
                    {...register("acceptEmail")}
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
                    {...register("terms")}
                    className="form-check-input"
                  />
                  <label htmlFor="terms" className="form-check-label">
                    He leído y entendido los{" "}
                    <Link
                      to="/terms"
                      className="text-decoration-none linkTerms text-dark fw-semibold"
                    >
                      Términos &amp; Condiciones
                    </Link>{" "}
                    *
                  </label>
                </div>
                {errors.terms && (
                  <p className="error-message">{errors.terms.message}</p>
                )}

                <button type="submit" className="login-button w-100 mb-0">
                  Registrarse
                </button>

                <p className="login-footer mt-3 mb-2 text-center">
                  ¿Ya tienes cuenta?{" "}
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
                alt="Eduardo Calabuig Interiorismo Registro"
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
