import { Avatar, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { getOrder } from "./OrderApi";
export default function OrderCard(props) {
  const [showDetails, setShowDetails] = useState(false);

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
            {new Date(props.order.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} alignItems="center">
          <Avatar
            src={props.order.productImage}
            sx={{
              borderRadius: "32px",
              width: { xs: "150px", lg: " 100px" },
              height: " 100px",
              m: { xs: "0 auto", md: 0 },
            }}
          ></Avatar>
        </Grid>
        <Grid
          item
          xs={10}
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
            you have ordered
          </Typography>
          <Typography
            color="primary"
            sx={{ fontSize: { xs: "12px", md: "16px" } }}
          >
            {props.order.productName.substring(0, 24) + "..."}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          columnGap={3}
          sx={{ color: "gray" }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: { xs: "12px", md: "18px" } }}>
            {"quantity: " + props.order.quantity}
          </Typography>
          <Typography sx={{ fontSize: { xs: "12px", md: "18px" } }}>
            {"price: " + props.order.price + "$"}
          </Typography>

          <Button
            onClick={() => {
              setShowDetails(showDetails ? true : !showDetails);
            }}
            sx={{ fontSize: { xs: "8px", md: "16px" } }}
            color="primary"
          >
            see details
          </Button>
        </Grid>
        {showDetails && (
          <Grid xs={12} md={6}>
            <OrderDetails
              orderId={props.order.orderId}
              productName={props.order.productName}
              productImage={props.order.productImage}
              setOnClose={() => setShowDetails(false)}
            />
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
