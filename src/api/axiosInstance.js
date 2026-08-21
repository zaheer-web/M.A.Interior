import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // http://localhost:5000/api
  headers: {
    Accept: "application/json",
  },
  timeout: 100000,
});

console.log("BASE URL 👉", import.meta.env.VITE_BASE_URL);

/* ================= REQUEST INTERCEPTOR ================= */
axiosInstance.interceptors.request.use(
  (config) => {
    const path = window.location.pathname;
    let token = null;

    if (path.startsWith("/st-admin-dashboard")) {
      token = localStorage.getItem("stAdminToken");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
