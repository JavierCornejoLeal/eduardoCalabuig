import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import SEO from "../../components/SEO";
import api from "../../utils/api";

import "../../assets/styles/products/producto.css";

const ProductoDetallado = () => {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similares, setSimilares] = useState([]);

  const [openMedidas, setOpenMedidas] = useState(false);
  const [openEnvio, setOpenEnvio] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [categories, setCategories] = useState([]);

  // Función para cargar los datos del producto
  const fetchProductoData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const resProducto = await api.getData(`productos/slug/${slug}`);
      const prod = resProducto.data;
      setProducto(prod);
      
      const resImagenes = await api.getData(`productos/${prod.id}/imagenes`);
      setImagenes(resImagenes.data);
      
      const resTodos = await api.getData("productos");
      const todos = resTodos.data;
      const mismosCategoria = todos.filter(
        (p) => p.categoria === prod.categoria && p.id !== prod.id
      );
      
      // Seleccionamos 3 productos aleatorios de la misma categoría
      const productosAleatorios = mismosCategoria.length > 3
        ? mismosCategoria.sort(() => 0.5 - Math.random()).slice(0, 3)
        : mismosCategoria;
      
      setSimilares(productosAleatorios);
    } catch (err) {
      setError("Error cargando el producto o sus datos relacionados");
    } finally {
      setLoading(false);
    }
  };

  // Obtener las categorías
  const fetchCategories = async () => {
    try {
      const res = await api.getData("productos");
      const todos = res.data;
      const únicas = Array.from(new Set(todos.map((p) => p.categoria).filter(Boolean)));
      setCategories(["Todos", ...únicas]);
    } catch (err) {
      console.error("Error cargando categorías:", err);
    }
  };

  useEffect(() => {
    fetchProductoData();
    fetchCategories();
  }, [slug]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  const medidasList = producto.medidas || [
    `Alto: ${producto.alto || "N/D"} cm`,
    `Ancho: ${producto.ancho || "N/D"} cm`,
    `Fondo: ${producto.profundidad || "N/D"} cm`,
    `Material: ${producto.material || "N/D"}`,
  ];

  const envioList = [
    "Envío estándar: (3–5 días laborables)",
    "Gastos de envío: gratuitos",
    "Devolución gratuita en 30 días",
    "Atención personalizada",
    "Pago seguro y rápido",
    "Seguimiento del pedido",
  ];

  const checkIfLoggedIn = () => sessionStorage.getItem("auth_token");

  const handleShowModal = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);

  const handleAddToCart = async () => {
    if (!checkIfLoggedIn()) {
      handleShowModal();
      return;
    }

    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const carritoId = parsedUser.carrito_id;

      if (!carritoId) {
        console.error("No se encontró un carrito válido.");
        return;
      }

      try {
        const response = await api.createData(`carritos/${carritoId}/productos`, {
          producto_id: producto.id,
          cantidad: 1,
        });

        if (response.data) {
          console.log("Producto añadido al carrito");
        } else {
          console.error("Hubo un error al añadir el producto al carrito");
        }
      } catch (error) {
        console.error("Error al agregar el producto al carrito", error);
      }
    } else {
      handleShowModal();
    }
  };

  return (
    <>
      <SEO
        title={`Diseño de Interiorismo | Escultura Terrazo | ${producto.nombre}`}
        description={`Detalles del producto ${producto.nombre}. ${producto.descripcion || ""}`}
        endpoint={`productos/${producto.id}`}
      />

      <NavBar alwaysLight />

      <main>
        <section className="shadow-inner-section seccionProducto pt-5 pb-5">
          <div className="container pt-5">
            <div className="row gy-4 pt-5">
              <div className="col-6 col-lg-4 pt-5">
                {imagenes[0] ? (
                  <img
                    src={`${import.meta.env.VITE_LOCAL_API_URL.replace("/api", "")}/storage/${imagenes[0].url}`}
                    alt={producto.nombre}
                    className="w-100 imagenProducto"
                  />
                ) : (
                  <p>No hay imagen</p>
                )}
              </div>
              <div className="col-6 col-lg-4 pt-5">
                {imagenes[1] ? (
                  <img
                    src={`${import.meta.env.VITE_LOCAL_API_URL.replace("/api", "")}/storage/${imagenes[1].url}`}
                    alt={producto.nombre}
                    className="w-100 imagenProducto"
                  />
                ) : (
                  <p>No hay segunda imagen</p>
                )}
              </div>

              <div className="col-12 col-lg-4 ps-4 pt-5">
                <div className="textoProducto pt-4 pb-5">
                  <h4>{producto.nombre}</h4>
                  <p className="py-2">{producto.material || "Material no disponible"}</p>
                  <h5>{producto.precio ? `${producto.precio} €` : "Precio no disponible"}</h5>
                </div>

                <div className="descripcionProducto pb-2">
                  <p className="fw-light">{producto.descripcion || "Sin descripción disponible."}</p>
                </div>

                <div className="agregarCarrito py-5 border-bottom">
                  <button className="btnAgregar" onClick={handleAddToCart}>
                    Añadir al carrito
                  </button>
                </div>

                <div className="acordeon-section border-bottom">
                  <div
                    className="medidasCaracteristicas d-flex justify-content-between align-items-center py-4"
                    onClick={() => setOpenMedidas((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="no-margin mb-0 fw-semibold">Medidas y características</p>
                    <span className="no-margin pe-3 fw-semibold">{openMedidas ? "−" : "+"}</span>
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

                <div className="acordeon-section border-bottom">
                  <div
                    className="envioDevoluciones d-flex justify-content-between align-items-center py-4"
                    onClick={() => setOpenEnvio((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="no-margin mb-0 fw-semibold">Envío y devoluciones</p>
                    <span className="no-margin pe-3 fw-semibold">{openEnvio ? "−" : "+"}</span>
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

              {similares.map((productoSimilar) => (
                <div key={productoSimilar.id} className="col-6 col-md-4">
                  <div className="imagenContainer">
                    <Link to={`/productos/${productoSimilar.slug || productoSimilar.id}`}>
                      <img
                        src={`${import.meta.env.VITE_LOCAL_API_URL.replace("/api", "")}/storage/${productoSimilar.imagen}`}
                        alt={productoSimilar.nombre}
                        className="w-100"
                      />
                    </Link>
                  </div>
                  <div className="textContainer py-4">
                    <h5 className="pb-1 pb-lg-3">{productoSimilar.nombre}</h5>
                    <p className="m-0">Material:</p>
                    <p className="fw-light m-0 pb-3">{productoSimilar.material || "N/D"}</p>
                    <p className="m-0">Dimensiones:</p>
                    <p className="fw-light m-0 pb-3 pb-lg-4">
                      Altura: {productoSimilar.alto || "N/D"} cm, Anchura: {productoSimilar.ancho || "N/D"} cm, Profundidad: {productoSimilar.profundidad || "N/D"} cm
                    </p>
                    <h5>{productoSimilar.precio ? `${productoSimilar.precio} €` : "Precio no disponible"}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {showLoginModal && (
        <div className="modal-backdrop fade show">
          <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">¡Necesitas iniciar sesión!</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <p>Por favor, inicia sesión para añadir productos al carrito.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="botonCrema px-3" onClick={handleCloseModal}>
                    Cerrar
                  </button>
                  <Link to="/login" className="botonMarron px-3 text-white text-decoration-none">
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductoDetallado;
