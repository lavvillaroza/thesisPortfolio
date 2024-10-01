import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://localhost:5050/api', // Set your API base URL
});

// Attach the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 Unauthorized errors
apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or unauthorized, redirect to login
        Cookies.remove('jwtToken'); // Optionally, remove the token
        localStorage.removeItem('userDetails'); // Clean up user details
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

export default apiClient;