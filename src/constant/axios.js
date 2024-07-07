import axios from "axios";
import API_URL from './Constant';
import Swal from "sweetalert2";

const token=JSON.parse(localStorage.getItem('token'))|| null;
const api=axios.create({
    baseURL:API_URL.BASE_URL,
    headers:{
        "Content-Type": "multipart/form-data",
        'Authorization':`Bearer ${token}`,
    }
})
// Add a request interceptor (optional, for adding tokens, etc.)
api.interceptors.request.use(
    (config) => {
      // Modify the request config if needed
      // e.g., add authorization token
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
        Swal.fire({
            title: "Error",
            text: error,
            icon: "error"
          });
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor (optional, for handling responses globally)
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
  export const getData = async (url,setLoading) => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
        setLoading(false)
      throw new Error(`GET request failed: ${error.message}`);
    }
  };
  
  // Post request
  export const postData = async (url, formData,setLoading )=> {
    try {
      const response = await api.post(url, formData);
      return response.data;
    } catch (error) {
        setLoading(false)
      throw new Error(`POST request failed: ${error.message}`);
    }
  };
  
  