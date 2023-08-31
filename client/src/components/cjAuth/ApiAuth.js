import axios from "axios";

export const getAccessToken = async () => {
  try {
    const apiResponse = await axios.post(
      "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken",

      {
        email: "smoozi.ch@gmail.com",
        password: "cbbd451844454edc93b30fbeda284aa4",
      }
    );
    localStorage.setItem("accessToken", apiResponse.data.data.accessToken);
    localStorage.setItem(
      "accessTokenExpiryDate",
      apiResponse.data.accessTokenExpiryDate
    );
    localStorage.setItem("refreshToken", apiResponse.data.data.refreshToken);
    localStorage.setItem(
      "refreshTokenExpiryDate",
      apiResponse.data.refreshTokenExpiryDate
    );
  } catch (error) {}
};

export const getRefreshToken = async (refreshToken) => {
  try {
    const apiResponse = await axios.post(
      "https://developers.cjdropshipping.com/api2.0/v1/authentication/refreshAccessToken",
      {
        refreshToken: refreshToken,
      }
    );
    localStorage.setItem("accessToken", apiResponse.data.data.accessToken);
    localStorage.setItem(
      "accessTokenExpiryDate",
      apiResponse.data.accessTokenExpiryDate
    );
    localStorage.setItem("refreshToken", apiResponse.data.data.refreshToken);
    localStorage.setItem(
      "refreshTokenExpiryDate",
      apiResponse.data.refreshTokenExpiryDate
    );
  } catch (error) {}
};
