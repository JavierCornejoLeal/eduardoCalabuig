import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import provincias from "../utils/provincias";

import "../assets/styles/pasarelaPago.css";

import LlamaEterna from "../assets/images/productos/llamaEterna.webp";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";

// Esquema de validación con Yup
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  apellidos: yup.string().required("Los apellidos son obligatorios"),
  nif: yup.string(),
  telefono: yup.string().required("El teléfono es obligatorio"),
  email: yup
    .string()
    .email("Correo inválido")
    .required("El email es obligatorio"),
  ciudad: yup.string().required("La ciudad es obligatoria"),
  provincia: yup.string().required("La provincia es obligatoria"),
  codigoPostal: yup.string().required("El código postal es obligatorio"),
  direccion: yup.string().required("La dirección es obligatoria"),
  notas: yup.string(),
  tarjetaNumero: yup
    .string()
    .required("El número de tarjeta es obligatorio")
    .matches(/^\d{16}$/, "El número de tarjeta debe tener 16 dígitos"),
  tarjetaNombre: yup.string().required("El nombre del titular es obligatorio"),
  tarjetaValidez: yup
    .string()
    .required("La validez es obligatoria")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato válido: MM/AA"),
  tarjetaCVC: yup
    .string()
    .required("El CVC es obligatorio")
    .matches(/^\d{3,4}$/, "El CVC debe tener 3 o 4 dígitos"),
  tarjetaCodigoPostal: yup.string().required("El código postal es obligatorio"),
});

const PasarelaPago = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
    alert("Formulario válido y enviado (simulado).");
  };

  return (
    <>
      <NavBar alwaysLight />
      <main>
        <section className="py-5 shadow-inner-section">
          <Container className="pt-5">
            <Row className="pt-5">
              {/* Resumen carrito */}
              <Col
                lg={4}
                md={5}
                className="order-1 order-md-2 mb-4 resumen-carrito"
              >
                <div
                  className="border d-flex flex-column"
                  style={{ height: "60vh" }} // aumentado de 50vh a 60vh
                >
                  {/* Header fijo */}
                  <div className="resumen-header p-3 border-bottom">
                    <h5 className="mb-0 d-flex justify-content-between align-items-center">
                      Resumen del carrito
                    </h5>
                  </div>

                  {/* Lista productos scrollable */}
                  <div
                    className="resumen-productos overflow-auto p-1 p-lg-3"
                    style={{ height: "85%" }} // asignado para que ocupe más espacio
                  >
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="d-flex align-items-center mb-3"
                        style={{ gap: "1rem", flexWrap: "nowrap" }}
                      >
                        <Image
                          src={LlamaEterna}
                          alt="Llama Eterna"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                          className="me-3"
                        />
                        <div
                          style={{
                            flexGrow: 1,
                            minWidth: 0,
                          }}
                        >
                          <p className="mb-1 fw-semibold text-truncate">
                            Llama Eterna
                          </p>
                          <small className="text-truncate d-block">
                            1 x 279 €
                          </small>
                        </div>
                        <div
                          className="fw-semibold"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          279 €
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer fijo */}
                  <div className="resumen-footer p-3 border-top">
                    <hr />
                    <div className="d-flex justify-content-between fw-semibold mb-2">
                      <span>Subtotal (1 Artículo)</span>
                      <span>279 €</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Envío</span>
                      <span>Gratis</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total del pedido</span>
                      <span>279 €</span>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Formulario cliente */}
              <Col lg={8} md={7} className="order-2 order-md-1">
                <h3 className="pb-3">Información del cliente</h3>

                <div className="mb-3">
                  <small>
                    ¿Tiene una cuenta?{" "}
                    <a className="text-dark" href="/login">
                      Inicie sesión
                    </a>
                  </small>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Row className="g-3">
                    <Col lg={6}>
                      <Form.Control
                        type="text"
                        placeholder="Nombre *"
                        isInvalid={!!errors.nombre}
                        {...register("nombre")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6}>
                      <Form.Control
                        type="text"
                        placeholder="Apellidos *"
                        isInvalid={!!errors.apellidos}
                        {...register("apellidos")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.apellidos?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="NIF / NIE"
                        isInvalid={!!errors.nif}
                        {...register("nif")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nif?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="tel"
                        placeholder="Teléfono *"
                        isInvalid={!!errors.telefono}
                        {...register("telefono")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.telefono?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6}>
                      <Form.Control
                        type="email"
                        placeholder="Correo electrónico *"
                        isInvalid={!!errors.email}
                        {...register("email")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Ciudad *"
                        isInvalid={!!errors.ciudad}
                        {...register("ciudad")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.ciudad?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Código Postal *"
                        isInvalid={!!errors.codigoPostal}
                        {...register("codigoPostal")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.codigoPostal?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6}>
                      <Form.Select
                        isInvalid={!!errors.provincia}
                        {...register("provincia")}
                      >
                        <option value="">Seleccion provincia *</option>
                        {provincias.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.provincia?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6}>
                      <Form.Control
                        type="text"
                        placeholder="Dirección *"
                        isInvalid={!!errors.direccion}
                        {...register("direccion")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.direccion?.message}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  <Form.Group className="my-3">
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Notas adicionales"
                      isInvalid={!!errors.notas}
                      {...register("notas")}
                      style={{ minHeight: "120px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.notas?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* FORMULARIO DE PAGO */}

                  <h3 className="pb-3 mt-5">Información de pago</h3>
                  <Row className="g-3">
                    <Col xs={12}>
                      <Form.Label>Número de la tarjeta *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        isInvalid={!!errors.tarjetaNumero}
                        {...register("tarjetaNumero")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tarjetaNumero?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={12}>
                      <Form.Label>Nombre del titular *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre Completo"
                        isInvalid={!!errors.tarjetaNombre}
                        {...register("tarjetaNombre")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tarjetaNombre?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={4}>
                      <Form.Label>Válido hasta (mm/aa) *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM / AA"
                        isInvalid={!!errors.tarjetaValidez}
                        {...register("tarjetaValidez")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tarjetaValidez?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={4}>
                      <Form.Label>CVV/CVC *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="CVC"
                        isInvalid={!!errors.tarjetaCVC}
                        {...register("tarjetaCVC")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tarjetaCVC?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={4}>
                      <Form.Label>Código postal *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="90210"
                        isInvalid={!!errors.tarjetaCodigoPostal}
                        {...register("tarjetaCodigoPostal")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tarjetaCodigoPostal?.message}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    className="botonMarron text-white mt-3 px-3 w-100"
                  >
                    Finalizar compra
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PasarelaPago;
