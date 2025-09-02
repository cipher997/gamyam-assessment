import React, { useState, useEffect } from "react";
import "../App.css";

export default function ProductForm({ onSave, editingProduct, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);

  const validate = () => {
    let errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.price || formData.price <= 0) errs.price = "Enter valid price";
    if (!formData.category.trim()) errs.category = "Category is required";
    if (!formData.stock || formData.stock < 0) errs.stock = "Enter valid stock";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(formData);
    setFormData({ name: "", price: "", category: "", stock: "", description: "" });
    setErrors({});
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
      />
      {errors.price && <span className="error">{errors.price}</span>}

      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      {errors.category && <span className="error">{errors.category}</span>}

      <input
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: +e.target.value })}
      />
      {errors.stock && <span className="error">{errors.stock}</span>}

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <div className="form-buttons">
        <button type="submit">{editingProduct ? "Update" : "Add"}</button>
        {editingProduct && <button onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
