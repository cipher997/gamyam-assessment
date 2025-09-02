import React from "react";
import ProductCard from "./ProductCard";
import "../App.css";

export default function ProductList({ products, view, onEdit }) {
  if (view === "list") {
    return (
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>{p.description}</td>
              <td>
                <button onClick={() => onEdit(p)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="grid-view">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onEdit={onEdit} />
      ))}
    </div>
  );
}
