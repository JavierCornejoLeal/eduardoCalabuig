import React from "react";
import { Link, Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import "../assets/styles/proyectos.css";

/* Import Imágenes */
import Cocina from "../assets/images/projects/cocina.webp";
import CocinaPorche from "../assets/images/projects/cocinaPorche.webp";
import Exterior from "../assets/images/projects/exterior.webp";
import Exterior2 from "../assets/images/projects/exterior2.webp";
import Garage from "../assets/images/projects/garage.webp";
import Escalera from "../assets/images/projects/escalera.webp";
import OfiCemento from "../assets/images/projects/oficinaCemento.webp";
import Salon from "../assets/images/projects/salon.webp";

const Proyectos = () => {
  return (
    <>
      <NavBar />
      <Header>
        <p>Nuestros Proyectos</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row pt-5 pb-4 gy-4 gy-md-0">
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/cocina">
                    <img src={Cocina} className="imagenProyecto" alt="Cocina" />
                    <div className="overlay-text text-center">Cocina</div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/exterior-ibizenco">
                    <img src={Exterior} className="imagenProyecto" alt="Exterior Ibizenco" />
                    <div className="overlay-text text-center">Exterior Ibizenco</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pb-4 gy-4 gy-md-0">
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/">
                    <img src={Escalera} className="imagenProyecto" alt="Escalera" />
                    <div className="overlay-text text-center">Escalera</div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/">
                    <img src={Salon} className="imagenProyecto" alt="Salón Minimalista" />
                    <div className="overlay-text text-center">Salón Minimalista</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pb-4 gy-4 gy-md-0">
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/">
                    <img src={CocinaPorche} className="imagenProyecto" alt="Cocina con Garage" />
                    <div className="overlay-text text-center">Cocina con Garage</div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/">
                    <img src={OfiCemento} className="imagenProyecto" alt="Oficina Microcemento" />
                    <div className="overlay-text text-center">Oficina Microcemento</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pb-5 gy-4 gy-md-0">
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/">
                    <img src={Garage} className="imagenProyecto" alt="Garage" />
                    <div className="overlay-text text-center">Garage</div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/">
                    <img src={Exterior2} className="imagenProyecto" alt="Exterior" />
                    <div className="overlay-text text-center">Exterior</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Aquí se renderizarán los componentes de rutas hijas como ExteriorIbizenco */}
      <Outlet />

      <Footer />
    </>
  );
};

export default Proyectos;
