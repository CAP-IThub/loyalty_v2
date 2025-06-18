import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "./baseUrl";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let onLogout = null;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      onLogout &&
      !error.config.url.includes("/v2/verify-token")
    ) {
      toast.error("Session expired. Please log in again.");
      onLogout();
    }    
    return Promise.reject(error);
  }
);

export const setLogoutCallback = (callback) => {
  onLogout = callback;
};

export default axiosInstance;
