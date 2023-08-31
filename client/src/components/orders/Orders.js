import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrders } from "./OrderApi";
import OrderCard from "./OrderCard";

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleOrders = async () => {
    setLoading(true);
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
    >
      <Grid item xs={12}>
        <Typography>you are not logged</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>please login to be able to have orders feature</Typography>
      </Grid>
    </Grid>
    
      )}
    </Grid>
  );
}
