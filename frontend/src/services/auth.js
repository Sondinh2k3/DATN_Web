import axiosConfig from '../axiosConfig';
import { authSuccess, logout } from '../redux/action/authActions';
import store from '../redux/store';

export const apiRegister = (payload) => new Promise(async (resolve, reject) => { 
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/v1/auth/register',
            data: payload
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiLogin = async (data) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/v1/auth/login',
            data: data
        });
        if (response.data.err === 0) {
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            store.dispatch(authSuccess(token, user));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const apiLogout = () => {
    try {
        // Xóa token và user khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Dispatch action logout để cập nhật state Redux
        store.dispatch(logout());
        
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};