import axios from "axios";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosInstance;
