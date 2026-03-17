import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (token && storedUser) {
                // Verify token and get user info
                setUser(JSON.parse(storedUser));
                setIsLoading(false);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsLoading(false);
            }
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await authApi.login({ email, password });
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            toast.success('Đăng nhập thành công!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, fullName: string) => {
        try {
            setIsLoading(true);
            const response = await authApi.register({ email, password, fullName });
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success('Đăng xuất thành công');
        } catch (error: any) {
            toast.error('Đăng xuất thất bại');
        }
    };

    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};