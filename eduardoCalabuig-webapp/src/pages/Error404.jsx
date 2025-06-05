import React from "react";
import { Link } from "react-router-dom";

import "../assets/styles/error404.css";

import imagenError from "../assets/images/404/404.webp";

const Error404 = () => {
  return (
    <>

      <main className="shadow-inner-section">
        <section
          className="py-5"
          style={{
            position: "relative",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="container pt-5">
            <div className="row pt-5">
              <div
                className="col-12 text-center py-5"
                style={{
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <h1
                  style={{
                    fontSize: "6rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  404
                </h1>
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 500,
                    marginBottom: "1rem",
                  }}
                >
                  ¡Vaya!
                </h2>
                <p
                  style={{
                    color: "#555",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    marginBottom: "1.5rem",
                  }}
                >
                  Este espacio no existe.
                  <br />
                  Como a veces en el diseño de interiores, hay que encontrar
                  <br />
                  el lugar perfecto para cada espacio.
                </p>
                <Link
                  to="/productos"
                  className="btn btn-outline-dark rounded-pill"
                  style={{
                    padding: "0.5rem 1.5rem",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>

          <img src={imagenError} alt="Error 404" className="Error 404 interiorismo" />
        </section>
        <div className="containerSeccion"></div>
      </main>
    </>
  );
};

export default Error404;
