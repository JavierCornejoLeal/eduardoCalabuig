import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { Navbar, Nav, Container } from "react-bootstrap";
import { PiShoppingCartThin, PiUserLight, PiX } from "react-icons/pi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Asegúrate de que axios esté importado

import { IoIosLogOut } from "react-icons/io";

import "../assets/styles/Navbar.css";
import logoMarron from "../assets/images/logo/logo.webp";
import logoNegro from "../assets/images/logo/logoNegro.webp";

import CartPanel from "./CartPanel";

const NavBar = ({ carrito = [], alwaysLight = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(window.innerHeight * 0.08);
  const [userName, setUserName] = useState(null); // Estado para almacenar el nombre del usuario
  const [cartCount, setCartCount] = useState(0); // Para el total de productos en el carrito

  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  const navigate = useNavigate();

  // Calcula el total de items en el carrito sumando cantidades
  useEffect(() => {
    const cartCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCartCount(cartCount); // Actualiza el número de elementos en el carrito
  }, [carrito]);

  useEffect(() => {
    const onScroll = () => {
      const headerHeight = window.innerHeight * 0.8;
      setScrolled(window.scrollY > headerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setNavbarHeight(window.innerHeight * 0.08);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Verifica si el usuario está logueado y obtener el nombre desde sessionStorage
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user); // Parseamos el JSON para acceder a los datos del usuario
      setUserName(parsedUser.name); // Asignamos el nombre del usuario al estado
    }
  }, []);

  const isLight = alwaysLight || scrolled || expanded || showCartPanel;

  const links = [
    { text: "SOBRE MÍ", to: "/#aboutMe", isHash: true },
    { text: "PROYECTOS", to: "/proyectos" },
    { text: "NOTICIAS", to: "/noticias" },
    { text: "CONTACTO", to: "/contacto" },
    { text: "PRODUCTOS", to: "/productos" },
  ];

  const logout = async () => {
    // Si la respuesta es exitosa, guarda el toke
    sessionStorage.removeItem("auth_token"); // Elimina el token de la sesión
    sessionStorage.removeItem("user"); // Elimina los datos del usuario
    console.log("Logout exitoso:", response.data);

    // Redirige al usuario a la página de inicio
    navigate("/");
  };

  return (
    <>
      <Navbar
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        expand="lg"
        variant={isLight ? "light" : "dark"}
        style={{
          backgroundColor: isLight ? "rgba(255,255,255,0.8)" : "transparent",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: isLight ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
          position: "fixed",
          width: "100%",
          zIndex: 2000,
          transition: "all 0.3s ease",
        }}
      >
        <Container fluid className="px-md-5 mx-md-5">
          <Navbar.Brand href="/">
            <img
              src={isLight ? logoNegro : logoMarron}
              alt="Eduardo Calabuig"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            {expanded ? <PiX size={30} /> : <HiBars3BottomRight size={30} />}
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto align-items-center gap-3"
              style={{ color: isLight ? "black" : "white" }}
            >
              {links.map(({ text, to, isHash }, idx) => {
                const isActive = isHash
                  ? currentPath.startsWith(to)
                  : currentPath === to;

                const linkClass = isActive
                  ? isLight
                    ? "navbar-hover-black active"
                    : "navbar-hover-white active"
                  : isLight
                  ? "navbar-hover-black"
                  : "navbar-hover-white";

                return isHash ? (
                  <Nav.Link
                    key={idx}
                    as={HashLink}
                    to={to}
                    smooth
                    className={linkClass}
                    style={{ color: isLight ? "black" : "white" }}
                    onClick={() => setExpanded(false)}
                  >
                    {text}
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    key={idx}
                    href={to}
                    className={linkClass}
                    style={{ color: isLight ? "black" : "white" }}
                    onClick={() => setExpanded(false)}
                  >
                    {text}
                  </Nav.Link>
                );
              })}

              <Nav.Link
                onClick={() => setShowCartPanel(!showCartPanel)}
                className={expanded ? "text-link" : "position-relative"}
                style={{
                  color: isLight ? "black" : "white",
                  cursor: "pointer",
                }}
                aria-label="Mostrar carrito"
                aria-expanded={showCartPanel}
              >
                {expanded ? (
                  <>
                    CARRITO
                    {cartCount >= 0 && (
                      <span className="cart-badge-horizontal ms-2">
                        {cartCount}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <PiShoppingCartThin size={30} />
                    {cartCount >= 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </>
                )}
              </Nav.Link>

              {/* Mostrar nombre de usuario si está logueado */}
              {userName ? (
                <>
                  <Nav.Link
                    href="/login"
                    className={expanded ? "text-link" : ""}
                    style={{ color: isLight ? "black" : "white" }}
                  >
                    {expanded ? userName.toUpperCase() : userName.toUpperCase()}
                  </Nav.Link>
                  <Nav.Link
                  href="/"
                    className={expanded ? "text-link" : ""}
                    style={{ color: isLight ? "black" : "white" }}
                    onClick={() => logout()}
                  >
                    {expanded ? "CERRAR SESIÓN" : <IoIosLogOut size={25} />}
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  href="/login"
                  className={expanded ? "text-link" : ""}
                  style={{ color: isLight ? "black" : "white" }}
                >
                  {expanded ? "INICIO SESIÓN" : <PiUserLight size={30} />}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Aquí insertamos el CartPanel */}
      {showCartPanel && (
        <CartPanel
          cartProducts={carrito}
          onClose={() => setShowCartPanel(false)}
          incrementarCantidad={() => {}}
          decrementarCantidad={() => {}}
          eliminarProducto={() => {}}
          totalPrice={carrito.reduce(
            (acc, item) => acc + item.cantidad * (item.precioUnit || 0),
            0
          )}
          navbarHeight={navbarHeight}
        />
      )}
    </>
  );
};

export default NavBar;
