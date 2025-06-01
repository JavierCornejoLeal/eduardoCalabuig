// src/pages/Home.jsx
import React from "react";
import { Button, Carousel } from "react-bootstrap";

import "../assets/styles/home.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ProyectosCarousel from "../components/Carrousel";
import Mapa from "../components/Map";
import SEO from "../components/SEO";

import Eduardo from "../assets/images/home/edu.webp";
import CV from "../assets/docs/CV.pdf";

import Cocina from "../assets/images/projects/cocina.webp";
import OfiEdu from "../assets/images/projects/oficinaEdu.webp";
import Ofi2 from "../assets/images/projects/oficinaCemento.webp";
import Exterior from "../assets/images/projects/exterior.webp";
import Garage from "../assets/images/projects/garage.webp";
import Escalera from "../assets/images/projects/escalera.webp";

import Noticia from "../assets/images/noticias/noticia1.webp";
import Noticia2 from "../assets/images/noticias/noticia2.webp";
import Noticia3 from "../assets/images/noticias/noticia3.webp";

const Home = () => {
  // Función que fuerza la descarga
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = CV; // Asegúrate de tener CV.pdf en public/
    link.setAttribute("download", "CV.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <SEO
        title="Diseño de Interiorismo"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint=""
      />
      <NavBar />

      <Header>
        <p>Transformamos Espacios,</p>
        <p>Creamos Emociones</p>
      </Header>

      {/* MAIN HOME PAGE CONTENT */}
      <main>
        <section className="py-5 shadow-inner-section" id="aboutMe">
          <div className="container">
            <div className="row py-5">
              <div className="col-sm-12 col-lg-6">
                <img
                  src={Eduardo}
                  alt="Eduardo Calabuig como diseñador de interiorismo"
                  className="img-fluid w-100 eduardoImage"
                  style={{ objectFit: "cover", height: "44em" }}
                />
              </div>
              <div className="d-sm-none d-lg-block col-md-0 col-lg-1"></div>

              <div className="col-sm-12 col-lg-5 d-flex flex-column justify-content-center">
                <h1 className="pt-sm-5 pt-lg-0 pb-4">Eduardo Calabuig</h1>
                <p className="py-4 lh-lg">
                  Creo que cada espacio tiene el potencial de ser
                  extraordinario, de inspirar y perdurar en el tiempo. Mi
                  objetivo es diseñar interiores que combinen funcionalidad,
                  belleza e innovación, reflejando tu estilo y necesidades.
                </p>
                <p className="pb-4 lh-lg">
                  Apuesto por materiales sostenibles, tecnología y un diseño
                  atemporal que evoluciona contigo. Porque un buen diseño no
                  solo transforma espacios, sino también la forma en que los
                  vivimos. Déjame ayudarte a dar vida a tu espacio.
                </p>
                <Button className="botonMarron" onClick={handleDownloadCV}>
                  Descubre más
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Proyectos */}
        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row py-5">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <h1>Proyectos</h1>
              </div>
            </div>

            {/* Sección Proyectos Imágenes Carrusel */}
            <div className="row">
              <div className="col-12 pb-5">
                <ProyectosCarousel
                  images={[Cocina, OfiEdu, Exterior, Garage, Escalera, Ofi2]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row py-5">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <h1>Noticias</h1>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-4">
                <a href="/noticias">
                  {" "}
                  <img src={Noticia2} alt="Color de la temporada en interiorismo" style={{ width: "100%" }} />
                </a>
                <a className="text-dark text-decoration-none" href="">
                  <p className="text-center pt-3 pb-0 m-0">
                    El color de la temporada en interiorismo
                  </p>
                </a>
              </div>
              <div className="col-4">
                <a href="/noticias">
                  {" "}
                  <img src={Noticia} alt="Uso de las puertas correderas en el diseño de interiores" style={{ width: "100%" }} />
                </a>
                <a className="text-dark text-decoration-none" href="">
                  <p className="text-center pt-3 pb-0 m-0">
                    Puertas correderas: funcionalidad y estilo en tu hogar
                  </p>
                </a>
              </div>
              <div className="col-4">
                <a href="/noticias">
                  {" "}
                  <img src={Noticia3} alt="El uso de la toba natural en el diseño de interiores" style={{ width: "100%" }} />
                </a>
                <a className="text-dark text-decoration-none" href="">
                  <p className="text-center pt-3 pb-0 m-0">
                    El uso de la toba natural
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row py-5">
              <Mapa></Mapa>
            </div>
          </div>
        </section>

        {/* más secciones… */}
      </main>

      <Footer />
    </>
  );
};

export default Home;
