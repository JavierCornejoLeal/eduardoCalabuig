import React from "react";
import backgroundImage from "../assets/images/header/exxterior-reducida.webp"; 

import "../assets/styles/header.css";

const Header = ({ children }) => {
  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        height: "56em",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textShadow: "0 0 10px rgba(0,0,0,0.7)",
      }}
    >
      <div className="textoContainer" style={{ zIndex: 2, fontSize: "3rem", fontWeight: "bolder", textAlign: "center", padding: "0 20px" }}>
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
    </header>
  );
};

export default Header;
