import React, { useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CategoriesMenu from "../components/CategoriesMenu";
import SEO from "../components/SEO";

{
  /* Import Imágenes */
}

import LlamaEterna from "../assets/images/productos/LlamaEterna.webp";
import EquilibrioDual from "../assets/images/productos/equilibrioDual.webp";
import ModuloUrbano from "../assets/images/productos/moduloUrbano.webp";
import FlujoSinterizado from "../assets/images/productos/flujoSinterizado.webp";
import SiluetaSereno from "../assets/images/productos/silueta.webp";
import GeometriaSuspensa from "../assets/images/productos/geometriaSuspensa.webp";
import OvaloAureo from "../assets/images/productos/ovaloAureo.webp";
import EjeCircular from "../assets/images/productos/ejeCircular.webp";
import DunaSinfonica from "../assets/images/productos/dunaSinfonica.webp";

import "../assets/styles/productos.css";

const Productos = () => {
  // Lista de opciones tal como aparecen en el select
  const opciones = [
    "Últimas novedades",
    "Precio: menor a mayor",
    "Precio: mayor a menor",
    "Más vendidos",
  ];

  // Estado para almacenar la opción seleccionada (inicialmente la primera)
  const [selected, setSelected] = useState(opciones[0]);

  // Calculamos ancho en "ch" sumando unos caracteres extra de margen
  const anchoDinámico = `${selected.length + 4}ch`;

  return (
    <>
      <SEO
        title="Diseño de Interiorismo | Nuestros Productos más únicos"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint="productos"
      />
      <NavBar alwaysLight />

      <main>
        {/* Sección de categorías */}
        <CategoriesMenu />

        {/* Sección de productos */}
        <section className="py-5 shadow-inner-section seccionProductos">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex justify-content-end align-items-center encabezadoProductos">
                {/* Texto “Productos en total: 32” */}
                <p className="pe-4 totalProductos pt-3">
                  Productos en total: <span className="fw-semibold">32</span>
                </p>
                <select
                  className="filtroOrden"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  style={{ width: anchoDinámico }}
                >
                  {opciones.map((op) => (
                    <option className="selectOpciones" key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* PRODUCTOS */}
            <div className="row py-5">
              {/* Fila 1 */}
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
                      alt="Equilibrio Dual escultura resina"
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
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={ModuloUrbano}
                      alt="Modulo Urbano escultura terrazo"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1pb-lg-3">Módulo Urbano</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Terrazo color crema con incrustaciones de cuarzo
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 32 cm, Anchura: 12 cm, Profundidad: 12 cm
                  </p>
                  <h5>210 €</h5>
                </div>
              </div>
              {/* Fila 2 */}
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={FlujoSinterizado}
                      alt="Flujo Sinterizado escultura aluminio"
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
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={SiluetaSereno}
                      alt="Silueta Sereno escultura mármol"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1 pb-lg-3">Silueta Sereno</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Mármol Carrara pulido a mano
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 30 cm, Anchura: 15 cm, Profundidad: 12 cm
                  </p>
                  <h5>270 €</h5>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={GeometriaSuspensa}
                      alt="Geometría Suspensa escultura resina"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1 pb-lg-3">Geometría Suspensa</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Resina de poliéster con pigmento crema
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 28 cm, Anchura: 14 cm, Profundidad: 8 cm
                  </p>
                  <h5>180 €</h5>
                </div>
              </div>
              {/* Fila 3 */}
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={OvaloAureo}
                      alt="Ovalo Áureo escultura mármol de color crema y dorado"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1 pb-lg-3">Óvalo Áureo</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Bloque de mármol, recubrimiento de dorado
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 33 cm, Anchura: 18 cm, Profundidad: 6 cm
                  </p>
                  <h5>290 €</h5>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={EjeCircular}
                      alt="Eje Circular escultura aluminio fundido"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1 pb-lg-3">Eje Circular</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Aluminio fundido con pátina antracita mate
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 28 cm, Anchura: 22 cm, Profundidad: 7 cm
                  </p>
                  <h5>195 €</h5>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="imagenContainer">
                  <Link to={"/productos/moduloUrbano"}>
                    <img
                      src={DunaSinfonica}
                      alt="Duna Sinfónica escultura mármol blanco y pulido"
                      className="w-100"
                    />
                  </Link>
                </div>
                <div className="textContainer py-4">
                  <h5 className="pb-1 pb-lg-3">Duna Sinfónica</h5>
                  <p className="m-0">Material:</p>
                  <p className="fw-light m-0 pb-3">
                    Mármol blanco carraca de veta natural, pulido
                  </p>
                  <p className="m-0">Dimensiones:</p>
                  <p className="fw-light m-0 pb-3 pb-lg-4">
                    Altura: 30 cm, Anchura: 20 cm, Profundidad: 8 cm
                  </p>
                  <h5>335 €</h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Normas de envio y devoluciones */}

        <section className="py-5 shadow-inner-section seccionNormasEnvio bg-light">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-6 pb-5">
                <div className="tituloNorma border-start border-dark">
                  <h5 className="ps-3">Envío gratuito</h5>
                </div>
                <div className="textoNorma pt-3">
                  <p className="fw-light">
                    Todos los pedidos en la España peninsular incluyen envío
                    gratuito y transporte especializado, para garantizar que tu
                    escultura llegue siempre en perfecto estado.
                  </p>
                </div>
              </div>
              <div className="col-md-6 pb-5">
                <div className="tituloNorma border-start border-dark">
                  <h5 className="ps-3">Atención Personalizada</h5>
                </div>
                <div className="textoNorma pt-3">
                  <p className="fw-light">
                    Acompañamos al cliente en todo el proceso desde la elección
                    de la obra hasta su montaje ofreciendo asesoría de estilo y
                    soporte postventa.
                  </p>
                </div>
              </div>
              <div className="col-md-6 pb-5">
                <div className="tituloNorma border-start border-dark">
                  <h5 className="ps-3">Devolución sin coste</h5>
                </div>
                <div className="textoNorma pt-3">
                  <p className="fw-light">
                    Si tu escultura no encaja en tu espacio o no cumple tus
                    expectativas, dispones de 30 días para devolverla o
                    cambiarla sin gastos ni papeleos.
                  </p>
                </div>
              </div>
              <div className="col-md-6 pb-5">
                <div className="tituloNorma border-start border-dark">
                  <h5 className="ps-3">Pago 100% seguro y flexible</h5>
                </div>
                <div className="textoNorma pt-3">
                  <p className="fw-light">
                    Trabajamos con pasarelas de pago certificadas (tarjeta,
                    PayPal, transferencia) y ofrecemos financiación en cómodos
                    plazos, para que compres con total tranquilidad.
                  </p>
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

export default Productos;
