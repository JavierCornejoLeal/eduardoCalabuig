import React from "react";

import "../assets/styles/categoriesMenu.css";

const CategoriesMenu = () => {
  return (
    <section className="py-5 shadow-inner-section seccionCategorias pt-5 sticky-top">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="menuCategorias pt-5">
              <ul className="pt-5">
                <li>
                  <a href="#muebles">Muebles</a>
                </li>
                <li>
                  <a href="#esculturas" className="active">
                    Esculturas
                  </a>
                </li>
                <li>
                  <a href="#decoracion">Decoración</a>
                </li>
                <li>
                  <a href="#ofertas">Ofertas Especiales</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesMenu;
