import React from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";

import Cocina1 from "../../assets/images/projects/cocina.webp";
import Cocina2 from "../../assets/images/projects/cocina/cocina2.webp";
import Cocina3 from "../../assets/images/projects/cocina/cocina3.webp";
import Cocina4 from "../../assets/images/projects/cocina/cocina4.webp";

import "../../assets/styles/proyectos/exterior-ibizenco.css";

{
  /* Import Imágenes */
}

const Cocina = () => {
  return (
    <>
      <NavBar />
      <Header>
        <p>Cocina Contemplativa</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row">
              <div className="col-12 ">
                <h1 className="fw-bold pb-2 mb-0">Cocina Contemplativa</h1>
                <time datetime="2024-10-13" className="post-date pb-4">
                  30 de mayo de 2025
                </time>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-6 col-lg-4 pb-4 pb-lg-0">
                <h5 className="categoria">Diseño de Interiores</h5>
              </div>
              <div className="col-6 col-lg-4 text-end text-lg-center">
                <h5 className="categoria">Cocina Monofamiliar</h5>
              </div>
              <div className="col-lg-4 text-start text-lg-end">
                <h5 className="categoria">Proyecto 3D</h5>
              </div>
            </div>
            <div className="row pb-4">
              <div className="col-12">
                <p className="pb-2">
                  “Una cocina que redefine el acto de cocinar como experiencia
                  sensorial: superficies de hormigón pulido confrontan con la
                  textura tenue de los armarios empotrados, mientras la isla
                  central flota como un mueble escultórico. Cada detalle –desde
                  la integración del electrodoméstico hasta la selección de
                  tonos neutros– busca la calma y la armonía visual.”
                </p>
                <p className="pb-3">
                  El espacio se organiza en dos ámbitos conectados por una misma
                  estrategia material:
                </p>
                <ul>
                  <li className="fw-bold pb-2">Zona de preparación</li>
                  <p className="pb-2">
                    Encabeza la escena una isla multifuncional de hormigón
                    continuo, equipada con placa de cocción y campana integrada.
                    El amplio zócalo inferior libera la vista, mientras que los
                    cajones ocultos y la columna de electrodomésticos garantizan
                    orden y eficiencia. La encimera sin juntas potencia la
                    sensación de fluidez y facilita la limpieza.
                  </p>
                  <li className="fw-bold pb-2">Zona de convivencia</li>
                  <p className="pb-3">
                    Frente a la isla, una zona de tránsito que se convierte en
                    punto de reunión: banquetas bajas acogen el desayuno y la
                    charla informal. La iluminación colgante, de líneas
                    esbeltas, enfatiza el volumen de la isla y crea un ambiente
                    cálido en contraste con el hormigón.
                  </p>
                </ul>
                <p>
                  Esta cocina es un ejercicio de equilibrio entre materia y
                  vacío, entre la frialdad del hormigón y la calidez de los
                  detalles negros. Un espacio diseñado para respirar, donde cada
                  gesto cobra protagonismo y el diseño pasa desapercibido, pero
                  permanece profundamente presente.
                </p>
              </div>
            </div>

            <div className="row py-4">
              <div className="col-6">
                <img className="w-100 imagenProyecto" src={Cocina1} alt="" />
              </div>
              <div className="col-6">
                <img className="w-100 imagenProyecto" src={Cocina2} alt="" />
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-6">
                <img className="w-100 imagenProyecto" src={Cocina3} alt="" />
              </div>
              <div className="col-6">
                <img className="w-100 imagenProyecto" src={Cocina4} alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Cocina;
