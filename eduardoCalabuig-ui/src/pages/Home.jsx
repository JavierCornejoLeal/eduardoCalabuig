import React from "react";
import "../assets/styles/home.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <div>
        <NavBar />
        <Header>
          <p>Transformamos Espacios,</p>
          <p>Creamos Emociones</p>
        </Header>

        <Footer />
      </div>
    </>
  );
};

export default Home;
