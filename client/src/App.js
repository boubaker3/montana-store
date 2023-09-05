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
const CJ_ACESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTIxNSIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJzdWIiOiJicUxvYnFRMGxtTm55UXB4UFdMWnlrVmkwQUdLWjBaN3dodUdYbmpGcFVXUW9vTlBYU3BubVRaSDArZ08vclZCMFVNTVJEMjNrY1JUeWJsWDlvekorcUlsTi9FRk5WRzNiVWVTb0V3d3ppQ1E0b0NqU0pyVVZiVkZSRDQ4YlFrNnF5TVNQZk0wNmg5Qm5kVjE1dU8zWFdzcEx5OWNvaXpUVkNrbHVyUVhTTlROWDlNR2t6SEovUlQ0V0t3ZlVTcjVMZ0w0eFZ2MHZlbU90U3h6VmhwdU1scXFyTGxJeVRETWRFK3RNaFRhM0FBZGZONkpBNDAwOElxa2xGMVpTeWFBVGp0dE5nUklRMkxHMVkvQ3JZRTRxWkRaZGFBa1BqTHNEdFF5RDJta0JDZXlCWmhSb21Vdy9zQkRCL0ZVZFFnLyJ9.vCY9ImJCw94G4mkLUa-hN1OIJ0mVpgDjk7wtz_fBCpU";
function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentPath === "/auth/login" || currentPath === "/auth/signup") {
      if (token) {
        navigate("/");
      }
    }
  }, [currentPath, token, navigate]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!accessToken) {
      localStorage.setItem("accessToken", CJ_ACESS_TOKEN);
    }
  });

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
