import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Tabla from "../components/tabla/Tabla";
import Paginator from "../components/Paginator";
import Filtros from "../components/Filtros";
import Spinner from "../components/Spinner";

import api from "../utils/api";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "../assets/styles/productos.css";

const columns = [
  { header: "Imagen", key: "imagen", type: "image" },
  { header: "Nombre", key: "nombre" },
  { header: "Categoría", key: "categoria" },
  { header: "Cantidad", key: "cantidad" },
  { header: "Precio", key: "precio" },
];

// Esquema Yup para validación
const productoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .max(255, "Máximo 255 caracteres"),
  categoria: yup
    .string()
    .required("La categoría es obligatoria")
    .max(255, "Máximo 255 caracteres"),
  alto: yup
    .number()
    .typeError("El alto debe ser un número")
    .positive("El alto debe ser positivo")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  ancho: yup
    .number()
    .typeError("El ancho debe ser un número")
    .positive("El ancho debe ser positivo")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  profundidad: yup
    .number()
    .typeError("La profundidad debe ser un número")
    .positive("La profundidad debe ser positiva")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),

  precio: yup
    .number()
    .typeError("El precio debe ser un número")
    .required("El precio es obligatorio")
    .positive("El precio debe ser positivo"),
  cantidad: yup
    .number()
    .typeError("La cantidad debe ser un número")
    .required("La cantidad es obligatoria")
    .integer("La cantidad debe ser un número entero")
    .min(0, "La cantidad no puede ser negativa"),
  material: yup.string().max(255, "Máximo 255 caracteres").nullable(),
  descripcion: yup.string().nullable(),
});

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

// FILTROS

const [filtros, setFiltros] = useState({
  nombre: "",
  categoria: "Todas",
  alto: "",
  ancho: "",
  profundidad: "",
});

const categoriasUnicas = [
  "Todas",
  ...Array.from(new Set(productos.map((p) => p.categoria).filter(Boolean))),
];

// Configuración para el componente Filtros, añadiendo inputs numéricos para alto, ancho y profundidad
const filtrosConfig = [
  {
    label: "Nombre",
    name: "nombre",
    type: "text",
    placeholder: "Buscar por nombre",
  },
  {
    label: "Categoría",
    name: "categoria",
    type: "select",
    options: categoriasUnicas,
  },
  {
    label: "Alto mínimo (cm)",
    name: "alto",
    type: "number",
    placeholder: "Min. alto",
  },
  {
    label: "Ancho mínimo (cm)",
    name: "ancho",
    type: "number",
    placeholder: "Min. ancho",
  },
  {
    label: "Profundidad mínima (cm)",
    name: "profundidad",
    type: "number",
    placeholder: "Min. profundidad",
  },
];

// Función para manejar cambios en filtros
const handleFiltroChange = (name, value) => {
  setFiltros((prev) => ({ ...prev, [name]: value }));
  setCurrentPage(1);
};

// Aplicar filtros a productos
const productosFiltrados = productos.filter((producto) => {
  // filtro por nombre
  if (
    filtros.nombre &&
    !producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
  ) {
    return false;
  }
  // filtro por categoría
  if (filtros.categoria !== "Todas" && producto.categoria !== filtros.categoria) {
    return false;
  }
  // filtro por alto mínimo
  if (filtros.alto !== "" && Number(filtros.alto) > 0) {
    if (!producto.alto || Number(producto.alto) < Number(filtros.alto)) {
      return false;
    }
  }
  // filtro por ancho mínimo
  if (filtros.ancho !== "" && Number(filtros.ancho) > 0) {
    if (!producto.ancho || Number(producto.ancho) < Number(filtros.ancho)) {
      return false;
    }
  }
  // filtro por profundidad mínima
  if (filtros.profundidad !== "" && Number(filtros.profundidad) > 0) {
    if (!producto.profundidad || Number(producto.profundidad) < Number(filtros.profundidad)) {
      return false;
    }
  }
  return true;
});

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);

  // Producto actual para ver, editar o eliminar
  const [currentProducto, setCurrentProducto] = useState(null);

  // Imagen file para crear/editar
  const [imagenFile, setImagenFile] = useState(null);

  // Imagen para añadir en modal de añadir imagen
  const [imagenAddFile, setImagenAddFile] = useState(null);

  // React Hook Form para añadir producto
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
    reset: resetAddForm,
  } = useForm({
    resolver: yupResolver(productoSchema),
    defaultValues: {
      nombre: "",
      categoria: "",
      alto: "",
      ancho: "",
      profundidad: "",
      precio: "",
      cantidad: "",
      material: "",
      descripcion: "",
    },
  });

  // React Hook Form para editar producto
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEditForm,
  } = useForm({
    resolver: yupResolver(productoSchema),
    defaultValues: {
      nombre: "",
      categoria: "",
      alto: "",
      ancho: "",
      profundidad: "",
      precio: "",
      cantidad: "",
      material: "",
      descripcion: "",
    },
  });

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
  const currentProducts = productosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Abrir modal ver producto
  const handleView = (producto) => {
    setCurrentProducto(producto);
    setShowViewModal(true);
  };

  // Abrir modal añadir imagen
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
      console.error("Debes seleccionar una imagen para subir.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("producto_id", currentProducto.id);
      formData.append("imagen", imagenAddFile);

      await api.createData("imagenes", formData);

      closeAddImageModal();
      loadProductos();
    } catch (error) {
      console.error("Error añadiendo imagen:", error);
    }
  };

  // Abrir modal editar producto y rellenar formulario
  const handleEdit = (producto) => {
    setCurrentProducto(producto);
    resetEditForm({
      nombre: producto.nombre || "",
      categoria: producto.categoria || "",
      alto: producto.alto || "",
      ancho: producto.ancho || "",
      profundidad: producto.profundidad || "",
      precio: producto.precio || "",
      cantidad: producto.cantidad || "",
      material: producto.material || "",
      descripcion: producto.descripcion || "",
    });
    setImagenFile(null);
    setShowEditModal(true);
  };

  // Abrir modal eliminar producto
  const handleDelete = (producto) => {
    setCurrentProducto(producto);
    setShowDeleteModal(true);
  };

  // Cerrar modales
  const closeAddModal = () => {
    setShowAddModal(false);
    resetAddForm();
    setImagenFile(null);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setCurrentProducto(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentProducto(null);
    resetEditForm();
    setImagenFile(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentProducto(null);
  };

  // Manejo archivos imagen
  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  // Añadir producto con validación
  const onSubmitAdd = async (data) => {
    if (!imagenFile) {
      console.error("Debes seleccionar una imagen.");
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));
      formData.append("imagen", imagenFile);
      await api.createData("productos", formData);
      closeAddModal();
      loadProductos();
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  // Editar producto con validación
  const onSubmitEdit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));
      if (imagenFile) formData.append("imagen", imagenFile);
      formData.append("_method", "PUT");
      await api.updateData("productos", currentProducto.id, formData);
      closeEditModal();
      loadProductos();
    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  };

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    try {
      await api.deleteData("productos", currentProducto.id);
      closeDeleteModal();
      loadProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <NavBar />
      <main className="pt-5">
        <section className="py-5 shadow-inner-section">
          <div className="container-fluid pt-5 px-5">
            <div className="row border-bottom mx-5 pb-3 mb-5">
              <Filtros
                filtros={filtrosConfig}
                valores={filtros}
                onChange={handleFiltroChange}
              />
            </div>
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
                    <span className="fw-semibold">{productosFiltrados.length}</span>
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
                  totalItems={productosFiltrados.length}
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
            <Form onSubmit={handleSubmitAdd(onSubmitAdd)}>
              <Modal.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="nombre">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      className="inputModal"
                      {...registerAdd("nombre")}
                      isInvalid={!!errorsAdd.nombre}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.nombre?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="categoria">
                    <Form.Label>Categoría *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Categoría"
                      className="inputModal"
                      {...registerAdd("categoria")}
                      isInvalid={!!errorsAdd.categoria}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.categoria?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="alto">
                    <Form.Label>Alto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Alto"
                      className="inputModal"
                      {...registerAdd("alto")}
                      isInvalid={!!errorsAdd.alto}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.alto?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="ancho">
                    <Form.Label>Ancho</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ancho"
                      className="inputModal"
                      {...registerAdd("ancho")}
                      isInvalid={!!errorsAdd.ancho}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.ancho?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="profundidad">
                    <Form.Label>Profundidad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Profundidad"
                      className="inputModal"
                      {...registerAdd("profundidad")}
                      isInvalid={!!errorsAdd.profundidad}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.profundidad?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="precio">
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="Precio"
                      className="inputModal"
                      {...registerAdd("precio")}
                      isInvalid={!!errorsAdd.precio}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.precio?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="cantidad">
                    <Form.Label>Cantidad *</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Cantidad"
                      className="inputModal"
                      {...registerAdd("cantidad")}
                      isInvalid={!!errorsAdd.cantidad}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.cantidad?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="material">
                    <Form.Label>Material</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Material"
                      className="inputModal"
                      {...registerAdd("material")}
                      isInvalid={!!errorsAdd.material}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.material?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group controlId="descripcion" className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Descripción"
                    className="inputModal"
                    {...registerAdd("descripcion")}
                    isInvalid={!!errorsAdd.descripcion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorsAdd.descripcion?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="imagen" className="mb-3">
                  <Form.Label>Imagen *</Form.Label>
                  <Form.Control
                    type="file"
                    className="inputModal"
                    accept="image/*"
                    onChange={(e) => setImagenFile(e.target.files[0])}
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
            <Form onSubmit={handleSubmitEdit(onSubmitEdit)}>
              <Modal.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="nombre">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      className="inputModal"
                      {...registerEdit("nombre")}
                      isInvalid={!!errorsEdit.nombre}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.nombre?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="categoria">
                    <Form.Label>Categoría *</Form.Label>
                    <Form.Control
                      type="text"
                      className="inputModal"
                      {...registerEdit("categoria")}
                      isInvalid={!!errorsEdit.categoria}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.categoria?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="alto">
                    <Form.Label>Alto</Form.Label>
                    <Form.Control
                      type="text"
                      className="inputModal"
                      {...registerEdit("alto")}
                      isInvalid={!!errorsEdit.alto}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.alto?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="ancho">
                    <Form.Label>Ancho</Form.Label>
                    <Form.Control
                      type="text"
                      className="inputModal"
                      {...registerEdit("ancho")}
                      isInvalid={!!errorsEdit.ancho}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.ancho?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="profundidad">
                    <Form.Label>Profundidad</Form.Label>
                    <Form.Control
                      type="text"
                      className="inputModal"
                      {...registerEdit("profundidad")}
                      isInvalid={!!errorsEdit.profundidad}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.profundidad?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="precio">
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control
                      type="number"
                      className="inputModal"
                      step="0.01"
                      {...registerEdit("precio")}
                      isInvalid={!!errorsEdit.precio}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.precio?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="cantidad">
                    <Form.Label>Cantidad *</Form.Label>
                    <Form.Control
                      type="number"
                      className="inputModal"
                      {...registerEdit("cantidad")}
                      isInvalid={!!errorsEdit.cantidad}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.cantidad?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="material">
                    <Form.Label>Material</Form.Label>
                    <Form.Control
                      type="text"
                      className="inputModal"
                      {...registerEdit("material")}
                      isInvalid={!!errorsEdit.material}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.material?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group controlId="descripcion" className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="inputModal"
                    rows={5}
                    {...registerEdit("descripcion")}
                    isInvalid={!!errorsEdit.descripcion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorsEdit.descripcion?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="imagen" className="mb-3">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    className="inputModal"
                    accept="image/*"
                    onChange={(e) => setImagenFile(e.target.files[0])}
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
                <Button
                  className="botonCrema px-3 text-dark"
                  onClick={closeAddImageModal}
                >
                  Cancelar
                </Button>
                <Button className="botonMarron px-3 text-white" type="submit">
                  Subir Imagen
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </section>
      </main>
    </>
  );
};

export default Productos;
