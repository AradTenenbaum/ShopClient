import "./App.css";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <div style={styles.bg}>
        <div style={styles.app}>
          <NavBar />
          <div style={styles.content}>
            <Routes>
              <Route path="/login-register" Component={LoginRegister}></Route>
              <Route path="/" Component={Store}></Route>
              <Route path="/favorites" Component={Favorites} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  bg: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#9984D4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  app: {
    fontFamily: "Arial, sans-serif",
    width: "80vw",
    height: "90vh",
    margin: "auto auto",
    // padding: "16px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
  },
  content: {
    padding: "16px",
  },
};

export default App;
