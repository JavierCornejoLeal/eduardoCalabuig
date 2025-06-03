import React from "react";
import { Button, Image } from "react-bootstrap";
import { PiX } from "react-icons/pi";
import { BsTruck, BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; 

import "../assets/styles/cartPanel.css";

import Producto1 from "../assets/images/productos/llamaEterna.webp";
import { Navigate } from "react-router-dom";

const CartPanel = ({
  onClose,
  incrementarCantidad,
  decrementarCantidad,
  eliminarProducto,
  totalPrice,
  navbarHeight,
}) => {

  const navigate = useNavigate();
  // Productos estáticos hardcodeados
  const cartProducts = [
    {
      id: 1,
      nombre: "Mesa Norsica 616 (Roble)",
      detalles: "Altura 85 cm, Ancho 72 cm, Fondo 78 cm",
      cantidad: 1,
      precioUnit: 370,
      imagen: Producto1,
    },
    {
      id: 2,
      nombre: "Sillón Astor 210 (Terciopelo Ámbar)",
      detalles: "Altura 85 cm, Ancho 72 cm, Fondo 78 cm",
      cantidad: 2,
      precioUnit: 280,
      imagen:
        "https://cdn.shopify.com/s/files/1/0270/7331/3819/products/sillon-astor-terciopelo-ambar_360x.jpg",
    },
    {
      id: 3,
      nombre: "Escultura Loop 032",
      detalles: "Altura 26 cm, Ancho 18 cm, Fondo 10 cm",
      cantidad: 1,
      precioUnit: 95,
      imagen:
        "https://cdn.shopify.com/s/files/1/0270/7331/3819/products/escultura-loop_360x.jpg",
    },
    {
      id: 4,
      nombre: "Escultura Loop 032",
      detalles: "Altura 26 cm, Ancho 18 cm, Fondo 10 cm",
      cantidad: 1,
      precioUnit: 95,
      imagen:
        "https://cdn.shopify.com/s/files/1/0270/7331/3819/products/escultura-loop_360x.jpg",
    },
  ];

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

      {/* ZONA CENTRAL (Scroll sólo aquí) */}
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
                src={prod.imagen}
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
                  {prod.detalles}
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
                      decrementarCantidad && decrementarCantidad(prod.id)
                    }
                    disabled={prod.cantidad <= 1}
                    aria-label={`Disminuir cantidad de ${prod.nombre}`}
                  >
                    −
                  </Button>
                  <span aria-live="polite" aria-atomic="true">
                    {prod.cantidad}
                  </span>
                  <Button
                    size="sm"
                    variant="outline-white"
                    className="border-0 botonAgregar"
                    onClick={() =>
                      incrementarCantidad && incrementarCantidad(prod.id)
                    }
                    aria-label={`Incrementar cantidad de ${prod.nombre}`}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div style={{ textAlign: "right", minWidth: "50px" }}>
                <div className="pb-3">
                  {(prod.precioUnit * prod.cantidad).toFixed(2)} €
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
              .reduce((acc, p) => acc + p.cantidad * p.precioUnit, 0)
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
