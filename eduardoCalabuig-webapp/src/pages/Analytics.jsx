import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Tabla from "../components/tabla/Tabla";
import Paginator from "../components/Paginator";
import Filtros from "../components/Filtros";

import api from "../utils/api";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Analytics = () => {
    return (
        <>
            <NavBar />

            <main className="pt-5">
                <section className="py-5 shadow-inner-section">
                    <div className="container-fluid pt-5 px-5">
                        <div className="row px-5 mb-3">
                            <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                                <h1>COMING SOON...</h1>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Analytics;