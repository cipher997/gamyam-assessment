import React from "react";
import "../App.css";

export default function ProductCard({ product, onEdit }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p>{product.description}</p>
      <button onClick={() => onEdit(product)}>Edit</button>
    </div>
  );
}
