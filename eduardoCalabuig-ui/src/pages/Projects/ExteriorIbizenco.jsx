import React from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import SEO from "../../components/SEO";

import Exterior from "../../assets/images/projects/exterior.webp";
import Exterior2 from "../../assets/images/projects/exterior-ibizenco/exterior2.webp";
import Exterior3 from "../../assets/images/projects/exterior-ibizenco/exterior3.webp";
import Exterior4 from "../../assets/images/projects/exterior-ibizenco/exterior4.webp";

import "../../assets/styles/proyectos/exterior-ibizenco.css";

const ExteriorIbizenco = () => {
  return (
    <>
      <SEO
        title="Diseño de Interiorismo | Exterior Ibizenco"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint="proyectos/exteriorIbizenco"
      />
      <NavBar />
      <Header>
        <p>Exterior Ibicenco</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row">
              <div className="col-12 ">
                <h1 className="fw-bold pb-2 mb-0">Entre Olivos y Cal</h1>
                <time datetime="2024-10-13" className="post-date pb-4">
                  13 de octubre de 2024
                </time>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-6 col-lg-4 pb-4 pb-lg-0">
                <h5 className="categoria">Diseño de Exteriores</h5>
              </div>
              <div className="col-6 col-lg-4 text-end text-lg-center">
                <h5 className="categoria">Residencia Unifamiliar</h5>
              </div>
              <div className="col-lg-4 text-start text-lg-end">
                <h5 className="categoria">Proyecto 3D</h5>
              </div>
            </div>
            <div className="row pb-4">
              <div className="col-12">
                <p className="pb-2">
                  "Entre Olivos y Cal" es una propuesta que explora la calma del
                  paisaje mediterráneo a través de una arquitectura discreta,
                  pura y sincera. La vivienda se integra en su entorno sin
                  estridencias, haciendo del exterior un espacio tan habitable y
                  contemplativo como el interior.
                </p>
                <p className="pb-3">
                  El proyecto se divide en dos zonas conectadas por una misma
                  filosofía estética:
                </p>
                <ul>
                  <li className="fw-bold pb-2">Zona de descanso</li>
                  <p className="pb-2">
                    Pavimentos de ladrillo cocido en tonos cálidos estructuran
                    una tarima escalonada donde reposa un olivo centenario. Una
                    pérgola de madera ligera y elementos decorativos en cerámica
                    aportan identidad y profundidad, evocando escenas de la vida
                    mediterránea más auténtica.
                  </p>
                  <li className="fw-bold pb-2">Zona de acceso</li>
                  <p className="pb-3">
                    Un camino de losas blancas sobre grava dirige la mirada y el
                    tránsito hacia la entrada principal, acompañado por
                    vegetación austera pero expresiva: cactus, arbustos
                    aromáticos y árboles de hoja perenne. La piedra natural del
                    cerramiento refuerza la conexión con el terreno.
                  </p>
                </ul>
                <p>
                  Esta vivienda es un ejercicio de equilibrio entre tradición y
                  contemporaneidad, entre sombra y sol, entre materia y vacío.
                  Una casa que respira al ritmo del entorno, en la que el diseño
                  es casi invisible, pero profundamente presente.
                </p>
              </div>
            </div>

            <div className="row py-md-4">
              <div className="col-12 col-md-6 pb-3 pb-md-0">
                <img className="w-100 imagenProyecto" src={Exterior} alt="Exterior estilo ibizenco con decoraciones y naturaleza" />
              </div>
              <div className="col-12 col-md-6 pb-3 pb-md-0">
                <img className="w-100 imagenProyecto" src={Exterior2} alt="Exterior estilo ibizenco con suelo de barro" />
              </div>
            </div>
            <div className="row pb-3 pb-md-5">
              <div className="col-12 col-md-6 pb-3 pb-md-0">
                <img className="w-100 imagenProyecto" src={Exterior3} alt="Exterior estilo ibizenco con amaca estilo ibicenca" />
              </div>
              <div className="col-12 col-md-6">
                <img className="w-100 imagenProyecto" src={Exterior4} alt="Exterior minimalista funcional" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ExteriorIbizenco;
