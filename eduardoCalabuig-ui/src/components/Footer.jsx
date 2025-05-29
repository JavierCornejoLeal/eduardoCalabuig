import React from "react";

import "../assets/styles/footer.css";
import { PiLinkedinLogoThin, PiInstagramLogoThin } from "react-icons/pi";
import { BiLogoFacebookSquare } from "react-icons/bi";

import logoFooter from "../assets/images/logo/logoFooter.webp";
import logoCrema from "../assets/images/logo/logoCrema.webp";

const Footer = () => {
  return (
    <footer className="fondoFooter py-5 position-relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="d-flex flex-column align-items-center mb-3">
              <img
                src={logoFooter}
                alt="Eduardo Calabuig Studio Interiorismo"
              />

              <div className="d-flex gap-3 pt-3">
                <a href="https://es.linkedin.com/" className="social-icon">
                  <PiLinkedinLogoThin
                    size={30}
                    color="#51443D"
                    title="LinkedIn"
                  />
                </a>
                <a href="https://instagram.com" className="social-icon">
                  <PiInstagramLogoThin
                    size={30}
                    color="#51443D"
                    title="Instagram"
                  />
                </a>
                <a href="https://facebook.com" className="social-icon">
                  <BiLogoFacebookSquare
                    size={30}
                    color="#51443D"
                    title="Facebook"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="col-3 col-lg-1 mb-4"></div>

          {/* Sección Eduardo */}
          <div className="col-4 col-lg-2 pb-4">
            <h5 className="fw-light pb-4">Eduardo</h5>
            <nav className="d-flex flex-column gap-2">
              <a
                href="/sobre-mi"
                className="linkFooter text-dark pb-3 text-decoration-none"
                style={{ width: "fit-content" }}
              >
                Sobre mí
              </a>
              <a
                href="/proyectos"
                className="linkFooter text-dark pb-3 text-decoration-none"
                style={{ width: "fit-content" }}
              >
                Proyectos
              </a>
              <a
                href="/noticias"
                className="linkFooter text-dark pb-3 text-decoration-none"
                style={{ width: "fit-content" }}
              >
                Noticias
              </a>
            </nav>
          </div>

          {/* Sección Productos */}
          <div className="col-5 col-lg-2 pb-4">
            <h5 className="fw-100 pb-4">Productos</h5>
            <nav className="d-flex flex-column gap-2">
              <a
                href="/muebles"
                className="linkFooter text-dark pb-3 text-decoration-none"
                style={{ width: "fit-content" }}
              >
                Muebles
              </a>
              <a
                href="/esculturas"
                className="linkFooter text-dark pb-3 text-decoration-none"
                style={{ width: "fit-content" }}
              >
                Esculturas
              </a>
            </nav>
          </div>

          {/* Contacto */}
          <div className="col-sm-12 col-lg-3 pb-4 text-center text-lg-start">
            <h5 className="fw-100 pb-4">Contacto</h5>
            <address className="d-flex flex-column align-items-center align-items-lg-start gap-2">
              <a
                href="#"
                className="linkFooter text-dark text-decoration-none"
                style={{ display: "inline-block", width: "fit-content" }}
              >
                C/ Explanada Cervantes 23 P1, Dénia
              </a>
              <a
                href="mailto:educalabuig@gmail.com"
                className="linkFooter text-dark text-decoration-none"
                style={{ display: "inline-block", width: "fit-content" }}
              >
                educalabuig@gmail.com
              </a>
              <a
                href="#"
                className="linkFooter text-dark text-decoration-none"
                style={{ display: "inline-block", width: "fit-content" }}
              >
                692 45 58 43
              </a>
            </address>
          </div>
        </div>

        {/* Links legales */}
        <div
          className="custom-border-bottom py-3 mt-4"
          style={{
            fontSize: "12px",
          }}
        >
          <nav
            className="d-grid d-md-flex justify-content-center gap-4 text-center text-md-start"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <a
              href="/aviso-legal"
              className="linkFooter text-dark text-decoration-none"
            >
              Aviso Legal
            </a>
            <a
              href="/politica-privacidad"
              className="linkFooter text-dark text-decoration-none"
            >
              Política de Privacidad
            </a>
            <a
              href="/politica-cookies"
              className="linkFooter text-dark text-decoration-none"
            >
              Política de Cookies
            </a>
            <a
              href="/terminos-condiciones"
              className="linkFooter text-dark text-decoration-none"
            >
              Términos y Condiciones
            </a>
          </nav>
        </div>

        {/* Derechos */}
        <div
          className="text-center mt-3"
          style={{ fontSize: "12px", color: "#333" }}
        >
          © 2025 Eduardo Calabuig. Todos los derechos reservados
        </div>
      </div>

      <img
        src={logoCrema}
        alt="Logo Eduardo Decoración"
        className="imagenSobresale"
      />
    </footer>
  );
};

export default Footer;
