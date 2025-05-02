import axios from '../../axiosConfig';

// Action Types
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

// Action Creators
export const authStart = () => ({
    type: AUTH_START
});

export const authSuccess = (token, user) => ({
    type: AUTH_SUCCESS,
    token,
    user
});

export const authFail = (error) => ({
    type: AUTH_FAIL,
    error
});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
        type: AUTH_LOGOUT
    };
};

// Async Actions
export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(authStart());
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSuccess(token, user));
        } catch (error) {
            dispatch(authFail(error.response?.data?.message || 'Đăng nhập thất bại'));
        }
    };
};

export const register = (userData) => {
    return async (dispatch) => {
        dispatch(authStart());
        try {
            const response = await axios.post('/api/auth/register', userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSuccess(token, user));
        } catch (error) {
            dispatch(authFail(error.response?.data?.message || 'Đăng ký thất bại'));
        }
    };
};

export const checkAuthState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            dispatch(authSuccess(token, user));
        }
    };
}; 