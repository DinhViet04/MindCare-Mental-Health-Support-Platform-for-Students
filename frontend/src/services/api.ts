import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterData, ApiError } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthEndpoint = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
        if (error.response?.status === 401 && !isAuthEndpoint) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
    },

    forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (token: string, password: string): Promise<AuthResponse> => {
        const response = await api.post(`/auth/reset-password/${token}`, { password });
        return response.data;
    },

    changePassword: async (currentPassword: string, newPassword: string): Promise<AuthResponse> => {
        const response = await api.post('/auth/change-password', { currentPassword, newPassword });
        return response.data;
    },

    verifyEmail: async (token: string): Promise<any> => {
        const response = await api.get(`/auth/verify-email/${token}`);
        return response.data;
    },
};