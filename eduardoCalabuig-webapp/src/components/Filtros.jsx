import React from "react";

import "../assets/styles/filtros.css";

const Filtros = ({ filtros, valores, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="filtros-container d-flex flex-wrap gap-3 mb-4">
      {filtros.map((filtro) => {
        if (filtro.type === "select") {
          return (
            <div key={filtro.name} className="filtro-item">
              <label htmlFor={filtro.name} className="form-label">
                {filtro.label}
              </label>
              <select
                id={filtro.name}
                name={filtro.name}
                value={valores[filtro.name] || ""}
                onChange={handleChange}
                className="form-select"
              >
                {filtro.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        } else {
          return (
            <div key={filtro.name} className="filtro-item">
              <label htmlFor={filtro.name} className="form-label">
                {filtro.label}
              </label>
              <input
                id={filtro.name}
                name={filtro.name}
                type={filtro.type}
                placeholder={filtro.placeholder || ""}
                value={valores[filtro.name] || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Filtros;
