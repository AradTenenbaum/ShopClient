import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductList from "./components/ProductList";
import { ProductInterface } from "./interfaces/product.interface";
import axios from "axios";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import LoadingCircle from "./components/LoadingCircle";

function App() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("Success");
  const [isDisplayedLoading, setIsDisplayedLoading] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function fetchData() {
    if (searchTerm.length > 0) {
      setIsDisplayedLoading(true);
      axios
        .get(`http://localhost:5000/product/all/?q=${searchTerm}`)
        .then((response) => {
          setProducts(response.data.products);
          setIsDisplayedLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsDisplayedLoading(false);
        });
    }
  }

  function loadNewData() {
    if (searchTerm.length > 0) {
      axios
        .get(`http://localhost:5000/product/load/?q=${searchTerm}`)
        .then((response) => {
          setMessage(response.data);
          setSeverity("success");
          setOpen(true);
        })
        .catch((error) => {
          setMessage(error.data);
          setSeverity("error");
          setOpen(true);
        });
    }
  }

  return (
    <div style={styles.bg}>
      <div style={styles.app}>
        <h1 style={{ textAlign: "center" }}>Welcome to my shop</h1>
        <div style={styles.formStyle}>
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
            <button
              style={styles.loadButton}
              onClick={() => {
                loadNewData();
              }}
            >
              Update product
            </button>
          </form>
        </div>
        <ProductList products={products} />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity as AlertColor}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <LoadingCircle isDisplayed={isDisplayedLoading} />
      </div>
    </div>
  );
}

const styles = {
  bg: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  app: {
    fontFamily: "Arial, sans-serif",
    width: "80vw",
    // height: "90vh",
    margin: "auto auto",
    padding: "16px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  searchBar: {
    padding: "8px",
    marginBottom: "16px",
    width: "80%",
    border: "0.2px solid #ccc",
    outline: "none",
    borderRadius: "4px 0px 0px 4px",
    fontSize: "16px",
  },
  searchButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "0px 4px 4px 0px",
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
  formStyle: {
    margin: "10px auto",
  },
};

export default App;
