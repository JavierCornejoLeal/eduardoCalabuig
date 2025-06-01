// src/pages/products/ModuloUrbano.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CategoriesMenu from "../../components/CategoriesMenu";
import SEO from "../../components/SEO";

import "../../assets/styles/products/producto.css";

/* Importa las cuatro imágenes que quieres mostrar */
import ModuloUrbano3 from "../../assets/images/productos/moduloUrbano/moduloUrbano3.webp";
import ModuloUrbano4 from "../../assets/images/productos/moduloUrbano/moduloUrbano4.webp";

import LlamaEterna from "../../assets/images/productos/LlamaEterna.webp";
import EquilibrioDual from "../../assets/images/productos/equilibrioDual.webp";
import FlujoSinterizado from "../../assets/images/productos/flujoSinterizado.webp";

const ModuloUrbano = () => {
  const [cantidad, setCantidad] = useState(1);

  // Estados para controlar el despliegue de cada sección
  const [openMedidas, setOpenMedidas] = useState(false);
  const [openEnvio, setOpenEnvio] = useState(false);

  // Listas de ejemplo: ajusta el contenido según necesites
  const medidasList = [
    "Alto: 25 cm",
    "Ancho: 10 cm",
    "Fondo: 10 cm",
    "Peso: 1.2 kg",
    "Material: Terrazo color crema con incrustaciones de cuarzo",
  ];

  const envioList = [
    "Envío estándar: (3–5 días laborables)",
    "Gastos de envío: gratuitos",
    "Devolución gratuita en 30 días",
    "Atención personalizada",
    "Pago seguro y rápdio",
    "Seguimiento del pedido",
  ];

  const handleAddToCart = () => {
    console.log("Añadiendo al carrito:", {
      producto: "Módulo Urbano",
      cantidad,
    });
    // Aquí iría la lógica real para añadir al carrito...
  };

  return (
    <>
      <SEO
        title="Diseño de Interiorismo | Escultura Terrazo | Modulo Urbano"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint="productos/moduloUrbano"
      />
      <NavBar alwaysLight />

      <CategoriesMenu />

      <main>
        <section className="shadow-inner-section seccionProducto pt-5 pb-5">
          <div className="container">
            <div className="row gy-4">
              {/* ───────── Imágenes arriba (dos primeras) ───────── */}
              <div className="col-6 col-lg-4">
                <img
                  src={ModuloUrbano4}
                  alt="Módulo Urbano en un espacio reducido"
                  className="w-100 imagenProducto"
                />
              </div>
              <div className="col-6 col-lg-4">
                <img
                  src={ModuloUrbano3}
                  alt="Módulo Urbano en un ambiente moderno y minimalista"
                  className="w-100 imagenProducto"
                />
              </div>

              {/* ───────── Columna de texto, descripción, carrito y acordeón ───────── */}
              <div className="col-12 col-lg-4 ps-4">
                <div className="textoProducto pt-4 pb-5">
                  <h4>Módulo Urbano</h4>
                  <p className="py-2">
                    Terrazo color crema con incrustaciones de cuarzo
                  </p>
                  <h5>210 €</h5>
                </div>

                <div className="descripcionProducto pb-2">
                  <p className="fw-light">
                    Esta escultura geométrica en tonos beige aporta modernidad y
                    sofisticación a cualquier espacio. Su diseño único invita a
                    la reflexión y transforma el ambiente, convirtiéndose en el
                    punto focal perfecto para tu hogar.
                  </p>
                </div>

                <div className="agregarCarrito py-5 border-bottom">
                  {/* Botón Añadir al carrito */}
                  <button className="btnAgregar" onClick={handleAddToCart}>
                    Añadir al carrito
                  </button>
                </div>

                {/* ───────── ACORDEÓN: Medidas y características ───────── */}
                <div className="acordeon-section border-bottom">
                  <div
                    className="medidasCaracteristicas d-flex justify-content-between align-items-center py-4"
                    onClick={() => setOpenMedidas((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="no-margin mb-0 fw-semibold">
                      Medidas y características
                    </p>
                    <span className="no-margin pe-3 fw-semibold">
                      {openMedidas ? "−" : "+"}
                    </span>
                  </div>
                  {openMedidas && (
                    <div className="acordeon-content ps-3 pe-3 pb-4">
                      <ul className="list-unstyled mb-0">
                        {medidasList.map((item, idx) => (
                          <li key={idx} className="py-1">
                            - {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* ───────── ACORDEÓN: Envío y devoluciones ───────── */}
                <div className="acordeon-section border-bottom">
                  <div
                    className="envioDevoluciones d-flex justify-content-between align-items-center py-4"
                    onClick={() => setOpenEnvio((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="no-margin mb-0 fw-semibold">
                      Envío y devoluciones
                    </p>
                    <span className="no-margin pe-3 fw-semibold">
                      {openEnvio ? "−" : "+"}
                    </span>
                  </div>
                  {openEnvio && (
                    <div className="acordeon-content ps-3 pe-3 pb-4">
                      <ul className="list-unstyled mb-0">
                        {envioList.map((item, idx) => (
                          <li key={idx} className="py-1">
                            - {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row py-5">
              <div className="col-12">
                <div className="tituloSimilares">
                  <h4>Productos Similares</h4>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={LlamaEterna}
                      alt="Llama Eterna escultura metal"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1 pb-lg-3">Llama Eterna</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Fundición de bronce con pátina oscura
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 35 cm, Anchura: 12 cm, Profundidad: 8 cm
                  </p>
                  <h5>250 €</h5>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={EquilibrioDual}
                      alt="Equilibrio entre diferentes materiales y formas"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1 pb-lg-3">Equilibrio Dual</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Resina de poliéster de alta densidad
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 28 cm, Anchura: 22 cm, Profundidad: 8 cm
                  </p>
                  <h5>190 €</h5>
                </div>
              </div>
              <div className="col-6 col-md-4 d-none d-md-block">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={FlujoSinterizado}
                      alt="Escultura metalizada moderna"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1 pb-lg-3">Flujo Sinterizado</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Aluminio inyectado con acabado pátina mate
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 34 cm, Anchura: 24 cm, Profundidad: 8 cm
                  </p>
                  <h5>230 €</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ModuloUrbano;
