import API from './api';

export const registerUser = async (userData) => {
    const response = await API.post('/api/auth/register', userData);
    return response.data;
} 

export const loginUser = async (credentials) => {
    const response = await API.post('/api/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.token); // Store token after login
    }
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};

export const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};