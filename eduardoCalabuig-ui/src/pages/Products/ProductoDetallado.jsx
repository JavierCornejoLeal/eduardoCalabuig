import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CategoriesMenu from "../../components/CategoriesMenu";
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Obtener producto por slug
        const resProducto = await api.getData(`productos/slug/${slug}`);
        const prod = resProducto.data;
        setProducto(prod);

        // 2. Obtener imágenes usando id del producto obtenido
        const resImagenes = await api.getData(`productos/${prod.id}/imagenes`);
        setImagenes(resImagenes.data);

        // 3. Obtener productos similares excluyendo el actual
        const resSimilares = await api.getData("productos");
        const otrosProductos = resSimilares.data.filter(p => p.id !== prod.id);
        const productosAleatorios = otrosProductos
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setSimilares(productosAleatorios);

      } catch (err) {
        setError("Error cargando el producto o sus datos relacionados");
      }
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Cargando producto...</p>;
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

  const handleAddToCart = () => {
    console.log("Añadiendo al carrito:", {
      producto: producto?.nombre || "Producto desconocido",
      cantidad: 1,
    });
  };

  return (
    <>
      <SEO
        title={`Diseño de Interiorismo | Escultura Terrazo | ${producto.nombre}`}
        description={`Detalles del producto ${producto.nombre}. ${producto.descripcion || ""}`}
        endpoint={`productos/${producto.id}`}
      />

      <NavBar alwaysLight />

      <CategoriesMenu />

      <main>
        <section className="shadow-inner-section seccionProducto pt-5 pb-5">
          <div className="container">
            <div className="row gy-4">
              <div className="col-6 col-lg-4">
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
              <div className="col-6 col-lg-4">
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

              <div className="col-12 col-lg-4 ps-4">
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
                    onClick={() => setOpenMedidas(prev => !prev)}
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
                    onClick={() => setOpenEnvio(prev => !prev)}
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

              {similares.map(productoSimilar => (
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

      <Footer />
    </>
  );
};

export default ProductoDetallado;
