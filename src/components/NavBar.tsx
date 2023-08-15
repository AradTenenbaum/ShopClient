import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { logout } from "../redux/actions";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Display navbar depend on the user authentication status
  return (
    <AppBar position="static" style={{ borderRadius: "4px 4px 0px 0px" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Online Store
        </Typography>
        {user ? (
          <div
            style={{ fontSize: "10px", color: "white", marginRight: "15px" }}
          >
            {user.username}
          </div>
        ) : (
          <div></div>
        )}
        <Button component={RouterLink} to="/" color="inherit">
          Home
        </Button>
        {user ? (
          <Button component={RouterLink} to="/favorites" color="inherit">
            Favorites
          </Button>
        ) : (
          <div></div>
        )}
        {!user ? (
          <Button component={RouterLink} to="/login-register" color="inherit">
            Login/Register
          </Button>
        ) : (
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
