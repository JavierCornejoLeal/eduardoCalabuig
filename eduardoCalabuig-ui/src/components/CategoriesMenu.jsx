import React from "react";

import "../assets/styles/categoriesMenu.css";

const CategoriesMenu = ({ categories = [], selectedCategory, onSelectCategory }) => {

  return (
    <section className="py-5 shadow-inner-section seccionCategorias pt-5 sticky-top">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="menuCategorias pt-5">
              <ul className="pt-5">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      className={selectedCategory === cat ? "active" : ""}
                      onClick={() => onSelectCategory(cat)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: selectedCategory === cat ? "black" : "inherit",
                        textDecoration: selectedCategory === cat ? "underline" : "none",
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesMenu;
