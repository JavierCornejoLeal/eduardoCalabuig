import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { PiShoppingCartThin, PiUserLight, PiX } from "react-icons/pi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import api from "../utils/api";
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
  const [userName, setUserName] = useState(null);
  const [totalCartItems, setTotalCartItems] = useState(0);

  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  const navigate = useNavigate();

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

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name);

      const carritoId = parsedUser.carrito_id;
      if (carritoId) {
        const fetchCartItems = () => {
          api
            .getData(`carritos/${carritoId}/productos`)
            .then((response) => {
              let productosArray = [];

              if (Array.isArray(response.data.productos)) {
                productosArray = response.data.productos;
              }
              else if (Array.isArray(response.data.data)) {
                productosArray = response.data.data;
              }
              else if (Array.isArray(response.data)) {
                productosArray = response.data;
              }
              const totalItems = productosArray.reduce(
                (acc, item) => acc + (item.pivot?.cantidad || 0),
                0
              );
              setTotalCartItems(totalItems);
            })
            .catch((error) => {
              console.error(
                "Error al obtener los productos del carrito:",
                error
              );
              setTotalCartItems(0);
            });
        };

        fetchCartItems();

        const interval = setInterval(fetchCartItems, 5000);
        return () => clearInterval(interval);
      }
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
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("user");
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
                    <span className="cart-badge-horizontal ms-2">
                      {totalCartItems}
                    </span>
                  </>
                ) : (
                  <>
                    <PiShoppingCartThin size={30} />
                    <span className="cart-badge">{totalCartItems}</span>
                  </>
                )}
              </Nav.Link>

              {userName ? (
                <>
                  <Nav.Link
                    href="/login"
                    className={expanded ? "text-link" : ""}
                    style={{ color: isLight ? "black" : "white" }}
                  >
                    {userName.toUpperCase()}
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

      {showCartPanel && (
        <CartPanel
          onClose={() => setShowCartPanel(false)}
          totalPrice={totalCartItems}
          navbarHeight={navbarHeight}
        />
      )}
    </>
  );
};

export default NavBar;
