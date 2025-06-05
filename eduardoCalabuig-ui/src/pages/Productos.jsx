import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartThin } from "react-icons/pi";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
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
  const [showLoginModal, setShowLoginModal] = useState(false); // Estado para mostrar el modal
  const [cart, setCart] = useState([]); // Estado para el carrito

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

  // Verificar si el usuario está logueado
  const checkIfLoggedIn = () => {
    return (
      sessionStorage.getItem("auth_token") || sessionStorage.getItem("user")
    );
  };

  const onAddToCart = async (producto) => {
    // Mostrar el producto que se pasa cuando se hace clic en "Añadir al carrito"
    console.log("Producto seleccionado para añadir al carrito:", producto);

    // Obtener el usuario desde sessionStorage
    const user = sessionStorage.getItem("user");

    // Verificar si el usuario existe
    if (user) {
      const parsedUser = JSON.parse(user); // Parseamos el JSON para acceder a los datos del usuario
      const carritoId = parsedUser.carrito_id; // Accedemos al carrito_id del usuario

      if (!carritoId) {
        console.error("No se encontró un carrito válido.");
        return;
      }

      // Verificar si el usuario está logueado
      if (checkIfLoggedIn()) {
        // Verificar si el producto ya está en el carrito
        try {
          // Buscamos si ya existe este producto en el carrito
          const response = await api.getData(`carritos/${carritoId}/productos`);
          console.log("Respuesta del carrito con productos:", response.data); // Mostrar los productos del carrito

          const existingProduct = response.data.find(
            (item) => item.producto_id === producto.id
          );

          if (existingProduct) {
            // Si el producto ya está en el carrito, actualizar la cantidad en carrito_productos
            const newQuantity = existingProduct.cantidad + 1;
            await api.updateData(
              `carritos/${carritoId}/productos/${existingProduct.id}`,
              {
                cantidad: newQuantity,
              }
            );
            console.log("Cantidad actualizada en el carrito");
          } else {
            // Si el producto no está en el carrito, agregarlo con cantidad = 1
            await api.createData(`carritos/${carritoId}/productos`, {
              producto_id: producto.id,
              cantidad: 1,
            });
            console.log("Producto añadido al carrito");
          }
        } catch (error) {
          console.error("Error al agregar el producto al carrito", error);
        }
      } else {
        console.log("Por favor, inicia sesión para agregar al carrito.");
      }
    } else {
      console.log("No se encontró un usuario en sesión.");
    }
  };

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
                  <span className="fw-semibold">
                    {productosFiltrados.length}
                  </span>
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

        {/* Modal de Login */}
        {showLoginModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>¡Necesitas iniciar sesión!</h2>
              <p>Por favor, inicia sesión para añadir productos al carrito.</p>
              <button onClick={handleLoginModalClose}>Cerrar</button>
            </div>
          </div>
        )}

        <section className="py-5 shadow-inner-section seccionNormasEnvio bg-light">
          <div className="container">
            <div className="row pt-5">
              {/* Sección de normas de envío */}
              <div className="col-md-6 pb-5">
                <div className="tituloNorma border-start border-dark">
                  <h5 className="ps-3">Envío gratuito</h5>
                </div>
                <div className="textoNorma pt-3">
                  <p className="fw-light">
                    Todos los pedidos en la España peninsular incluyen envío
                    gratuito...
                  </p>
                </div>
              </div>
              {/* Más contenido */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Productos;
