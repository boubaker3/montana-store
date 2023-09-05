import axios from "axios";
import axiosInstance from "../Axios";
export const createOrder = async (
  orderNumber,
  shippingZip,
  shippingCountryCode,
  shippingCountry,
  shippingProvince,
  shippingCity,
  shippingAddress,
  shippingCustomerName,
  shippingPhone,
  remark,
  fromCountryCode,
  logisticName,
  houseNumber,
  vid,
  quantity,
  shippingName
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrder",
      {
        orderNumber,
        shippingZip,
        shippingCountryCode,
        shippingCountry,
        shippingProvince,
        shippingCity,
        shippingAddress,
        shippingCustomerName,
        shippingPhone,
        remark,
        fromCountryCode,
        logisticName,
        houseNumber,
        products: [
          {
            vid,
            quantity,
            shippingName,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "CJ-Access-Token": process.env.ACCESS_TOKEN,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

export const saveOrder = async (
  paymentID,
  payerID,
  paymentSource,
  shippingName,
  productImage,
  quantity,
  price,
  vid,
  orderId,
  userid
) => {
  try {
    const response = await axiosInstance.post("order/addOrder", {
      paymentID,
      payerID,
      paymentSource,
      productName: shippingName,
      productImage,
      quantity,
      price,
      vid,
      orderId,
      userid,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to save order ");
  }
};

export const getOrders = async (userid, page) => {
  try {
    const response = await axiosInstance.get("orders/getOrders", {
      params: {
        userid,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.log("faild fetching orders");
  }
};

export const getOrder = async (orderId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiResponse = await axios.get(
      `https://developers.cjdropshipping.com/api2.0/v1/shopping/order/getOrderDetail?orderId=${orderId}`,
      {
        headers: {
          "CJ-Access-Token": process.env.ACCESS_TOKEN,
        },
      }
    );
    return apiResponse.data.data;
  } catch (error) {
    console.log("Error fetching Order:");
  }
};
