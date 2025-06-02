import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CategoriesMenu from "../components/CategoriesMenu";
import SEO from "../components/SEO";

import api from "../utils/api";

import "../assets/styles/productos.css";

const opciones = [
  "Últimas novedades",
  "Precio: menor a mayor",
  "Precio: mayor a menor",
  "Más vendidos",
];

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(opciones[0]);

  const API_BASE_URL = import.meta.env.VITE_LOCAL_API_URL.replace("/api", "");

  // Cargar productos y aplicar orden
  useEffect(() => {
    loadProductos();
  }, [selected]);

  const loadProductos = async () => {
    setLoading(true);
    try {
      const res = await api.getData("productos");
      let prods = res.data;

      // Ordenar según selected
      switch (selected) {
        case "Precio: menor a mayor":
          prods.sort((a, b) => a.precio - b.precio);
          break;
        case "Precio: mayor a menor":
          prods.sort((a, b) => b.precio - a.precio);
          break;
        case "Más vendidos":
          // Si tienes campo 'ventas', por ejemplo:
          prods.sort((a, b) => (b.ventas || 0) - (a.ventas || 0));
          break;
        case "Últimas novedades":
        default:
          // Si tienes campo 'created_at' o similar:
          prods.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }

      setProductos(prods);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
    setLoading(false);
  };

  const anchoDinamico = `${selected.length + 4}ch`;

  if (loading) return <p>Cargando productos...</p>;

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
                  Productos en total:{" "}
                  <span className="fw-semibold">{productos.length}</span>
                </p>
                <select
                  className="filtroOrden"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  style={{ width: anchoDinamico }}
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
              {productos.map((producto) => (
                <div key={producto.id} className="col-6 col-md-4 pb-4">
                  <div className="imagenContainer">
                    <Link to={`/productos/${producto.id}`}>
                      <img
                        src={`${API_BASE_URL}/storage/${producto.imagen}`}
                        alt={producto.nombre}
                        className="w-100"
                      />
                    </Link>
                  </div>
                  <div className="textContainer py-4">
                    <h5 className="pb-1 pb-lg-3">{producto.nombre}</h5>
                    <p className="m-0">Material:</p>
                    <p className="fw-light m-0 pb-3">
                      {producto.material || "N/D"}
                    </p>
                    <p className="m-0">Dimensiones:</p>
                    <p className="fw-light m-0 pb-3 pb-lg-4">
                      Altura: {producto.alto || "N/D"} cm, Anchura:{" "}
                      {producto.ancho || "N/D"} cm, Profundidad:{" "}
                      {producto.profundidad || "N/D"} cm
                    </p>
                    <h5>
                      {producto.precio
                        ? `${producto.precio} €`
                        : "Precio no disponible"}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resto de secciones intactas */}
        {/* Normas de envío y devoluciones, Footer, etc... */}
      </main>

      <Footer />
    </>
  );
};

export default Productos;
