import axios from 'axios';
import store from './redux/store';
import { logout } from './redux/action/authActions';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle specific error status codes
            switch (error.response.status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    store.dispatch(logout());
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden - show access denied message
                    console.error('Access denied');
                    break;
                case 404:
                    // Not found - show not found message
                    console.error('Resource not found');
                    break;
                case 500:
                    // Server error - show server error message
                    console.error('Server error');
                    break;
                default:
                    console.error('An error occurred');
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
