import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/Pagination";
import debounce from "./utils/debounce";
import productsData from "./data/products";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState(productsData);
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(productsData);
  const [editingProduct, setEditingProduct] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSearch = debounce((value) => {
    setSearch(value);
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
    setCurrentPage(1);
  }, 500);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? { ...product, id: p.id } : p))
      );
      setEditingProduct(null);
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
  };

  const handleCancelEdit = () => setEditingProduct(null);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="app">
      <h1>📦 Product Management System</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button onClick={() => setView(view === "list" ? "card" : "list")}>
          Toggle View ({view})
        </button>
        <select onChange={(e) => setItemsPerPage(+e.target.value)} value={itemsPerPage}>
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      <ProductForm
        onSave={handleSave}
        editingProduct={editingProduct}
        onCancel={handleCancelEdit}
      />

      <ProductList products={paginated} view={view} onEdit={setEditingProduct} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
