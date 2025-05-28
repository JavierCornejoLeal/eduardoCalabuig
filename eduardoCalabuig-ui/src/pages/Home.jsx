// src/pages/Home.jsx
import React from "react";
import { Button, Carousel } from "react-bootstrap";

import "../assets/styles/home.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ProyectosCarousel from "../components/Carrousel";

import Eduardo from "../assets/images/home/edu.jpg";
import Cocina from "../assets/images/projects/cocina.png";
import OfiEdu from "../assets/images/projects/oficinaEdu.png";
import Ofi2 from "../assets/images/projects/oficina2.png";
import Exterior from "../assets/images/projects/exterior.jpg";
import Garage from "../assets/images/projects/garage.jpg";
import Escalera from "../assets/images/projects/escalera.png";
import Noticia from "../assets/images/noticias/noticia1.png";
import Noticia2 from "../assets/images/noticias/noticia2.png";
import Noticia3 from "../assets/images/noticias/noticia3.png";

const Home = () => {
  return (
    <>
      <NavBar />

      <Header>
        <p>Transformamos Espacios,</p>
        <p>Creamos Emociones</p>
      </Header>

      {/* MAIN HOME PAGE CONTENT */}
      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row py-5">
              <div className="col-sm-12 col-lg-6">
                <img
                  src={Eduardo}
                  alt="About Us"
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
                <Button className="botonMarron">Descubre más</Button>
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
                <a href="">
                  {" "}
                  <img src={Noticia2} alt="" style={{ width: "100%" }} />
                </a>
                <a className="text-dark text-decoration-none" href="">
                  <p className="text-center pt-3 pb-0 m-0">
                    El color de la temporada en interiorismo
                  </p>
                </a>
              </div>
              <div className="col-4">
                <a href="">
                  {" "}
                  <img src={Noticia} alt="" style={{ width: "100%" }} />
                </a>
                <a className="text-dark text-decoration-none" href="">
                  <p className="text-center pt-3 pb-0 m-0">
                    Puertas correderas: funcionalidad y estilo en tu hogar
                  </p>
                </a>
              </div>
              <div className="col-4">
                <a href="">
                  {" "}
                  <img src={Noticia3} alt="" style={{ width: "100%" }} />
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
              <iframe
                title="Mapa de Explanada Cervantes 23, Dénia"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5259.284522684315!2d0.10333211155984302!3d38.84193872256347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6236472d0b2271%3A0xe8c32b3c7399cc56!2sExplanada%20Cervantes%2C%2023%2C%2037740%20D%C3%A9nia%2C%20Alicante%2C%20Espa%C3%B1a!5e0!3m2!1ses!2ses!4v1685280123456!5m2!1ses!2ses"
                width="100%"
                height="450em"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
