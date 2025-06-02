import React from "react";

import "../../assets/styles/tabla/tabla.css";

const TableHeaders = ({ columns, hasActions }) => {
  return (
    <thead style={{ backgroundColor: "#EEEEEE", border: "none" }}>
      <tr>
        {columns.map((col) => (
          <th className="fw-semibold py-3 tablaHeaders" key={col.key}>{col.header}</th>
        ))}
        {hasActions && <th className="fw-semibold py-3 tablaHeaders">Acciones</th>}
      </tr>
    </thead>
  );
};

export default TableHeaders;
