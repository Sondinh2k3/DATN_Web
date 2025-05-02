import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
} from '../action/authActions';

const initialState = {
    token: null,
    user: null,
    error: null,
    loading: false,
    isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                user: action.user,
                error: null,
                loading: false,
                isAuthenticated: true
            };
        case AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
                error: null,
                loading: false,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

export default authReducer; 