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

import "../assets/styles/productos.css";

// Columnas para la tabla de usuarios
const columns = [
  { header: "Nombre", key: "name" },
  { header: "Apellidos", key: "apellidos" },
  { header: "Email", key: "email" },
  { header: "Rol", key: "role_name" },
];

// =======================================================
// 1) Esquema de validación para CREAR usuario
// =======================================================
const usuarioAddSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .max(255, "Máximo 255 caracteres"),
  apellidos: yup
    .string()
    .required("Los apellidos son obligatorios")
    .max(255, "Máximo 255 caracteres"),
  email: yup
    .string()
    .required("El correo es obligatorio")
    .email("Debe ser un correo válido")
    .max(255, "Máximo 255 caracteres"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "Mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .required("La confirmación es obligatoria")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

// =======================================================
// 2) Esquema de validación para EDITAR usuario
//    (password es opcional, pero si se pone debe validarse)
// =======================================================
// =======================================================
// Esquema de validación para EDITAR usuario (forma “funcional” de when)
// =======================================================
const usuarioEditSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .max(255, "Máximo 255 caracteres"),
  apellidos: yup
    .string()
    .required("Los apellidos son obligatorios")
    .max(255, "Máximo 255 caracteres"),
  email: yup
    .string()
    .required("El correo es obligatorio")
    .email("Debe ser un correo válido")
    .max(255, "Máximo 255 caracteres"),

  password: yup
    .string()
    .transform((value, originalValue) => {
      // Si viene como "", convertir a null para que .nullable() funcione
      return originalValue === "" ? null : value;
    })
    .nullable()
    .min(6, "Mínimo 6 caracteres"),

  password_confirmation: yup
    .string()
    .nullable()
    .when("password", (passwordValue, schema) => {
      // Si “password” no está vacío, entonces confirmación es obligatoria
      if (passwordValue) {
        return schema
          .required("La confirmación es obligatoria")
          .oneOf([yup.ref("password")], "Las contraseñas no coinciden");
      }
      // Si password está vacío (o null), permitimos que password_confirmation sea null
      return schema.nullable();
    }),
});


const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // =======================================================
  // Estados para los filtros
  // =======================================================
  const [filtros, setFiltros] = useState({
    name: "",
    apellidos: "",
    email: "",
    role: "Todos",
  });

  // Opciones de rol para el componente Filtros (+ "Todos")
  const roleOptions = ["Todos", ...roles.map((r) => r.name)];

  // Configuración para el componente <Filtros>
  const filtrosConfig = [
    {
      label: "Nombre",
      name: "name",
      type: "text",
      placeholder: "Buscar por nombre",
    },
    {
      label: "Apellidos",
      name: "apellidos",
      type: "text",
      placeholder: "Buscar por apellidos",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "Buscar por email",
    },
    {
      label: "Rol",
      name: "role",
      type: "select",
      options: roleOptions,
    },
  ];

  const handleFiltroChange = (name, value) => {
    setFiltros((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  // Filtrar usuarios según los valores de "filtros"
  const usuariosFiltrados = usuarios.filter((usuario) => {
    if (
      filtros.name &&
      !usuario.name.toLowerCase().includes(filtros.name.toLowerCase())
    ) {
      return false;
    }
    if (
      filtros.apellidos &&
      !usuario.apellidos
        .toLowerCase()
        .includes(filtros.apellidos.toLowerCase())
    ) {
      return false;
    }
    if (
      filtros.email &&
      !usuario.email.toLowerCase().includes(filtros.email.toLowerCase())
    ) {
      return false;
    }
    if (filtros.role !== "Todos" && usuario.role_name !== filtros.role) {
      return false;
    }
    return true;
  });

  // =======================================================
  // Estados para mostrar/ocultar modales
  // =======================================================
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Usuario seleccionado para ver/editar/eliminar
  const [currentUsuario, setCurrentUsuario] = useState(null);

  // =======================================================
  // React Hook Form para "Agregar usuario"
  // =======================================================
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
    reset: resetAddForm,
  } = useForm({
    resolver: yupResolver(usuarioAddSchema),
    defaultValues: {
      name: "",
      apellidos: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: "",
    },
  });

  // =======================================================
  // React Hook Form para "Editar usuario"
  // =======================================================
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEditForm,
  } = useForm({
    resolver: yupResolver(usuarioEditSchema),
    defaultValues: {
      name: "",
      apellidos: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: "",
    },
  });

  // =======================================================
  // Al montar el componente: cargar roles y usuarios
  // =======================================================
  useEffect(() => {
    const fetchRolesYUsuarios = async () => {
      setLoading(true);
      try {
        // 1) Traer roles
        const rolesRes = await api.getData("roles");
        const rolesData = rolesRes.data;
        setRoles(rolesData);

        // 2) Traer usuarios
        const usuariosRes = await api.getData("usuarios");
        const usuariosData = usuariosRes.data;

        // 3) Inyectar role_name en cada usuario
        const usuariosConRoleName = usuariosData.map((u) => {
          const rolEncontrado = rolesData.find((r) => r.id === u.role_id);
          return {
            ...u,
            role_name: rolEncontrado ? rolEncontrado.name : "",
          };
        });
        setUsuarios(usuariosConRoleName);
      } catch (err) {
        console.error("Error cargando roles o usuarios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRolesYUsuarios();
  }, []);

  // Cambiar número de ítems por página
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  // Obtener slice de usuarios para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsuarios = usuariosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // =======================================================
  // FUNCIONES para abrir modales
  // =======================================================
  const handleView = (usuario) => {
    setCurrentUsuario(usuario);
    setShowViewModal(true);
  };

  const handleEdit = (usuario) => {
    setCurrentUsuario(usuario);
    // Prellenar formulario de edición con datos del usuario
    resetEditForm({
      name: usuario.name || "",
      apellidos: usuario.apellidos || "",
      email: usuario.email || "",
      password: "",
      password_confirmation: "",
      role_id: usuario.role_id || "",
    });
    setShowEditModal(true);
  };

  const handleDelete = (usuario) => {
    setCurrentUsuario(usuario);
    setShowDeleteModal(true);
  };

  // =======================================================
  // FUNCIONES para cerrar modales
  // =======================================================
  const closeAddModal = () => {
    setShowAddModal(false);
    resetAddForm();
  };
  const closeViewModal = () => {
    setShowViewModal(false);
    setCurrentUsuario(null);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentUsuario(null);
    resetEditForm();
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentUsuario(null);
  };

  // =======================================================
  // ENVÍO: Crear usuario
  // =======================================================
  const onSubmitAdd = async (data) => {
    try {
      // data = { name, apellidos, email, password, password_confirmation, role_id }
      const newUserRes = await api.createData("usuarios", data);
      const createdUser = newUserRes.data.user; 
      // Laravel está devolviendo { user, carrito }
      // Por lo tanto createdUser = newUserRes.data.user

      // Inyectar role_name en el nuevo usuario
      const rolCreado = roles.find((r) => r.id === createdUser.role_id);
      setUsuarios((prev) => [
        ...prev,
        {
          ...createdUser,
          role_name: rolCreado ? rolCreado.name : "",
        },
      ]);

      closeAddModal();
    } catch (error) {
      console.error("Error creando usuario:", error);
      // Aquí podrías mostrar un toast o un mensaje extra si el backend devolviera errores
    }
  };

  // =======================================================
  // ENVÍO: Editar usuario
  // =======================================================
  const onSubmitEdit = async (data) => {
    try {
      // data puede incluir { name, apellidos, email, password?, password_confirmation?, role_id }
      // Si password viene vacío, el backend no lo cambiará (según tu controlador)
      const updatedRes = await api.updateData(
        "usuarios",
        currentUsuario.id,
        data
      );
      const updatedUser = updatedRes.data;
      const rolEditado = roles.find((r) => r.id === updatedUser.role_id);

      // Actualizar el estado local de usuarios
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === updatedUser.id
            ? {
                ...updatedUser,
                role_name: rolEditado ? rolEditado.name : "",
              }
            : u
        )
      );

      closeEditModal();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      // Igualmente, podrías mostrar errores devueltos por el backend
    }
  };

  // =======================================================
  // ENVÍO: Eliminar usuario
  // =======================================================
const handleConfirmDelete = async () => {
  try {
    await api.deleteData("usuarios", currentUsuario.id);
    setUsuarios((prev) => prev.filter((u) => u.id !== currentUsuario.id));
    closeDeleteModal();
  } catch (error) {
    console.error("Error eliminando usuario:", error);
  }
};


  // Si aún está cargando roles/usuarios, mostramos un “Cargando…”
  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <>
      <NavBar />
      <main className="pt-5">
        <section className="py-5 shadow-inner-section">
          <div className="container-fluid pt-5 px-5">
            {/* ======================================================= */}
            {/* BARRA DE FILTROS */}
            <div className="row border-bottom mx-5 pb-3 mb-5">
              <Filtros
                filtros={filtrosConfig}
                valores={filtros}
                onChange={handleFiltroChange}
              />
            </div>

            {/* ======================================================= */}
            {/* ENCABEZADO (paginador + total + botón de añadir) */}
            <div className="row px-5 mb-3">
              <div className="col-6 d-flex align-items-center">
                <div className="usuariosPaginator d-flex flex-row align-items-center">
                  <p>Usuarios por página:</p>
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
                <div className="totalUsuarios ps-5">
                  <p>
                    Total de usuarios:{" "}
                    <span className="fw-semibold">
                      {usuariosFiltrados.length}
                    </span>
                  </p>
                </div>
              </div>

              <div className="col-6 text-end">
                <Button
                  className="botonMarron text-white px-3"
                  variant="botonMarron"
                  onClick={() => setShowAddModal(true)}
                >
                  <span className="pe-2">+</span> Añadir Usuario
                </Button>
              </div>
            </div>

            {/* ======================================================= */}
            {/* TABLA DE USUARIOS + PAGINACIÓN */}
            <div className="row py-2 px-5">
              <div className="col-12">
                <Tabla
                  columns={columns}
                  data={currentUsuarios}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
                <Paginator
                  totalItems={usuariosFiltrados.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* MODAL: AÑADIR USUARIO */}
          {/* ======================================================= */}
          <Modal show={showAddModal} onHide={closeAddModal} size="md" centered>
            <Modal.Header closeButton>
              <Modal.Title>Añadir usuario</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmitAdd(onSubmitAdd)}>
              <Modal.Body>
                {/* FILA: name + apellidos */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      className="inputModal"
                      {...registerAdd("name")}
                      isInvalid={!!errorsAdd.name}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="apellidos">
                    <Form.Label>Apellidos *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellidos"
                      className="inputModal"
                      {...registerAdd("apellidos")}
                      isInvalid={!!errorsAdd.apellidos}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.apellidos?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* FILA: email + role */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="inputModal"
                      {...registerAdd("email")}
                      isInvalid={!!errorsAdd.email}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="role_id">
                    <Form.Label>Rol *</Form.Label>
                    <Form.Select
                      {...registerAdd("role_id")}
                      isInvalid={!!errorsAdd.role_id}
                      defaultValue=""
                    >
                      <option value="">Selecciona un rol</option>
                      {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                          {rol.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.role_id?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* FILA: password + password_confirmation */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      className="inputModal"
                      {...registerAdd("password")}
                      isInvalid={!!errorsAdd.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="password_confirmation">
                    <Form.Label>Confirmar contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repite la contraseña"
                      className="inputModal"
                      {...registerAdd("password_confirmation")}
                      isInvalid={!!errorsAdd.password_confirmation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsAdd.password_confirmation?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
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

          {/* ======================================================= */}
          {/* MODAL: VISUALIZAR USUARIO */}
          {/* ======================================================= */}
          <Modal
            show={showViewModal}
            onHide={closeViewModal}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Detalles de usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentUsuario && (
                <div>
                  <p>
                    <strong>Nombre:</strong> {currentUsuario.name}
                  </p>
                  <p>
                    <strong>Apellidos:</strong> {currentUsuario.apellidos}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentUsuario.email}
                  </p>
                  <p>
                    <strong>Rol:</strong> {currentUsuario.role_name}
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

          {/* ======================================================= */}
          {/* MODAL: EDITAR USUARIO */}
          {/* ======================================================= */}
          <Modal
            show={showEditModal}
            onHide={closeEditModal}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmitEdit(onSubmitEdit)}>
              <Modal.Body>
                {/* FILA: name + apellidos */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      className="inputModal"
                      {...registerEdit("name")}
                      isInvalid={!!errorsEdit.name}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="apellidos">
                    <Form.Label>Apellidos *</Form.Label>
                    <Form.Control
                      type="text"
                      className="inputModal"
                      {...registerEdit("apellidos")}
                      isInvalid={!!errorsEdit.apellidos}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.apellidos?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* FILA: email + role */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      className="inputModal"
                      {...registerEdit("email")}
                      isInvalid={!!errorsEdit.email}
                      maxLength={255}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="role_id">
                    <Form.Label>Rol *</Form.Label>
                    <Form.Select
                      {...registerEdit("role_id")}
                      isInvalid={!!errorsEdit.role_id}
                      defaultValue={currentUsuario?.role_id || ""}
                    >
                      <option value="">Selecciona un rol</option>
                      {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                          {rol.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.role_id?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* FILA: password + password_confirmation (opcionales) */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nueva contraseña"
                      className="inputModal"
                      {...registerEdit("password")}
                      isInvalid={!!errorsEdit.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="password_confirmation">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repite nueva contraseña"
                      className="inputModal"
                      {...registerEdit("password_confirmation")}
                      isInvalid={!!errorsEdit.password_confirmation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorsEdit.password_confirmation?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
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

          {/* ======================================================= */}
          {/* MODAL: ELIMINAR USUARIO */}
          {/* ======================================================= */}
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
              {currentUsuario && (
                <p>
                  ¿Estás seguro que quieres eliminar al usuario{" "}
                  <strong>
                    {currentUsuario.name} {currentUsuario.apellidos}
                  </strong>
                  ?
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

export default Usuarios;
