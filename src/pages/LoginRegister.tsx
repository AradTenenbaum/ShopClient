import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Button,
  Container,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { loginApi, registerApi } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/reducers";

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("Success");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const openSnackBar = (status: string, message: string) => {
    setSeverity(status);
    setMessage(message);
    setOpen(true);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      if (isLogin) {
        const results = await loginApi(username, password);
        if (results.error) {
          openSnackBar("error", results.error);
        } else {
          dispatch(login({ username, token: results.token }));
          navigate("/");
        }
      } else {
        const results = await registerApi(username, password);
        if (results.error) {
          openSnackBar("error", results.error);
        } else {
          openSnackBar("success", results.message);
          setIsLogin(true);
        }
      }

      setUsername("");
      setPassword("");
    }
  };

  return (
    <Container>
      <Typography variant="h4">{isLogin ? "Login" : "Register"}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Switch
          onChange={(e) => {
            setIsLogin(e.target.checked);
          }}
          checked={isLogin}
        />
        <Button type="submit" variant="contained" color="primary">
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>
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
    </Container>
  );
};

export default LoginRegister;
