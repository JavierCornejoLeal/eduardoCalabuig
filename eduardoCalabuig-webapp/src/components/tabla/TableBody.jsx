import React from "react";
import { Button, Image } from "react-bootstrap";
import { FaRegEdit, FaRegEye, FaPlusCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import "../../assets/styles/tabla/tabla.css";

const TableBody = ({ columns, data, onEdit, onView, onDelete, onAddImage }) => {
  return (
    <tbody>
      {data.map((row, idx) => (
        <tr
          key={row.id || idx}
          style={{
            backgroundColor: idx % 2 === 0 ? "white" : "#EEEEEE" + " !important",
            userSelect: "none",
          }}
          className="no-hover-row"
        >
          {columns.map((col) => (
            <td
              key={col.key}
              className="fw-light"
              style={{
                verticalAlign: "middle",
                paddingTop: "1.2rem",
                paddingBottom: "1.2rem",
                backgroundColor: idx % 2 === 0 ? "white" : "#EEEEEE",
              }}
            >
              {col.type === "image" ? (
                <Image
                  src={`https://api.alu02.daw.iesevalorpego.es/storage/${row.imagen}`}
                  alt={row.nombre}
                  fluid
                  style={{ width: "8em", height: "8em", objectFit: "contain" }}
                />
              ) : (
                row[col.key]
              )}
            </td>
          ))}

          {(onEdit || onView || onDelete || onAddImage) && (
            <td
              style={{
                paddingTop: "1.2rem",
                paddingBottom: "1.2rem",
                backgroundColor: idx % 2 === 0 ? "white" : "#EEEEEE",
              }}
            >
              {onView && (
                <Button
                  variant="link"
                  className="text-dark me-3 p-0"
                  title="Ver"
                  onClick={() => onView(row)}
                >
                  <FaRegEye size={20} />
                </Button>
              )}
              {onEdit && (
                <Button
                  variant="link"
                  className="text-dark me-3 p-0"
                  title="Editar"
                  onClick={() => onEdit(row)}
                >
                  <FaRegEdit size={20} />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="link"
                  className="text-dark me-3 p-0"
                  title="Eliminar"
                  onClick={() => onDelete(row)}
                >
                  <FaTrash size={20} />
                </Button>
              )}
              {onAddImage && (
                <Button
                  variant="link"
                  className="text-dark p-0"
                  title="Añadir imágenes"
                  onClick={() => onAddImage(row)}
                >
                  <FaPlusCircle size={20} />
                </Button>
              )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
