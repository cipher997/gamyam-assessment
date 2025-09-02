import React from "react";

/**
 * Simple table view for products
 */
export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="product-table">
        <thead>
          <tr>
            <th style={{ width: "28%" }}>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th style={{ width: "25%" }}>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty">No products found.</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td className="name-col">{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>{p.description || "-"}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => onEdit(p)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
