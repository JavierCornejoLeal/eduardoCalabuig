import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { Navbar, Nav, Container } from "react-bootstrap";
import { PiShoppingCartThin, PiUserLight, PiX } from "react-icons/pi";
import { HiBars3BottomRight } from "react-icons/hi2";

import "../assets/styles/Navbar.css";
import logoMarron from "../assets/images/logo/logo.webp";
import logoNegro from "../assets/images/logo/logoNegro.webp";

const NavBar = ({ alwaysLight = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const headerHeight = window.innerHeight * 0.8;
      setScrolled(window.scrollY > headerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = alwaysLight || scrolled || expanded;

  const links = [
    { text: "Analytics", to: "/analytics", isHash: true },
    { text: "Productos", to: "/productos" },
    { text: "Pedidos", to: "/pedidos" },
    { text: "Clientes", to: "/clientes" },
  ];

  const currentPath = window.location.pathname.toLowerCase();

  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      expand="lg"
      variant={isLight ? "light" : "dark"}
      style={{
        backgroundColor: isLight ? "rgba(255,255,255,0.8)" : "#51443D",
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
          <img src={isLight ? logoNegro : logoMarron} alt="Eduardo Calabuig" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          {expanded ? <PiX size={30} /> : <HiBars3BottomRight size={30} />}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="align-items-center navegador"
            style={{
              color: isLight ? "black" : "white",
              gap: "5em",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {links.map(({ text, to, isHash }, idx) => {
              const isActive = currentPath === to.toLowerCase();
              const commonStyle = {
                color: isLight ? "black" : "white",
                textDecoration: isActive ? "underline" : "none",
                textUnderlineOffset: isActive ? "5px" : undefined,
              };

              return isHash ? (
                <Nav.Link
                  key={idx}
                  as={HashLink}
                  to={to}
                  smooth
                  className={
                    (isLight ? "navbar-hover-black" : "navbar-hover-white") +
                    (isActive ? " active-link" : "")
                  }
                  style={commonStyle}
                  onClick={() => setExpanded(false)}
                >
                  {text}
                </Nav.Link>
              ) : (
                <Nav.Link
                  key={idx}
                  href={to}
                  className={
                    (isLight ? "navbar-hover-black" : "navbar-hover-white") +
                    (isActive ? " active-link" : "")
                  }
                  style={commonStyle}
                  onClick={() => setExpanded(false)}
                >
                  {text}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
