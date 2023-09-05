import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrders } from "./OrderApi";
import OrderCard from "./OrderCard";
import { Link } from "react-router-dom";

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleOrders = async () => {
    setLoading(true);
    console.log(user);
    if (user) {
      try {
        const response = await getOrders(user._id, pageNum);
        setOrders(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    handleOrders();
  }, [pageNum]);
  return (
    <Grid container justifyContent="center">
      {user && (
        <>
          {" "}
          {orders.length === 0 && !loading ? (
            <Grid item xs={12}>
              <Typography variant="h5" m={4}>
                no orders found
              </Typography>
            </Grid>
          ) : null}{" "}
          <Grid item xs={12} md={8} lg={6}>
            {loading ? (
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : (
              orders && orders.map((order) => <OrderCard order={order} />)
            )}
          </Grid>
          <Grid container justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              disabled={pageNum === 1}
              onClick={() => {
                setPageNum(pageNum - 1);
                handleOrders();
              }}
            >
              Previous Page
            </Button>
            <Button
              variant="outlined"
              disabled={orders.length === 0}
              onClick={() => {
                setPageNum(pageNum + 1);
                handleOrders();
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
            padding: "20px",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h5" color="primary">
              Oops! You're not logged in.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              To access the orders feature and unlock exclusive offers, please
              log in or create an account.
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
                fontSize: { xs: "14px", md: "14px",   },
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
