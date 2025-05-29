import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { PiShoppingCartThin, PiUserLight, PiX } from "react-icons/pi";
import { HiBars3BottomRight } from "react-icons/hi2";

import "../assets/styles/Navbar.css";

import logoMarron from "../assets/images/logo/logo.webp";
import logoNegro from "../assets/images/logo/logoNegro.webp";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const headerHeight = window.innerHeight * 0.8; // Ajusta según altura Header
      setScrolled(window.scrollY > headerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      expand="lg"
      variant={scrolled || expanded ? "light" : "dark"}
      style={{
        backgroundColor: scrolled || expanded
          ? "rgba(255, 255, 255, 0.8)"
          : "transparent",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: scrolled || expanded
          ? "0 4px 6px rgba(0,0,0,0.1)"
          : "none",
        position: "fixed",
        width: "100%",
        zIndex: 2000,
        transition: "all 0.3s ease",
      }}
    >
      <Container fluid className="px-md-5 mx-md-5">
        {/* Logo */}
        <Navbar.Brand href="#">
          <img
            src={scrolled || expanded ? logoNegro : logoMarron}
            alt="Eduardo Calabuig"
          />
        </Navbar.Brand>

        {/* Toggle personalizado */}
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          {expanded ? <PiX size={30} /> : <HiBars3BottomRight size={30} />}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto align-items-center gap-3"
            style={{ color: scrolled || expanded ? "black" : "white" }}
          >
            {["SOBRE MÍ", "PROYECTOS", "NOTICIAS", "CONTACTO", "PRODUCTOS"].map(
              (text, idx) => (
                <Nav.Link
                  key={idx}
                  href={"/" + text.toLowerCase().replace(" ", "-")}
                  className={scrolled || expanded
                    ? "navbar-hover-black"
                    : "navbar-hover-white"
                  }
                  style={{ color: scrolled || expanded ? "black" : "white" }}
                >
                  {text}
                </Nav.Link>
              )
            )}

            <Nav.Link
              href="#carrito"
              className={expanded ? "text-link" : ""}
              style={{ color: scrolled || expanded ? "black" : "white" }}
            >
              {expanded ? "CARRITO" : <PiShoppingCartThin size={30} />}
            </Nav.Link>
            <Nav.Link
              href="#usuario"
              className={expanded ? "text-link" : ""}
              style={{ color: scrolled || expanded ? "black" : "white" }}
            >
              {expanded ? "INICIO SESIÓN" : <PiUserLight size={30} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
