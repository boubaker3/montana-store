import {
  CircularProgress,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { getAccessToken, getRefreshToken } from "./components/cjAuth/ApiAuth";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Orders from "./components/orders/Orders";
import Reviews from "./components/reviews/Reviews";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import Cart from "./components/cart/Cart";
import Auth from "./components/auth/Auth";
import Product from "./components/product/Product";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  button: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#E6B300",
    },
    secondary: {
      main: "#ED5757",
    },
  },
});

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (currentPath === "/auth/login" || currentPath === "/auth/signup") {
      if (token) {
        navigate("/");
      }
    }
  }, [currentPath, token, navigate]);

  useEffect(() => {
    console.log(process.env.REACT_APP_PAYPAL_CLIENT_ID);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ overflowX: "hidden" }}>
        <Header />

        <>
          {" "}
          <Routes>
            <Route path="/auth" element={<Auth />}>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>{" "}
            <Route path="/" element={<Main />}>
              <Route path="" element={<Home />} />
              <Route path="orders" element={<Orders />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="cart" element={<Cart />} />
              <Route path="product" element={<Product />} />
            </Route>
          </Routes>
        </>
      </div>
    </ThemeProvider>
  );
}

export default App;
