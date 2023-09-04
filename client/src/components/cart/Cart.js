import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCart, useGetCartLength } from "./CartApi";
import CartCard from "./CartCard";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const loading = useSelector((state) => state.cart.loading);
  const getCart = useGetCart();

  const [pageNum, setPageNum] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      getCart(user._id, pageNum);
    }
  }, [pageNum]);
  return (
    <Grid container justifyContent="center">
      {user && (
        <>
          {loading && (
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
          {cartItems.length === 0 && !loading ? (
            <Grid item xs={12}>
              <Typography variant="h5" m={4}>
                no cart items found
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={12} md={8} lg={6}>
            {cartItems &&
              cartItems.map((cartItem) => (
                <Grid container key={cartItem._id}>
                  {" "}
                  <CartCard cart={cartItem} />
                </Grid>
              ))}
          </Grid>
          <Grid container justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              disabled={pageNum === 1}
              onClick={() => {
                setPageNum(pageNum - 1);
              }}
            >
              Previous Page
            </Button>
            <Button
              variant="outlined"
              disabled={cartItems.length === 0}
              onClick={() => {
                setPageNum(pageNum + 1);
              }}
            >
              Next Page
            </Button>
          </Grid>
        </>
      )}
      {!user && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          rowGap={2}
          sx={{
            width: { xs: "100%", md: "80%", lg: "50%" },
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "32px",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h5" color="primary">
              Oops! You're not logged in.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              To access the cart feature and unlock exclusive offers, please log
              in or create an account.
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button
              component={Link}
              to="/auth/login"
              variant="contained"
              disableElevation
              color="primary"
              sx={{
                fontSize: { xs: "14px", md: "14px", lg: "16px", xl: "18px" },
                color: "white",
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} mt={1} sx={{ color: "black" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/auth/signup" style={{ color: "black" }}>
                Sign up here.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
