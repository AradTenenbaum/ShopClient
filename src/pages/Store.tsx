import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { getProducts } from "../redux/actions";
import { getProductsApi } from "../api/products";
import { useState } from "react";
import ProductList from "../components/ProductList";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import LoadingCircle from "../components/LoadingCircle";
import { addFavoriteApi } from "../api/user";
import { ERROR, INFO, SUCCESS, WARNING } from "../utils/constants";

const Store = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState(ERROR);
  const [message, setMessage] = useState("Success");
  const [isDisplayedLoading, setIsDisplayedLoading] = useState(false);
  const products = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);

  // Open the snack bar
  const openSnackBar = (status: string, message: string) => {
    setSeverity(status);
    setMessage(message);
    setOpen(true);
  };

  // Close snackbar
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Click on favorite button
  const handleFavorite = async () => {
    if (!user) {
      openSnackBar(INFO, "You have to login to use this feature");
    } else if (searchTerm.length === 0) {
      openSnackBar(ERROR, "Write the category you wish to add to favorites");
    } else {
      const results = await addFavoriteApi(searchTerm, user.token);
      if (results.error) {
        openSnackBar(ERROR, results.error);
      } else {
        openSnackBar(SUCCESS, results.message);
      }
    }
  };

  const dispatch = useDispatch();

  async function searchData() {
    setIsDisplayedLoading(true);
    const productsRes = await getProductsApi(searchTerm);
    if (productsRes.error) openSnackBar(ERROR, productsRes.error);
    else if (productsRes.length === 0) {
      openSnackBar(INFO, "No products for this search");
    } else {
      dispatch(getProducts(productsRes));
    }
    setIsDisplayedLoading(false);
  }

  return (
    <div>
      <div style={styles.formStyle}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await searchData();
            setSearchTerm("");
          }}
        >
          <input
            style={styles.searchBar}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              if (e.target.value.length < 100) setSearchTerm(e.target.value);
              else
                openSnackBar(
                  WARNING,
                  "Cannot search with more than 100 characters"
                );
            }}
          />
          <button style={styles.searchButton} type="submit">
            Search
          </button>
          <button
            style={styles.loadButton}
            onClick={(e) => {
              e.preventDefault();
              handleFavorite();
            }}
          >
            Favorite
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
  );
};

const styles = {
  formStyle: {
    margin: "10px auto",
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
    backgroundColor: "#F6AE2D",
    color: "black",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Store;
