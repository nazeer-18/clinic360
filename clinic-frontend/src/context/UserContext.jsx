import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: localStorage.getItem('id') || '',
        role: localStorage.getItem('role') || '',
        token: localStorage.getItem('token') || '',
        name: localStorage.getItem('name') || '',
    });

    // Update user state and localStorage when any of the values change
    const setUserData = (userData) => {
        console.log(userData);
        setUser(userData);
        localStorage.setItem('id', userData.id);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('name', userData.name);
    };

    const clearUserData = () => {
        setUser({
            id: '',
            role: '',
            token: '',
            name: ''
        });
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
    };

    // Handle token expiration logic on page load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            clearUserData(); // Clear expired token data
        }
    }, []);

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000; // Current time in seconds
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Invalid token", error);
            return true; // If decoding fails, assume token is expired
        }
    };

    return (
        <UserContext.Provider value={{ user, setUserData, clearUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
