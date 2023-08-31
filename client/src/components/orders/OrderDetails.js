import React, { useEffect, useState } from "react";
import {
  Dialog,
  List,
  ListItem,
  ListItemText,
  Typography,
  DialogTitle,
  Avatar,
  Box,
  Grid,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { getOrder } from "./OrderApi";

export default function OrderDetails({
  orderId,
  productName,
  productImage,
  setOnClose,
}) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getOrder(orderId);
        setDetails(response);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchDetails(); // Fetch details only when showing and not fetched yet
  }, []);

  return (
    <Dialog open={true} onClose={setOnClose}>
      <Grid container sx={{ backgroundColor: "rgb(241, 241, 241,0.6)" }}>
        <DialogTitle>Order Details</DialogTitle>

        <Box display="flex" alignItems="center" p={2}>
          <Avatar
            src={productImage}
            sx={{
              borderRadius: "100%",
              width: " 100px",
              height: " auto",
            }}
          ></Avatar>
          <Typography ml={2}>{productName}</Typography>
        </Box>
        {details && (
          <List>
            <Alert severity="info">
              <AlertTitle>Track Your Order</AlertTitle>
              Please use the tracking number to track your order on the logistic
              service website.
            </Alert>
            <ListItem>
              <ListItemText
                primary="Track Number: "
                secondary={details.trackNumber || "it will be provided soon"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Logistic Service: "
                secondary={details.logisticName}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Shipping Country Code "
                secondary={details.shippingCountryCode}
              />{" "}
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={details.shippingProvince}
                primary="Shipping Province:"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Shipping City: "
                secondary={details.shippingCity}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Shipping Phone: "
                secondary={details.shippingPhone}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Shipping Address: "
                secondary={details.shippingAddress}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Order Weight: "
                secondary={details.orderWeight + "g"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Order Amount: "
                secondary={details.orderAmount + "$"}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Payment Date: "
                secondary={details.createDate || "not provided yet"}
              />
            </ListItem>
          </List>
        )}
        {!details && (
          <Grid container justifyContent="center" m={2}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
}
