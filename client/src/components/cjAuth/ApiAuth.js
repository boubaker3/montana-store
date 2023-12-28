import axios from "axios";

export const getAccessToken = async () => {
  try {
    const apiResponse = await axios.post(
      "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken",

      {
        email: "xxxx@gmail.com",
        password: "xxxx",
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
