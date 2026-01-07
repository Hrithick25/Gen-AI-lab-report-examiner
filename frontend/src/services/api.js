import axios from 'axios';

// Prefer REACT_APP_API_URL; else use relative paths to leverage CRA dev proxy and avoid CORS
const API_BASE = process.env.REACT_APP_API_URL || '';

// Do NOT set a default Content-Type header globally. Let axios/browser infer it.
const api = axios.create({
    baseURL: API_BASE,
});

// Add auth interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
