import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_LOCAL_API_URL;

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// GET genérico (listar o buscar por id si pones id)
export const getData = (endpoint, id = "") => {
  const url = id ? `${endpoint}/${id}` : endpoint;
  return api.get(url);
};

// POST genérico (crear recurso)
export const createData = (endpoint, data) => {
  const isFormData = data instanceof FormData;
  return api.post(endpoint, data, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  });
};

// PUT genérico (actualizar recurso por id) — cambia a POST con _method=PUT para multipart
export const updateData = (endpoint, id, data) => {
  const isFormData = data instanceof FormData;

  if (isFormData) {
    // Añadir _method=PUT para Laravel
    if (!data.has("_method")) {
      data.append("_method", "PUT");
    }
    return api.post(`${endpoint}/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // Para JSON normal sí usar PUT
  return api.put(`${endpoint}/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

// DELETE genérico (eliminar recurso por id)
export const deleteData = (endpoint, id) => {
  return api.delete(`${endpoint}/${id}`);
};

// POST específico para subir imagen (formData) a endpoint imágenes
export const uploadImage = (formData) => {
  return api.post("imagenes", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default {
  getData,
  createData,
  updateData,
  deleteData,
  uploadImage,
};
