import axios, { AxiosError } from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  console.error("Error: VITE_API_BASE_URL is not defined.");
  throw new Error("VITE_API_BASE_URL must be defined");
}

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
