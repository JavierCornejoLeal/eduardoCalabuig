import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { PiX } from "react-icons/pi";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import "../assets/styles/cartPanel.css";
import api from "../utils/api";

const CartPanel = ({
  onClose,
  totalPrice,
  navbarHeight,
}) => {
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]); // Estado para almacenar los productos del carrito
  const [loading, setLoading] = useState(true);

const incrementarCantidad = async (productoId) => {
  try {
    const user = sessionStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      const carritoId = parsedUser.carrito_id;

      if (carritoId) {
        // Buscar el producto en el carrito
        const carritoProducto = cartProducts.find((p) => p.id === productoId);

        if (carritoProducto) {
          // Asegúrate de que 'cantidad' sea un número entero
          const newQuantity = parseInt(carritoProducto.pivot.cantidad, 10) + 1;
          console.log("Producto id:", productoId);
          console.log("Cantidad actual:", newQuantity);

          // Aquí usem l'Opció 1: passem l'endpoint sense l'ID i el ID per separat
          const endpoint = `carritos/${carritoId}/productos`;

          await api.updateData(
            endpoint,       // endpoint base (sense incloure el productId)
            productoId,     // a continuació, l'ID del producte
            { cantidad: newQuantity } // cos de la petició
          );

          // Actualitzar l'estat local
          setCartProducts((prevState) =>
            prevState.map((prod) =>
              prod.id === productoId
                ? { ...prod, pivot: { ...prod.pivot, cantidad: newQuantity } }
                : prod
            )
          );
        }
      }
    }
  } catch (error) {
    console.error("Error al actualizar la cantidad:", error);
  }
};





const decrementarCantidad = async (productoId) => {
  try {
    const user = sessionStorage.getItem("user");
    if (!user) return;

    const parsedUser = JSON.parse(user);
    const carritoId = parsedUser.carrito_id;
    if (!carritoId) return;

    const carritoProducto = cartProducts.find(p => p.id === productoId);
    if (!carritoProducto || carritoProducto.pivot.cantidad <= 1) return;

    const newQuantity = carritoProducto.pivot.cantidad - 1;

    // Aquí: separo endpoint y el id, y por último paso el JSON con la cantidad
    await api.updateData(
      `carritos/${carritoId}/productos`,  // endpoint sin el ID
      productoId,                         // aquí va el ID del producto
      { cantidad: newQuantity }           // este objeto va en el body
    );

    // Actualizo estado local
    setCartProducts(prev =>
      prev.map(prod =>
        prod.id === productoId
          ? { ...prod, pivot: { ...prod.pivot, cantidad: newQuantity } }
          : prod
      )
    );
  } catch (error) {
    console.error("Error al disminuir la cantidad:", error);
  }
};


const eliminarProducto = async (productoId) => {
  try {
    const user = sessionStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      const carritoId = parsedUser.carrito_id;

      if (carritoId) {
        // endpoint base (sense passar l’ID aquí)
        const endpoint = `carritos/${carritoId}/productos`;
        
        // Cridem deleteData amb l’endpoint i el productId separat
        await api.deleteData(endpoint, productoId);

        // Actualitzar l’estat local
        setCartProducts((prevState) =>
          prevState.filter((prod) => prod.id !== productoId)
        );
      }
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
};

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user); // Parseamos el JSON para acceder a los datos del usuario
      const carritoId = parsedUser.carrito_id; // Accedemos al carrito_id del usuario

      if (carritoId) {
        // Obtener los productos del carrito (ahora también incluyendo la cantidad desde carrito_productos)
        api
          .getData(`carritos/${carritoId}/productos`)
          .then((response) => {
            setCartProducts(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error al obtener los productos del carrito:", error);
            setLoading(false);
          });
      }
    }
  }, []); // Solo se ejecuta una vez cuando se monta el componente

  const API_BASE_URL = import.meta.env.VITE_LOCAL_API_URL.replace("/api", ""); 

  // Manejo del caso de carga
  if (loading) return <p>Cargando productos del carrito...</p>;

  return (
    <div
      className="cartPanel"
      style={{
        position: "fixed",
        top: "106px",
        right: 0,
        height: "80vh",
        width: "40%",
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 4000,
        display: "flex",
        flexDirection: "column",
        padding: "2em 4em",
      }}
      role="region"
      aria-label="Panel carrito de compras"
    >
      {/* ZONA SUPERIOR (Sticky Top) */}
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          borderBottom: "1px solid #ccc",
        }}
        className="sticky-top"
      >
        <h5 className="fw-semibold" style={{ margin: 0 }}>
          Carrito
        </h5>
        <Button
          variant="link"
          onClick={onClose}
          style={{ fontSize: "1.3rem", color: "#333", textDecoration: "none" }}
          aria-label="Cerrar carrito"
        >
          <PiX />
        </Button>
      </div>

      {/* ZONA CENTRAL (Scroll solo aquí) */}
      <div
        style={{
          flex: "1 1 auto",
          overflowY: "auto",
          paddingRight: "10px", // para que el scroll no choque con contenido
        }}
      >
        {cartProducts.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          cartProducts.map((prod) => (
            <div
              key={prod.id}
              style={{
                display: "flex",
                marginBottom: "20px",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <Image
                src={`${API_BASE_URL}/storage/${prod.imagen}`}
                alt={prod.nombre}
                style={{
                  width: "7em",
                  height: "7em",
                  objectFit: "contain",
                }}
                className="imagenCarrito"
              />
              <div style={{ flexGrow: 1 }}>
                <p className="fw-semibold m-0 pb-2">{prod.nombre}</p>
                <p
                  style={{
                    margin: "4px 0",
                    fontSize: "0.9rem",
                    color: "#555",
                  }}
                >
                  {prod.material}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "0.9rem",
                    marginTop: "1em",
                  }}
                >
                  <Button
                    size="sm"
                    variant="outline-white"
                    className="border-0 botonAgregar"
                    onClick={() =>
                      decrementarCantidad(prod.id)
                    }
                    disabled={prod.pivot.cantidad <= 1}
                    aria-label={`Disminuir cantidad de ${prod.nombre}`}
                  >
                    −
                  </Button>
                  <span aria-live="polite" aria-atomic="true">
                    {prod.pivot.cantidad}{" "}
                    {/* Esta cantidad viene de carrito_productos */}
                  </span>
                  <Button
                    size="sm"
                    variant="outline-white"
                    className="border-0 botonAgregar"
                    onClick={() =>
                      incrementarCantidad(prod.id)
                    }
                    aria-label={`Incrementar cantidad de ${prod.nombre}`}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div style={{ textAlign: "right", minWidth: "50px" }}>
                <div className="pb-3">
                  {/* Mostrar el precio unitario */}
                  {prod.precio} €
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => eliminarProducto && eliminarProducto(prod.id)}
                  style={{ color: "#a67c52", marginTop: "5px" }}
                  aria-label={`Eliminar ${prod.nombre} del carrito`}
                >
                  <BsTrash3 className="text-dark" size={20} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ZONA INFERIOR (Sticky Bottom) */}
      <div
        className="botonesContainer sticky-bottom pt-3"
        style={{ flex: "0 0 auto" }}
      >
        <div
          style={{
            borderTop: "1px solid #ccc",
            paddingTop: "15px",
            fontSize: "1.1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span className="fw-semibold">Coste Total</span>
          <span className="fw-semibold">
            {cartProducts
              .reduce((acc, p) => acc + p.pivot.cantidad * p.precio, 0)
              .toFixed(2)}{" "}
            €
          </span>
        </div>

        <div style={{ marginTop: "15px" }}>
          <Button
            className="w-100 mb-2 botonMarron"
            onClick={() => navigate("/pago")}
          >
            Pasar por caja
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
