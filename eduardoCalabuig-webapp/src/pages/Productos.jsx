import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Tabla from "../components/tabla/Tabla";
import Paginator from "../components/Paginator";
import api from "../utils/api";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import "../assets/styles/productos.css";

const columns = [
  { header: "Imagen", key: "imagen", type: "image" },
  { header: "Nombre", key: "nombre" },
  { header: "Categoría", key: "categoria" },
  { header: "Cantidad", key: "cantidad" },
  { header: "Precio", key: "precio" },
];

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);

  // Producto actual para ver, editar o eliminar
  const [currentProducto, setCurrentProducto] = useState(null);

  // Form state para crear y editar
  const [form, setForm] = useState({
    nombre: "",
    alto: "",
    ancho: "",
    profundidad: "",
    precio: "",
    material: "",
    descripcion: "",
    categoria: "",
    cantidad: "",
  });

  // Imagen file para crear/editar
  const [imagenFile, setImagenFile] = useState(null);

    // Imagen para añadir en modal de añadir imagen
  const [imagenAddFile, setImagenAddFile] = useState(null);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = () => {
    setLoading(true);
    api
      .getData("productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos:", err))
      .finally(() => setLoading(false));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // --- Funciones para abrir modales ---

  const handleView = (producto) => {
    setCurrentProducto(producto);
    setShowViewModal(true);
  };

  // --- Modal añadir imagen ---

  const handleAddImage = (producto) => {
    setCurrentProducto(producto);
    setImagenAddFile(null);
    setShowAddImageModal(true);
  };

  const closeAddImageModal = () => {
    setShowAddImageModal(false);
    setCurrentProducto(null);
    setImagenAddFile(null);
  };

  const handleAddImageFileChange = (e) => {
    setImagenAddFile(e.target.files[0]);
  };

const handleAddImageSubmit = async (e) => {
  e.preventDefault();

  if (!imagenAddFile) {
    alert("Debes seleccionar una imagen para subir.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("producto_id", currentProducto.id); // Añade el id aquí
    formData.append("imagen", imagenAddFile);

    // POST a /api/imagenes, no a productos/{id}/imagenes
    await api.createData("imagenes", formData);

    alert("Imagen añadida correctamente");
    closeAddImageModal();
    loadProductos();
  } catch (error) {
    console.error("Error añadiendo imagen:", error);
    alert("Error al añadir imagen");
  }
};


  const handleEdit = (producto) => {
    setCurrentProducto(producto);
    setForm({
      nombre: producto.nombre || "",
      alto: producto.alto || "",
      ancho: producto.ancho || "",
      profundidad: producto.profundidad || "",
      precio: producto.precio || "",
      material: producto.material || "",
      descripcion: producto.descripcion || "",
      categoria: producto.categoria || "",
      cantidad: producto.cantidad || "",
    });
    setImagenFile(null);
    setShowEditModal(true);
  };

  const handleDelete = (producto) => {
    setCurrentProducto(producto);
    setShowDeleteModal(true);
  };

  // --- Cerrar modales ---

  const closeAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setCurrentProducto(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentProducto(null);
    resetForm();
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentProducto(null);
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      alto: "",
      ancho: "",
      profundidad: "",
      precio: "",
      material: "",
      descripcion: "",
      categoria: "",
      cantidad: "",
    });
    setImagenFile(null);
  };

  // --- Manejo formularios ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  // Crear producto
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!imagenFile) {
      alert("Debes seleccionar una imagen.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      formData.append("imagen", imagenFile);

      await api.createData("productos", formData);

      closeAddModal();
      loadProductos();
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  // Editar producto
const handleEditSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (imagenFile) formData.append("imagen", imagenFile);

    // Simular método PUT en Laravel
    formData.append("_method", "PUT");

    await api.updateData("productos", currentProducto.id, formData);

    closeEditModal();
    loadProductos();
  } catch (error) {
    console.error("Error actualizando producto:", error);

    if (error.response && error.response.data) {
      console.error("Detalles error:", error.response.data);
      alert(`Error: ${JSON.stringify(error.response.data.errors)}`);
    } else {
      alert("Error al actualizar producto");
    }
  }
};



  // Eliminar producto
  const handleConfirmDelete = async () => {
    try {
      await api.deleteData("productos", currentProducto.id);

      closeDeleteModal();
      loadProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <>
      <NavBar />
      <main className="pt-5">
        <section className="py-5 shadow-inner-section">
          <div className="container-fluid pt-5 px-5">
            <div className="row px-5 mb-3">
              <div className="col-6 d-flex align-items-center">
                <div className="productosPaginator d-flex flex-row align-items-center">
                  <p>Productos por página:</p>
                  <div className="pb-3">
                    <select
                      className="ms-3 px-3 py-2 bg-light"
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      <option value="1">1</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                <div className="totalProductos ps-5">
                  <p>
                    Total de productos:{" "}
                    <span className="fw-semibold">{productos.length}</span>
                  </p>
                </div>
              </div>
              <div className="col-6 text-end">
                <Button
                  className="botonMarron text-white px-3"
                  variant="botonMarron"
                  onClick={() => setShowAddModal(true)}
                >
                  <span className="pe-2">+</span> Añadir Producto
                </Button>
              </div>
            </div>

            <div className="row py-2 px-5">
              <div className="col-12">
                <Tabla
                  columns={columns}
                  data={currentProducts}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddImage={handleAddImage}
                />
                <Paginator
                  totalItems={productos.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>

          {/* Modal Añadir */}
          <Modal show={showAddModal} onHide={closeAddModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Añadir producto</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddSubmit}>
              <Modal.Body>
                {/* Campos texto */}
                {/* igual que tu modal original */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="nombre">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      className="inputModal"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      maxLength={255}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="categoria">
                    <Form.Label>Categoría *</Form.Label>
                    <Form.Control
                      type="text"
                      name="categoria"
                      placeholder="Categoria"
                      className="inputModal"
                      value={form.categoria}
                      onChange={handleChange}
                      required
                      maxLength={255}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="alto">
                    <Form.Label>Alto</Form.Label>
                    <Form.Control
                      type="text"
                      name="alto"
                      placeholder="Alto"
                      className="inputModal"
                      value={form.alto}
                      onChange={handleChange}
                      maxLength={255}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="ancho">
                    <Form.Label>Ancho</Form.Label>
                    <Form.Control
                      type="text"
                      name="ancho"
                      placeholder="Ancho"
                      className="inputModal"
                      value={form.ancho}
                      onChange={handleChange}
                      maxLength={255}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="profundidad">
                    <Form.Label>Profundidad</Form.Label>
                    <Form.Control
                      type="text"
                      name="profundidad"
                      placeholder="Profundidad"
                      className="inputModal"
                      value={form.profundidad}
                      onChange={handleChange}
                      maxLength={255}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="precio">
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="precio"
                      placeholder="Precio"
                      className="inputModal"
                      value={form.precio}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="cantidad">
                    <Form.Label>Cantidad *</Form.Label>
                    <Form.Control
                      type="number"
                      name="cantidad"
                      placeholder="Cantidad"
                      className="inputModal"
                      value={form.cantidad}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="material">
                    <Form.Label>Material</Form.Label>
                    <Form.Control
                      type="text"
                      name="material"
                      placeholder="Material"
                      className="inputModal"
                      value={form.material}
                      onChange={handleChange}
                      maxLength={255}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    placeholder="Descripción"
                    className="inputModal"
                    value={form.descripcion}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="imagen" className="mb-3">
                  <Form.Label>Imagen *</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="inputModal"
                    required
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="botonCrema px-3 text-dark"
                  onClick={closeAddModal}
                >
                  Cancelar
                </Button>
                <Button className="botonMarron px-3 text-white" type="submit">
                  Guardar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* Modal Visualizar */}
          <Modal
            show={showViewModal}
            onHide={closeViewModal}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Detalles de producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentProducto && (
                <div>
                  <p>
                    <strong>Nombre:</strong> {currentProducto.nombre}
                  </p>
                  <p>
                    <strong>Categoría:</strong> {currentProducto.categoria}
                  </p>
                  <p>
                    <strong>Alto:</strong> {currentProducto.alto}
                  </p>
                  <p>
                    <strong>Ancho:</strong> {currentProducto.ancho}
                  </p>
                  <p>
                    <strong>Profundidad:</strong> {currentProducto.profundidad}
                  </p>
                  <p>
                    <strong>Precio:</strong> {currentProducto.precio}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {currentProducto.cantidad}
                  </p>
                  <p>
                    <strong>Material:</strong> {currentProducto.material}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {currentProducto.descripcion}
                  </p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="botonCrema px-3 text-dark"
                onClick={closeViewModal}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal Editar */}
          <Modal
            show={showEditModal}
            onHide={closeEditModal}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleEditSubmit}>
              <Modal.Body>
                {/* Campos texto igual que el añadir pero con valores */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="nombre">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className="inputModal"
                      required
                      maxLength={255}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="categoria">
                    <Form.Label>Categoría *</Form.Label>
                    <Form.Control
                      type="text"
                      name="categoria"
                      value={form.categoria}
                      onChange={handleChange}
                      className="inputModal"
                      required
                      maxLength={255}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="alto">
                    <Form.Label>Alto</Form.Label>
                    <Form.Control
                      type="text"
                      name="alto"
                      value={form.alto}
                      onChange={handleChange}
                      className="inputModal"
                      maxLength={255}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="ancho">
                    <Form.Label>Ancho</Form.Label>
                    <Form.Control
                      type="text"
                      name="ancho"
                      value={form.ancho}
                      onChange={handleChange}
                      className="inputModal"
                      maxLength={255}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="profundidad">
                    <Form.Label>Profundidad</Form.Label>
                    <Form.Control
                      type="text"
                      name="profundidad"
                      value={form.profundidad}
                      onChange={handleChange}
                      className="inputModal"
                      maxLength={255}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="precio">
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="precio"
                      value={form.precio}
                      onChange={handleChange}
                      className="inputModal"
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="cantidad">
                    <Form.Label>Cantidad *</Form.Label>
                    <Form.Control
                      type="number"
                      name="cantidad"
                      value={form.cantidad}
                      onChange={handleChange}
                      className="inputModal"
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="material">
                    <Form.Label>Material</Form.Label>
                    <Form.Control
                      type="text"
                      name="material"
                      value={form.material}
                      onChange={handleChange}
                      className="inputModal"
                      maxLength={255}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={form.descripcion}
                    className="inputModal"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="imagen" className="mb-3">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="inputModal"
                  />
                  <Form.Text className="text-muted">
                    Dejar vacío para mantener la imagen actual.
                  </Form.Text>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="botonCrema px-3 text-dark"
                  onClick={closeEditModal}
                >
                  Cancelar
                </Button>
                <Button className="botonMarron px-3 text-white" type="submit">
                  Guardar cambios
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* Modal Añadir Imagen */}
          <Modal
            show={showAddImageModal}
            onHide={closeAddImageModal}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Añadir imagen al producto</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddImageSubmit}>
              <Modal.Body>
                <p>
                  <strong>Producto:</strong> {currentProducto?.nombre}
                </p>
                <Form.Group controlId="imagenAddFile" className="mb-3">
                  <Form.Label>Selecciona imagen</Form.Label>
                  <Form.Control
                    type="file"
                    className="inputModal"
                    accept="image/*"
                    onChange={handleAddImageFileChange}
                    required
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button className="botonCrema px-3 text-dark" onClick={closeAddImageModal}>
                  Cancelar
                </Button>
                <Button className="botonMarron px-3 text-white" type="submit">
                  Subir Imagen
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* Modal Eliminar */}
          <Modal
            show={showDeleteModal}
            onHide={closeDeleteModal}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentProducto && (
                <p>
                  ¿Estás seguro que quieres eliminar el producto{" "}
                  <strong>{currentProducto.nombre}</strong>?
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="botonCrema px-3 text-dark"
                onClick={closeDeleteModal}
              >
                Cancelar
              </Button>
              <Button
                className="botonRojo px-3 text-white"
                variant="danger"
                onClick={handleConfirmDelete}
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </section>
      </main>
    </>
  );
};

export default Productos;
