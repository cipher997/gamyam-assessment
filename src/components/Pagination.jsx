import React from "react";
import "../App.css";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages).keys()].map((num) => (
        <button
          key={num + 1}
          className={currentPage === num + 1 ? "active" : ""}
          onClick={() => onPageChange(num + 1)}
        >
          {num + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
