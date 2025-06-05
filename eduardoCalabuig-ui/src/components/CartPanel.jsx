import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { PiX } from "react-icons/pi";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";

import "../assets/styles/cartPanel.css";
import api from "../utils/api";

const CartPanel = ({ onClose, totalPrice, navbarHeight }) => {
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const incrementarCantidad = async (productoId) => {
    try {
      const user = sessionStorage.getItem("user");
      if (!user) return;
      const parsedUser = JSON.parse(user);
      const carritoId = parsedUser.carrito_id;
      if (!carritoId) return;

      const carritoProducto = cartProducts.find((p) => p.id === productoId);
      if (carritoProducto) {
        const newQuantity = parseInt(carritoProducto.pivot.cantidad, 10) + 1;
        await api.updateData(
          `carritos/${carritoId}/productos`,
          productoId,
          { cantidad: newQuantity }
        );

        setCartProducts((prev) =>
          prev.map((prod) =>
            prod.id === productoId
              ? { ...prod, pivot: { ...prod.pivot, cantidad: newQuantity } }
              : prod
          )
        );
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

      const carritoProducto = cartProducts.find((p) => p.id === productoId);
      if (!carritoProducto || carritoProducto.pivot.cantidad <= 1) return;

      const newQuantity = carritoProducto.pivot.cantidad - 1;
      await api.updateData(
        `carritos/${carritoId}/productos`,
        productoId,
        { cantidad: newQuantity }
      );

      setCartProducts((prev) =>
        prev.map((prod) =>
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
      if (!user) return;
      const parsedUser = JSON.parse(user);
      const carritoId = parsedUser.carrito_id;
      if (!carritoId) return;

      await api.deleteData(`carritos/${carritoId}/productos`, productoId);

      setCartProducts((prev) =>
        prev.filter((prod) => prod.id !== productoId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const carritoId = parsedUser.carrito_id;
      if (carritoId) {
        api
          .getData(`carritos/${carritoId}/productos`)
          .then((response) => {
            let productosArray = [];
            if (Array.isArray(response.data.productos)) {
              productosArray = response.data.productos;
            } else if (Array.isArray(response.data.data)) {
              productosArray = response.data.data;
            } else if (Array.isArray(response.data)) {
              productosArray = response.data;
            }
            setCartProducts(productosArray);
            setLoading(false);
          })
          .catch((error) => {
            console.error(
              "Error al obtener los productos del carrito:",
              error
            );
            setCartProducts([]);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const API_BASE_URL = import.meta.env.VITE_LOCAL_API_URL.replace(
    "/api",
    ""
  );

  if (loading) return <Spinner />;

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

      {/* ZONA CENTRAL (Scroll) */}
      <div
        style={{
          flex: "1 1 auto",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      >
        {Array.isArray(cartProducts) && cartProducts.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          Array.isArray(cartProducts) &&
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
                    onClick={() => decrementarCantidad(prod.id)}
                    disabled={prod.pivot.cantidad <= 1}
                    aria-label={`Disminuir cantidad de ${prod.nombre}`}
                  >
                    −
                  </Button>
                  <span aria-live="polite" aria-atomic="true">
                    {prod.pivot.cantidad}
                  </span>
                  <Button
                    size="sm"
                    variant="outline-white"
                    className="border-0 botonAgregar"
                    onClick={() => incrementarCantidad(prod.id)}
                    aria-label={`Incrementar cantidad de ${prod.nombre}`}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div style={{ textAlign: "right", minWidth: "50px" }}>
                <div className="pb-3">
                  {prod.precio} €
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => eliminarProducto(prod.id)}
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
            {Array.isArray(cartProducts)
              ? cartProducts
                  .reduce(
                    (acc, p) => acc + p.pivot.cantidad * p.precio,
                    0
                  )
                  .toFixed(2)
              : "0.00"}{" "}
            €
          </span>
        </div>

        <div style={{ marginTop: "15px" }}>
          <Button
            className="w-100 mb-2 botonMarron"
            onClick={() => navigate("/pago")}
            disabled={!Array.isArray(cartProducts) || cartProducts.length === 0}
          >
            Pasar por caja
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
