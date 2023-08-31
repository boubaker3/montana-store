import { Avatar, Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteCart, useGetCart, useGetCartLength } from "./CartApi";
import { Link } from "react-router-dom";
export default function CartCard(props) {
  const deleteCart = useDeleteCart();
  const getCartLength = useGetCartLength();
  const getCart = useGetCart();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Card
      sx={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "38px",
        padding: " 10px ",
        marginTop: "20px",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="end"
          alignItems="center"
        >
          <Typography
            sx={{
              fontSize: { xs: "12px", md: "16px" },
              color: "gray",
              textAlign: "end",
            }}
          >
            {new Date(props.cart.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Button
            onClick={() => {
              deleteCart(props.cart._id);
              getCartLength(user._id);
              getCart(user._id);
            }}
          >
            <DeleteIcon />
          </Button>
        </Grid>

        <Grid item xs={12} md={2}>
          <Avatar
            src={props.cart.productImage}
            sx={{
              borderRadius: "32px",
              width: " 100px",
              height: " 100px",
              m: { xs: "0 auto", md: 0 },
            }}
          ></Avatar>
        </Grid>

        <Grid
          item
          xs={12}
          md={10}
          columnGap={1}
          sx={{
            justifyContent: {
              xs: "center",
              lg: "start",
              alignItems: "center",
              mt: 2,
              mb: 2,
              display: "flex",
            },
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" }, color: "gray" }}
          >
            you have added
          </Typography>
          <Typography
            color="primary"
            sx={{ fontSize: { xs: "12px", md: "16px" } }}
          >
            {props.cart.productName.substring(0, 16) + "..."}
          </Typography>

          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" }, color: "gray" }}
          >
            to your cart
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          columnGap={2}
          sx={{ color: "gray" }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: { xs: "12px", md: "18px" } }}>
            {props.cart.sellPrice + "$"}
          </Typography>

          <Button
            LinkComponent={Link}
            to={`/product?pid=${props.cart.pid}`}
            sx={{ fontSize: { xs: "8px", md: "16px" } }}
            color="primary"
          >
            To Details
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
