import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useAddToCart, useGetCart, useGetCartLength } from "../cart/CartApi";
import { useNavigate } from "react-router-dom";
import "./style.css";
export default function ProductCard(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const wasAdded = useSelector((state) => state.cart.wasAdded);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const addToCart = useAddToCart();
  const getCartLength = useGetCartLength();
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const [price, setPrice] = useState(0);
  const markupPercentage = 70; // Example markup percentage
  const markupFactor = 1 + markupPercentage / 100;
  useEffect(() => {
    const secondePrice = props.product.sellPrice.split("--")[1];
    if (secondePrice) {
      setPrice((secondePrice * markupFactor).toFixed(2)); // Format to 2 decimal places
    } else {
      setPrice((props.product.sellPrice * markupFactor).toFixed(2)); // Format to 2 decimal places
    }
  }, []);
  const addCartItem = async () => {
    try {
      const response = await addToCart({
        productName: props.product.productNameEn,
        productImage: props.product.productImage,
        sellPrice: price,
        pid: props.product.pid,
        userid: user._id,
      });
    } catch (error) {}
    getCartLength(user._id);
    setOpenSnackbar(!openSnackbar);
  };
  return (
    <Card
      className="Card"
      sx={{
        width: { xs: "300px", md: "300px" },
        height: { md: "450px" },
        boxShadow: "rgba(149, 157, 165, 0.5) 0px 8px 24px",
        borderRadius: "38px",
        margin: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Avatar
        src={props.product.productImage}
        sx={{
          borderRadius: "32px",
          width: " 100%",
          height: "200px",
          objectFit: "cover",
        }}
      ></Avatar>
      <CardContent>
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "10px",
          }}
          variant="h6"
        >
          {String(props.product.productNameEn).substring(0, 16) + "..."}
        </Typography>
        <Box>
          <Box display="flex" columnGap={2}>
            <Typography
              sx={{ fontSize: "16px", color: "secondary.main" }}
              gutterBottom
              variant="h6"
              component="div"
            >
              category:
            </Typography>

            <Typography
              sx={{ fontSize: "16px", color: "gray" }}
              gutterBottom
              variant="h6"
              component="div"
            >
              {String(props.product.categoryName).substring(0, 16)}
            </Typography>
          </Box>

          <Box display="flex" columnGap={2}>
            <Typography
              sx={{ fontSize: "16px", color: "secondary.main" }}
              gutterBottom
              variant="h6"
            >
              price:
            </Typography>

            <Typography
              sx={{ fontSize: "16px", color: "gray" }}
              gutterBottom
              variant="h6"
            >
              {price + "$"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            if (user) {
              addCartItem();
            } else {
              navigate("/auth/login");
            }
          }}
          disableElevation
          variant="contained"
          sx={{
            width: "80%",
            color: "white",
            borderRadius: "32px",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            textAlign: "center",
            fontSize: { xs: "12px", md: "14px", lg: "14px" },
          }}
        >
          <ShoppingCartIcon sx={{ color: "white" }} />
          Add to Cart
        </Button>
      </CardActions>
      {wasAdded && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          message={wasAdded}
          onClose={handleCloseSnackbar}
        />
      )}
    </Card>
  );
}
