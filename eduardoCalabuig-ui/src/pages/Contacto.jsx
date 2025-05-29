import React, { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import "../assets/styles/contacto.css";

import OfiEdu from "../assets/images/contacto/oficinaEdu.png";

const Contacto = () => {
  const form = useRef();

  // Calcula la fecha actual en formato "29 de mayo de 2025"
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    // Inicializa EmailJS con tu User ID
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!form.current) {
      console.error("El formulario no está referenciado correctamente.");
      return;
    }

    // Extrae valores del formulario
    const { nombre, apellidos, email, telefono, mensaje } = form.current;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateContactId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // plantilla del diseñador
    const templateReplyId = import.meta.env.VITE_EMAILJS_TEMPLATE_REPLY_ID; // plantilla autorespuesta
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    // Prepara parámetros comunes
    const templateParams = {
      nombre: nombre.value,
      apellidos: apellidos.value,
      email: email.value,
      telefono: telefono.value,
      mensaje: mensaje.value,
      fecha: fechaActual,
    };

    try {
      // 1) Envío al diseñador usando send (igual que autorespuesta)
      await emailjs.send(serviceId, templateContactId, templateParams, userId);

      // 2) Autorespuesta al cliente
      await emailjs.send(serviceId, templateReplyId, templateParams, userId);

      alert(
        "¡Mensaje enviado correctamente al diseñador y autorespuesta enviada al cliente!"
      );
      form.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Error al enviar. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      <NavBar />

      <Header>
        <p>CONTACTO</p>
      </Header>

      <main>
        {/* Sección de datos y superposición */}
        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row py-5">
              <div className="col-md-6 col-lg-4 d-flex flex-column align-items-center">
                <h4 className="fw-semibold pb-2">Dirección</h4>
                <a
                  href="https://www.google.es/maps/place/Esplanada+Cervantes,+23,+03700+Denia,+Alicante/@38.8418145,0.1098823,17z/data=!3m1!4b1!4m6!3m5!1s0x129e1ae00438bef9:0xd6092d794b368e1e!8m2!3d38.8418104!4d0.1124572!16s%2Fg%2F11ldd0pl5j?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                  className="link text-dark pb-3"
                >
                  C/ Explanada cervantes, 23 P1
                </a>
                <p>Dénia, Alicante Spain</p>
              </div>
              <div className="col-md-6 col-lg-4 d-flex flex-column align-items-center pt-sm-5 pt-md-0">
                <h4 className="fw-semibold pb-2">Contacto</h4>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=calabuiginteriorismo@gmail.com"
                  className="link text-dark pb-3"
                  rel="noopener noreferrer"
                >
                  calabuiginteriorismo@gmail.com
                </a>
                <p>692 45 58 43</p>
              </div>
              <div className="col-md-12 col-lg-4 d-flex flex-column align-items-center pt-sm-5 pt-md-5 pt-lg-0">
                <h4 className="fw-semibold pb-2">Redes</h4>
                <a href="" className="link text-dark">
                  @eduardo_calabuig
                </a>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-12 position-relative">
                <img
                  src={OfiEdu}
                  alt="Oficina de Eduardo Calabuig"
                  className="w-100"
                />
                <div
                  className="position-absolute top-50 start-50 translate-middle text-center textoImagen"
                  style={{
                    color: "white",
                    textShadow: "0 0 10px rgba(0,0,0,0.7)",
                    fontWeight: "bolder",
                    textAlign: "center",
                    padding: "0 20px",
                  }}
                >
                  <p>¿Tienes un proyecto?</p>
                  <p>Contacta y lo hacemos único.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FORMULARIO */}
        <section className="py-5 shadow-inner-section">
          <div className="container">
            <h3 className="fw-semibold py-5">
              Te ayudo a encontrar tu espacio ideal
            </h3>
            <form
              id="formulario-contacto"
              ref={form}
              onSubmit={sendEmail}
              className="row g-4"
            >
              <div className="col-md-6">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  id="nombre"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  id="apellidos"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  id="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  id="telefono"
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <textarea
                  name="mensaje"
                  placeholder="Descríbenos tu idea..."
                  id="mensaje"
                  className="form-control"
                  rows={5}
                  required
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  style={{ overflow: "hidden", resize: "none" }}
                />
              </div>
              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="acepto"
                  id="acepto"
                  required
                />
                <label
                  className="form-check-label ps-2"
                  htmlFor="acepto"
                  style={{ fontSize: "0.9rem" }}
                >
                  He leído y acepto las{" "}
                  <a
                    className="text-dark fw-bold text-decoration-none link"
                    href=""
                  >
                    políticas de privacidad
                  </a>{" "}
                  y el{" "}
                  <a
                    className="text-dark fw-bold text-decoration-none link"
                    href=""
                  >
                    aviso legal
                  </a>
                  . <span className="">*</span>
                </label>
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn enviaCorreo">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contacto;
