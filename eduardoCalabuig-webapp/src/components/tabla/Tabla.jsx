import React from "react";
import { Table } from "react-bootstrap";
import TableHeaders from "./TableHeaders";
import TableBody from "./TableBody";

const Tabla = ({ columns, data, onView, onEdit, onDelete, onAddImage }) => {
  // Si hay cualquiera de las tres acciones, mostramos la columna “Acciones”
  const hasActions = Boolean(onView || onEdit || onDelete);

  return (
    <Table
      responsive
      className="align-middle text-center no-borders-table"
      style={{ borderSpacing: "0 12px" }}
    >
      <TableHeaders columns={columns} hasActions={hasActions} />
      <TableBody
        columns={columns}
        data={data}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddImage={onAddImage}
      />
    </Table>
  );
};

export default Tabla;
