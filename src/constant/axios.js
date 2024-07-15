import axios from "axios";
import API_URL from './Constant';
import Swal from "sweetalert2";
import store from '../app/store'
// import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: API_URL.BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  }
});

// Add a request interceptor to include the token dynamically
api.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Get the current state from the Redux store
    const token = state.auth.token; // Access the token from the auth state
    // const token = useSelector((state) => state.auth.token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: "error"
    });
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Custom error handling logic
    let errorMessage;
    if (error.response) {
      // Server responded with a status other than 2xx
      errorMessage = error.response.data.message || 'An error occurred on the server.';
    } else if (error.request) {
      // Request was made but no response was received
      errorMessage = 'No response received from the server.';
    } else {
      // Something happened in setting up the request
      errorMessage = error.message || 'An error occurred while setting up the request.';
    }
    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error"
    });
    return Promise.reject(new Error(errorMessage));
  }
);

// Define CRUD operations

// Get request
export const getData = async (url, setLoading) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    setLoading(false);
    throw new Error(error.message);
  }
};

// Post request
export const postData = async (url, formData, setLoading) => {
  try {
    const response = await api.post(url, formData);
    return response.data;
  } catch (error) {
    setLoading(false);
    throw new Error(`POST request failed: ${error.message}`);
  }
};

export default api;
