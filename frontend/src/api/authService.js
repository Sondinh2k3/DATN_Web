import { apiService } from './apiService';

export const authService = {
    login: async (credentials) => {
        const response = await apiService.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    register: async (userData) => {
        return await apiService.post('/auth/register', userData);
    },

    getProfile: async () => {
        return await apiService.get('/auth/profile');
    }
}; 