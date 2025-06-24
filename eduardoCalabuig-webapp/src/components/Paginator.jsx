import React from "react";
import Pagination from "react-bootstrap/Pagination";

import "../assets/styles/paginator.css";

const Paginator = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const maxPagesToShow = 3;
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 2) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - (maxPagesToShow - 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="justify-content-center mt-3" aria-label="Paginación productos">
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />

      {/* Mostrar la página 1 y puntos suspensivos a la izquierda solo si estamos en la penúltima o última página */}
      {(startPage > 1 && (currentPage === totalPages || currentPage === totalPages - 1)) && (
        <>
          <Pagination.Item
            onClick={() => onPageChange(1)}
            active={currentPage === 1}
          >
            1
          </Pagination.Item>
          <Pagination.Ellipsis disabled />
        </>
      )}

      {/* Páginas visibles */}
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      {/* Última página con puntos a la derecha */}
      {endPage < totalPages && (
        <>
          <Pagination.Ellipsis disabled />
          <Pagination.Item
            onClick={() => onPageChange(totalPages)}
            active={currentPage === totalPages}
          >
            {totalPages}
          </Pagination.Item>
        </>
      )}

      <Pagination.Next
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default Paginator;
