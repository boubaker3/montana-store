import axios from "axios";
export const getProduct = async (pid) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiResponse = await axios.get(
      `https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`,
      {
        headers: {
          "CJ-Access-Token": process.env.ACCESS_TOKEN,
        },
      }
    );
    return apiResponse.data;
  } catch (error) {
    console.log("Error fetching access token:");
  }
};

export const getProductComments = async (pid, pageNum) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiResponse = await axios.get(
      `https://developers.cjdropshipping.com/api2.0/v1/product/comments?pid=${pid}&pageNum=${pageNum} `,
      {
        headers: {
          "CJ-Access-Token": process.env.ACCESS_TOKEN,
        },
      }
    );

    return apiResponse.data;
  } catch (error) {
    console.log("Error fetching product comments:");
  }
};

export const getInventory = async (vid) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiResponse = await axios.get(
      `https://developers.cjdropshipping.com/api2.0/v1/product/stock/queryByVid?vid=${vid}`,
      {
        headers: {
          "CJ-Access-Token": process.env.ACCESS_TOKEN,
        },
      }
    );

    return apiResponse.data;
  } catch (error) {
    console.log("Error fetching product comments:");
  }
};

export const getLogisticOptions = async (
  startCountryCode,
  endCountryCode,
  quantity,
  vid
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "https://developers.cjdropshipping.com/api2.0/v1/logistic/freightCalculate",
      {
        startCountryCode,
        endCountryCode,
        products: [
          {
            quantity,
            vid,
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
    console.error("Error fetching logistic options:", error);
  }
};
