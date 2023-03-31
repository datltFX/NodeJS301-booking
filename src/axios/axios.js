import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://booking-server-zodv.onrender.com",
  // baseURL: "http://localhost:5000",
});

export default axiosClient;
