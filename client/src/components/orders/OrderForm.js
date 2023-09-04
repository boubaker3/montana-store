import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  TextField,
  Grid,
  Select,
  MenuItem,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import countryList from "react-select-country-list";
import { getLogisticOptions } from "../product/ProductApi";
import { createOrder, saveOrder } from "./OrderApi";
import { Box } from "@mui/system";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function generateOrderNumber() {
  const timestamp = Date.now(); // Current timestamp
  const randomNum = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
  const orderNumber = `${timestamp}-${randomNum}`; // Combine timestamp and random number
  return orderNumber;
}

export default function OrderForm({
  vid,
  shippingName,
  productImage,
  fromCountryCode,
  quantity,
  price,
  setOnClose,
}) {
  const [orderData, setOrderData] = useState({
    orderNumber: generateOrderNumber(),
    shippingZip: "",
    shippingCountryCode: "US",
    shippingCountry: "",
    shippingProvince: "",
    shippingCity: "",
    shippingAddress: "",
    shippingCustomerName: "",
    shippingPhone: "",
    remark: "",
    logisticName: "",
    fromCountryCode,
    houseNumber: "",
    products: [
      {
        vid: vid,
        quantity: quantity,
        shippingName: shippingName,
      },
    ],
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPaymentComplete, setPaymentComplete] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);

  const paypalOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
  };

  const isAnyFieldInvalid = Object.entries(orderData).some(([key, value]) => {
    if (value === "" || value.length > 200) {
      return true; // Invalid field found
    }
    return false; // Valid field
  });

  const options = useMemo(() => countryList().getData(), []);
  const [logisticOptions, setLogisticOptions] = useState([]);
  const [logisticOption, setLogisticOption] = useState({});

  const changeCountry = (event) => {
    setOrderData({ ...orderData, shippingCountryCode: event.target.value });
  };
  const changeLogisticName = (event) => {
    setOrderData({ ...orderData, logisticName: event.target.value });
    setLogisticOption(
      logisticOptions.find((lo) => lo.logisticName === event.target.value)
    );
  };

  useEffect(() => {
    setTotalPrice(
      (parseFloat(logisticOption.logisticPrice) + parseFloat(price)).toFixed(2)
    );
  }, [logisticOption]);

  useEffect(() => {
    handleLogisticOptions();
  }, [orderData.shippingCountryCode]);

  const handleLogisticOptions = async () => {
    try {
      const response = await getLogisticOptions(
        orderData.fromCountryCode,
        orderData.shippingCountryCode,
        orderData.products[0].quantity,
        vid
      );
      setLogisticOptions(response);
      setOrderData({ ...orderData, logisticName: response[0].logisticName });
      setLogisticOption(response[0]);
    } catch (error) {}
  };

  const validateForm = () => {
    setLoading(true);
    if (isAnyFieldInvalid) {
      setLoading(false);
      setError("check if all fields are filled and not surpassing 200 chars!");
    } else {
      setLoading(false);
      setIndex(2);
    }
  };
  const submitOrder = async (paymentID, payerID, paymentSource) => {
    setLoading(true);
    try {
      const orderId = await createOrder(
        orderData.orderNumber,
        orderData.shippingZip,
        orderData.shippingCountryCode,
        orderData.shippingCountry,
        orderData.shippingProvince,
        orderData.shippingCity,
        orderData.shippingAddress,
        orderData.shippingCustomerName,
        orderData.shippingPhone,
        orderData.remark,
        fromCountryCode,
        orderData.logisticName,
        orderData.houseNumber,
        vid,
        quantity,
        shippingName
      );

      await saveOrder(
        paymentID,
        payerID,
        paymentSource,
        shippingName,
        productImage,
        quantity,
        totalPrice,
        vid,
        orderId,
        user._id
      );
      setLoading(false);
      setOrderSaved(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const onSuccess = (paymentResult) => {
    submitOrder(
      paymentResult.paymentID,
      paymentResult.payerID,
      paymentResult.paymentSource
    );
     setPaymentComplete(true);
    console.log("Payment successful!");
  };

  const onError = (error) => {
    console.error("Payment error");
  };

  const [index, setIndex] = useState(1);
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onClose={setOnClose}>
      <Grid container sx={{ backgroundColor: "rgb(241, 241, 241,0.6)" }}>
        <Grid
          container
          display="flex"
          alignItems="center"
          justifyContent="center"
          columnGap={2}
          m={1}
        >
          <Divider
            sx={{
              height: "1px",
              width: { xs: "25px", md: "50px" },
            }}
          />{" "}
          <Typography sx={{ color: index === 1 ? "primary.main" : "black" }}>
            filling order
          </Typography>
          <Divider
            sx={{
              height: "1px",
              width: { xs: "50px", md: "100px" },
            }}
          />
          <Typography sx={{ color: index === 2 ? "primary.main" : "black" }}>
            payment
          </Typography>
          <Divider sx={{ height: "1px", width: "50px" }} />{" "}
        </Grid>

        {index === 1 && (
          <>
            <Box display="flex" alignItems="center" p={2}>
              <Avatar
                src={productImage}
                sx={{
                  borderRadius: "100%",
                  width: " 100px",
                  height: " auto",
                }}
              ></Avatar>
              <Typography ml={2}>{shippingName}</Typography>
              <Typography ml={2} color="secondary">
                {!isNaN(totalPrice)
                  ? "total price: " + totalPrice + "$"
                  : "total price: ..."}
              </Typography>{" "}
            </Box>
            <Grid container>
              <Grid item xs={12} p={2}>
                <TextField
                  label="shipping Zip"
                  fullWidth
                  value={orderData.shippingZip}
                  onChange={(e) =>
                    setOrderData({ ...orderData, shippingZip: e.target.value })
                  }
                />
                <Grid
                  item
                  xs={12}
                  display="flex"
                  alignItems="center"
                  columnGap={4}
                  mt={1}
                >
                  <Typography>country:</Typography>
                  <Select
                    value={orderData.shippingCountryCode}
                    onChange={changeCountry}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <TextField
                  sx={{ mt: 1 }}
                  label="country"
                  fullWidth
                  value={orderData.shippingCountry}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      shippingCountry: e.target.value,
                    })
                  }
                />
                <Grid
                  item
                  xs={12}
                  display="flex"
                  alignItems="center"
                  columnGap={4}
                  mt={1}
                >
                  <Typography>shipping services:</Typography>
                  <Select
                    value={orderData.logisticName}
                    onChange={changeLogisticName}
                  >
                    {logisticOptions &&
                      logisticOptions.map((logisticOption) => (
                        <MenuItem
                          key={logisticOption.logisticName}
                          value={logisticOption.logisticName}
                          display="block"
                        >
                          {
                            <Box>
                              <Typography>
                                {logisticOption.logisticName}
                              </Typography>
                              <Typography color="gray">
                                {"price: " +
                                  logisticOption.logisticPrice +
                                  "$" +
                                  " / " +
                                  "time: " +
                                  logisticOption.logisticAging +
                                  "days"}
                              </Typography>
                            </Box>
                          }
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
                <TextField
                  sx={{ mt: 1 }}
                  label="province"
                  fullWidth
                  value={orderData.shippingProvince}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      shippingProvince: e.target.value,
                    })
                  }
                />
                <TextField
                  sx={{ mt: 1 }}
                  label="city"
                  fullWidth
                  value={orderData.shippingCity}
                  onChange={(e) =>
                    setOrderData({ ...orderData, shippingCity: e.target.value })
                  }
                />
                <TextField
                  sx={{ mt: 1 }}
                  label="shipping Address"
                  fullWidth
                  value={orderData.shippingAddress}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      shippingAddress: e.target.value,
                    })
                  }
                />

                <TextField
                  sx={{ mt: 1 }}
                  label="house Number"
                  fullWidth
                  value={orderData.houseNumber}
                  onChange={(e) =>
                    setOrderData({ ...orderData, houseNumber: e.target.value })
                  }
                />
                <TextField
                  sx={{ mt: 1 }}
                  label="customer Name"
                  fullWidth
                  value={orderData.shippingCustomerName}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      shippingCustomerName: e.target.value,
                    })
                  }
                />

                <TextField
                  sx={{ mt: 1 }}
                  label="phone"
                  fullWidth
                  value={orderData.shippingPhone}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      shippingPhone: e.target.value,
                    })
                  }
                />
                <TextField
                  sx={{ mt: 1 }}
                  label="remark"
                  fullWidth
                  value={orderData.remark}
                  onChange={(e) =>
                    setOrderData({ ...orderData, remark: e.target.value })
                  }
                />

                <Grid
                  item
                  xs={12}
                  mt={2}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Button
                    onClick={validateForm}
                    disableElevation
                    variant="contained"
                    sx={{
                      paddingLeft: "60px",
                      paddingRight: "60px",
                      color: "white",
                      borderRadius: "38px",
                      fontSize: { xs: "12px", md: "14px", lg: "14px" },
                      "&:hover": {
                        backgroundColor: "secondary.main", // Change to your desired hover color
                      },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    continue
                  </Button>
                </Grid>
                <Typography ml={2} color="secondary" textAlign="center">
                  {error}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
        {index === 2 &&
          (isPaymentComplete ? (
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12} display="flex" alignItems="center" m={6}>
                <TaskAltIcon color="primary" sx={{ fontSize: "96px" }} />
                {!orderSaved ? (
                  <Typography>please wait...</Typography>
                ) : (
                  <>
                    {" "}
                    <Typography>payment is successfull</Typography>
                    <Button onClick={() => setOpen(false)}>done</Button>{" "}
                  </>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              p={2}
              rowGap={2}
            >
              <Avatar
                src={productImage}
                sx={{
                  borderRadius: "100%",
                  width: " 100px",
                  height: "100px",
                }}
              ></Avatar>
              <Typography ml={2}>{shippingName}</Typography>
              <Typography variant="h6" ml={2} color="secondary">
                {"total price: " + totalPrice + "$"}
              </Typography>
              <Grid item xs={12}>
                <PayPalScriptProvider options={paypalOptions}>
                  <div>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalPrice,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={onSuccess}
                      onError={onError}
                    />
                  </div>
                </PayPalScriptProvider>
              </Grid>
            </Grid>
          ))}
        {loading && (
          <Grid container justifyContent="center" m={2}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
}
