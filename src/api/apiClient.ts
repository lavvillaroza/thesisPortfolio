import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from './apiConfig';
import { isTokenExpired } from '../utils/jwtUtil';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwtToken');
    
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token && isTokenExpired(token)) {
      Cookies.remove('jwtToken');
      localStorage.removeItem('userDetails');
    }
        
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Handle 401 Unauthorized errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response error:", error.response || error.message); // Log error response details
    if (error.response?.status === 401) {
      Cookies.remove('jwtToken');
      localStorage.removeItem('userDetails');
    }
    return Promise.reject(error);
  }
);

export default apiClient;