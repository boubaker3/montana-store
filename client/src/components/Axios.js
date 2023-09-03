import axios from "axios";
const token = "";
if (localStorage.getItem("token")) {
  token = localStorage.getItem("token");
}
const axiosInstance = axios.create({
  baseURL: "https://montanastore.net/",
});
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosInstance;
