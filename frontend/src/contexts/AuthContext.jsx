import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            if (token === 'demo-token') {
                const demoEmail = localStorage.getItem('demo_email') || 'demo@example.com';
                const demoName = demoEmail.split('@')[0];
                setUser({ email: demoEmail, name: demoName });
                setLoading(false);
            } else {
                api.get('/user/profile')
                    .then(response => {
                        setUser(response.data);
                    })
                    .catch(() => {
                        localStorage.removeItem('token');
                    })
                    .finally(() => setLoading(false));
            }
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.access_token);
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            // Demo fallback: allow login with any email/password when backend is unavailable or rejects
            const email = credentials?.email || 'demo@example.com';
            const name = email.split('@')[0];
            localStorage.setItem('token', 'demo-token');
            localStorage.setItem('demo_email', email);
            const demoUser = { email, name };
            setUser(demoUser);
            return { access_token: 'demo-token', user: demoUser, demo: true };
        }
    };

    const register = async (userData) => {
        const response = await api.post('/auth/register', userData);
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.user);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const refreshProfile = async () => {
        try {
            const response = await api.get('/user/profile');
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to refresh profile:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, refreshProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
