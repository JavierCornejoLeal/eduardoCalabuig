import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "../assets/styles/noticias.css";

/* Import Imágenes */
import Noticia1 from "../assets/images/noticias/noticia1.webp";
import Noticia2 from "../assets/images/noticias/noticia2.webp";
import Noticia3 from "../assets/images/noticias/noticia3.webp";
import Noticia4 from "../assets/images/noticias/noticia4.webp";
import Noticia5 from "../assets/images/noticias/noticia5.webp";
import Noticia6 from "../assets/images/noticias/noticia6.webp";
import Noticia7 from "../assets/images/noticias/noticia7.webp";
import Noticia8 from "../assets/images/noticias/noticia8.webp";
import Noticia9 from "../assets/images/noticias/noticia9.webp";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SEO from "../components/SEO";

const Noticias = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const igualarAlturasDeTitulos = () => {
      if (!containerRef.current) return;
      const titulos =
        containerRef.current.querySelectorAll(".text-container h5");
      if (titulos.length === 0) return;

      titulos.forEach((h5) => {
        h5.style.height = "auto";
      });
      let maxHeight = 0;
      titulos.forEach((h5) => {
        const alto = h5.getBoundingClientRect().height;
        if (alto > maxHeight) {
          maxHeight = alto;
        }
      });

      titulos.forEach((h5) => {
        h5.style.height = `${maxHeight}px`;
      });
    };
    igualarAlturasDeTitulos();

    window.addEventListener("resize", igualarAlturasDeTitulos);

    return () => {
      window.removeEventListener("resize", igualarAlturasDeTitulos);
    };
  }, []);

  return (
    <>
      <SEO
        title="Diseño de Interiorismo | Últimas Noticias y novedades"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint="noticias"
      />
      <NavBar />

      <Header>
        <p>Noticias</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container" ref={containerRef}>
            <div className="row pt-4">
              {/* --- Noticia 1 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia2}
                      className="imagenProyecto"
                      alt="Color de la temporada"
                    />
                    <div className="overlay-text text-center">
                      Color de la temporada
                    </div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">
                    El color de la temporada en interiorismo
                  </h5>
                  <p className="pb-5 mb-5">
                    El color de la temporada en interiorismo es el "Viva
                    Magenta", un tono vibrante que aporta energía y dinamismo a
                    los espacios. Ideal para añadir un toque audaz y creativo,
                    se adapta tanto a interiores modernos como tradicionales.
                  </p>
                </div>
              </div>

              {/* --- Noticia 2 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia1}
                      className="imagenProyecto"
                      alt="Puertas correderas en el diseño de interiores"
                    />
                    <div className="overlay-text text-center">
                      Puertas correderas
                    </div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">
                    Puertas correderas: funcionalidad y estilo en tu hogar
                  </h5>
                  <p className="pb-5 mb-5">
                    Las puertas correderas combinan funcionalidad y estilo,
                    optimizando el espacio mientras aportan un toque moderno y
                    elegante a cualquier hogar. Perfectas para estancias
                    pequeñas o para crear divisiones abiertas, ofrecen comodidad
                    y diseño en un solo elemento.
                  </p>
                </div>
              </div>

              {/* --- Noticia 3 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia3}
                      className="imagenProyecto"
                      alt="Toba natural en el diseño de interiores"
                    />
                    <div className="overlay-text text-center">Toba natural</div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">El uso de la toba natural</h5>
                  <p className="pb-5 mb-5">
                    La toba natural se ha convertido en una opción popular en
                    interiorismo, aportando un toque rústico y orgánico a los
                    espacios. Su textura única y tonalidades suaves ofrecen
                    calidez y elegancia, siendo ideal para paredes, suelos y
                    detalles decorativos.
                  </p>
                </div>
              </div>

              {/* --- Noticia 4 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia4}
                      className="imagenProyecto"
                      alt="Isla en la cocina estilo y funcionalidad"
                    />
                    <div className="overlay-text text-center">Isla</div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">
                    La Isla en la Cocina: Estilo y Funcionalidad al Alcance de
                    Todos
                  </h5>
                  <p className="pb-5 mb-5">
                    La isla en la cocina es clave en el diseño moderno,
                    ofreciendo más espacio de trabajo, almacenamiento y un punto
                    de encuentro. Su integración con materiales como el ladrillo
                    y la madera aporta tanto estética como practicidad.
                  </p>
                </div>
              </div>

              {/* --- Noticia 5 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia5}
                      className="imagenProyecto"
                      alt="Luz natural en el diseño interior minimalista"
                    />
                    <div className="overlay-text text-center">Luz natural</div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">
                    La Luz Natural: Clave en el Diseño Interior Minimalista
                  </h5>
                  <p className="pb-5 mb-5">
                    La luz natural es esencial en el diseño minimalista, creando
                    ambientes luminosos y amplios, mejorando el bienestar y
                    aportando serenidad al espacio.
                  </p>
                </div>
              </div>

              {/* --- Noticia 6 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia6}
                      className="imagenProyecto"
                      alt="Estilo ibicenco en el diseño de interiores"
                    />
                    <div className="overlay-text text-center">
                      Estilo ibicenco
                    </div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">
                    El Estilo Ibicenco: Naturaleza y Relax en el Diseño de
                    Interiores
                  </h5>
                  <p className="pb-5 mb-5">
                    El estilo ibicenco destaca por su uso de materiales
                    naturales y colores neutros, creando espacios frescos y
                    tranquilos que fusionan el hogar con la naturaleza, ideal
                    para terrazas y patios.
                  </p>
                </div>
              </div>

              {/* --- Noticia 7 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia7}
                      className="imagenProyecto"
                      alt="Techo aislado en el diseño de interiores"
                    />
                    <div className="overlay-text text-center">
                      Techo aislado
                    </div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">
                    El Techo Aislado: Estilo y Amplitud en el Diseño de
                    Interiores
                  </h5>
                  <p className="pb-5">
                    El techo de vigas expuestas aporta elegancia y amplitud al
                    espacio, creando un ambiente luminoso y acogedor que resalta
                    la altura del salón.
                  </p>
                </div>
              </div>

              {/* --- Noticia 8 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia8}
                      className="imagenProyecto"
                      alt="Microcemento oficina en el diseño de interiores"
                    />
                    <div className="overlay-text text-center">Microcemento</div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">
                    Microcemento: Modernidad y Versatilidad en el Diseño de
                    Oficinas
                  </h5>
                  <p className="pb-5">
                    El microcemento aporta un acabado moderno y duradero, ideal
                    para oficinas minimalistas que buscan estilo y funcionalidad
                    en superficies como mesas y paredes.
                  </p>
                </div>
              </div>

              {/* --- Noticia 9 --- */}
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="image-container">
                  <Link to="/noticias/estiloIbizenco">
                    <img
                      src={Noticia9}
                      className="imagenProyecto"
                      alt="Armario minimalista en el diseño de interiores"
                    />
                    <div className="overlay-text text-center">
                      Uso de armarios
                    </div>
                  </Link>
                </div>
                <div className="text-container">
                  <h5 className="py-4">
                    El Armario Minimalista para Espacios Modernos
                  </h5>
                  <p className="pb-5">
                    El diseño de este armario minimalista resalta la innovación
                    en soluciones de almacenamiento. Con un enfoque funcional y
                    estético, sus compartimentos abiertos y cajones permiten un
                    acceso fácil y ordenado, manteniendo la simplicidad visual
                    en todo momento.
                  </p>
                </div>
              </div>
            </div>
            {/* FIN de .row única */}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Noticias;
