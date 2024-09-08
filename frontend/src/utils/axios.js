// src/utils/axios.js

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
          const newAccessToken = response.data.access;
          
          localStorage.setItem('access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          return axios(originalRequest); // Recall the API with the new token
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login'; // Redirect to login page
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Redirect to login page
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

const login = async (username, password) => {
  const response = await axiosInstance.post('token/', { username, password });
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
};

const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (refresh_token) {
    try {
      const response = await axiosInstance.post('/token/refresh/', { refresh: refresh_token });
      localStorage.setItem('access_token', response.data.access);
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/signin'; // Redirect to login page
    }
  }
};

const getProfile = async () => {
  const access_token = localStorage.getItem('access_token');
  const response = await axiosInstance.get('/profile/', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  return response.data;
};
