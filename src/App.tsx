import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductList from "./components/ProductList";
import { ProductInterface } from "./interfaces/product.interface";
import axios from "axios";

function App() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  function fetchData() {
    if (searchTerm.length > 0) {
      axios
        .get(`http://localhost:5000/product/all/?q=${searchTerm}`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }

  function loadNewData() {
    if (searchTerm.length > 0) {
      axios
        .get(`http://localhost:5000/product/load/?q=${searchTerm}`)
        .then((response) => {})
        .catch((error) => {});
    }
  }

  return (
    <div style={styles.app}>
      <h1>Welcome to my shop</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
          setSearchTerm("");
        }}
      >
        <input
          style={styles.searchBar}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={styles.searchButton} type="submit">
          Search
        </button>
      </form>
      <button
        style={styles.loadButton}
        onClick={() => {
          loadNewData();
        }}
      >
        Load new data
      </button>
      <ProductList products={products} />
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  searchBar: {
    padding: "8px",
    marginBottom: "16px",
    width: "80%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  searchButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
  loadButton: {
    padding: "8px",
    border: "none",
    margin: "0 5px",
    borderRadius: "4px",
    backgroundColor: "#D2D5DD",
    color: "black",
    cursor: "pointer",
    fontSize: "16px",
  },
  heading: {
    textAlign: "center",
  },
};

export default App;
