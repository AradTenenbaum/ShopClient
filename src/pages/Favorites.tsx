import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getProductsApi } from "../api/products";
import { getProducts } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "../redux/reducers";
import { getFavoritesApi } from "../api/user";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (searchTerm: string) => {
    const productsRes = await getProductsApi(searchTerm);
    dispatch(getProducts(productsRes));
    navigate("/");
  };

  const fetchFavorites = async (token: string) => {
    const results = await getFavoritesApi(token);
    if (!results.error) {
      setFavorites(results);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchFavorites(user.token);
    }
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "auto",
        bgcolor: "background.paper",
      }}
    >
      {favorites.map((value, i) => (
        <div>
          <ListItem
            key={value}
            disableGutters
            secondaryAction={
              <IconButton
                onClick={async () => {
                  await handleSearch(value);
                }}
              >
                <SearchIcon />
              </IconButton>
            }
          >
            <ListItemText primary={value} />
          </ListItem>
          <div style={styles.line}></div>
        </div>
      ))}
    </List>
  );
};

const styles = {
  line: {
    width: "100%",
    height: "1px",
    backgroundColor: "#333",
  },
};

export default Favorites;
