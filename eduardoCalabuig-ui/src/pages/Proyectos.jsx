import React from "react";
import { Link, Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";

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
      <SEO
        title="Diseño de Interiorismo | Nuestros Proyectos más recientes con un estilo único"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint="proyectos"
      />
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
                    <img src={Cocina} className="imagenProyecto" alt="Cocina moderna contemporanea vista alta" />
                    <div className="overlay-text text-center">Cocina</div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/exteriorIbizenco">
                    <img
                      src={Exterior}
                      className="imagenProyecto"
                      alt="Exterior Ibizenco con decoraciones y naturaleza"
                    />
                    <div className="overlay-text text-center">
                      Exterior Ibizenco
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pb-4 gy-4 gy-md-0">
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/exteriorIbizenco">
                    <img
                      src={Escalera}
                      className="imagenProyecto"
                      alt="Escalera Minimalista con diseño moderno"
                    />
                    <div className="overlay-text text-center">Escalera</div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/exteriorIbizenco">
                    <img
                      src={Salon}
                      className="imagenProyecto"
                      alt="Salón Minimalista con estilo contemporáneo"
                    />
                    <div className="overlay-text text-center">
                      Salón Minimalista
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pb-4 gy-4 gy-md-0">
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/exteriorIbizenco">
                    <img
                      src={CocinaPorche}
                      className="imagenProyecto"
                      alt="Cocina con Garage con decoraciones y naturaleza porsche"
                    />
                    <div className="overlay-text text-center">
                      Cocina con Garage
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/exteriorIbizenco">
                    <img
                      src={OfiCemento}
                      className="imagenProyecto"
                      alt="Oficina Microcemento"
                    />
                    <div className="overlay-text text-center">
                      Oficina Microcemento
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pb-5 gy-4 gy-md-0">
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/exteriorIbizenco">
                    <img src={Garage} className="imagenProyecto" alt="Garage moderno y sencillo con porsche" />
                    <div className="overlay-text text-center">Garage</div>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="image-container">
                  <Link to="/proyectos/exteriorIbizenco">
                    <img
                      src={Exterior2}
                      className="imagenProyecto"
                      alt="Exterior Ibizenco con decoraciones y naturaleza moderno y minimalista"
                    />
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
