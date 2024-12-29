// ------------------Imports---------------------
import axios from "axios";
// ----------------------------------------------

// creating new axios instance
export const axiosInstance = axios.create({
  baseURL: `${
    import.meta.env.VITE_APP_ENV === "development"
      ? import.meta.env.VITE_APP_DEV_API_URL
      : import.meta.env.VITE_APP_DEV_API_URL
  }`,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
