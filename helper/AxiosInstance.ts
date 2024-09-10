import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080", // Replace with your API base URL
  timeout: 30000, // Request timeout in milliseconds
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request configuration here, e.g., add headers
    // config.headers['Authorization'] = 'Bearer YOUR_TOKEN_HERE';
    // Get the access token from localStorage or any other storage
    const loginData = JSON.parse(localStorage.getItem("loginData") as string);

    // Add the access token to the request headers if it exists
    if (loginData) {
      config.headers.Authorization = `Bearer ${loginData.token}`;
      config.headers.cookie = `${loginData.token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response.data;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
