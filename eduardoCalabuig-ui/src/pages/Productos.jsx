import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartThin } from "react-icons/pi";

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
  const [selectedCategory, setSelectedCategory] = useState("Todos");

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
          prods.sort((a, b) => (b.ventas || 0) - (a.ventas || 0));
          break;
        case "Últimas novedades":
        default:
          prods.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }

      setProductos(prods);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
    setLoading(false);
  };

  // Extraer categorías únicas para el menú
  const categories = [
    "Todos",
    ...Array.from(new Set(productos.map((p) => p.categoria).filter(Boolean))),
  ];

  // Filtrar productos según categoría seleccionada
  const productosFiltrados =
    selectedCategory === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === selectedCategory);

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
        <CategoriesMenu
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Sección de productos */}
        <section className="py-5 shadow-inner-section seccionProductos">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex justify-content-end align-items-center encabezadoProductos">
                {/* Texto “Productos en total” filtrados */}
                <p className="pe-4 totalProductos pt-3">
                  Productos en total:{" "}
                  <span className="fw-semibold">{productosFiltrados.length}</span>
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
              {productosFiltrados.map((producto) => (
                <div
                  key={producto.id}
                  className="col-6 col-md-4 pb-4 position-relative"
                >
                  <div className="imagenContainer position-relative">
                    <Link to={`/productos/${producto.slug || producto.id}`}>
                      <img
                        src={`${API_BASE_URL}/storage/${producto.imagen}`}
                        alt={producto.nombre}
                        className="w-100"
                      />
                    </Link>
                    {/* Botón carrito arriba derecha */}
                    <button
                      type="button"
                      className="carrito-btn"
                      onClick={() => onAddToCart(producto)}
                      title="Añadir al carrito"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        borderRadius: "50%",
                        padding: "6px 8px",
                        zIndex: 10,
                      }}
                    >
                      <PiShoppingCartThin size={30} className="text-dark" />
                    </button>
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
