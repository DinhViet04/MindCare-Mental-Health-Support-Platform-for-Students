import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Navbar from '../../components/Layout/Navbar';

interface LoginForm {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { register: registerUser, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        try {
            setIsLoading(true);
            await login(data.email, data.password);
            navigate('/');
        } catch (error) {
            // Error handled in auth context
        } finally {
            setIsLoading(false);
        }
    };

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">

                    {/* Navbar dùng chung — thay thế header cũ */}
                    <Navbar />

                    {/* Main Content Area: Split Layout */}
                    <main className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
                        {/* Left Side: Visual/Illustration (Hidden on mobile) */}
                        <div className="hidden lg:flex lg:w-1/2 relative bg-primary/5 items-center justify-center p-12 overflow-hidden">
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="absolute top-[-10%] left-[-10%] w-80 h-80 rounded-full bg-primary blur-3xl"></div>
                                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-primary/40 blur-3xl"></div>
                            </div>
                            <div className="relative z-10 max-w-md text-center">
                                <div className="mb-8 flex justify-center">
                                    <div
                                        className="w-full aspect-square rounded-xl bg-cover bg-center shadow-2xl shadow-primary/20"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3izyIiHln0SMWFc_8o6rDq3DdVmxdkeS1cYT7BUFw_tR7i8coliGNvlp3ftjD6g8Y_HVv7qK-aS3jvOzyg_Ub2XuT3viUr4Dk9P8AFRe1yffmdRkB8K8M-dHWqGZgwvizWd8X24CRE6OmTzihNITE0hBPPOCy3_4ENsWl7yI0TNQogfoSjzmA6pqFG1v7Liib116IrDzeD0Ey9LbRt3_5rWYphlzomEniZaW6S703ca7egyCE7tAOfSmtVeUl-oocT35tc-6Aj4bw')" }}
                                    />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">You're not alone.</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                    Take a deep breath. Your mental wellness journey is a priority, and we're here to support every step of the way.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Login Form */}
                        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-background-light dark:bg-background-dark">
                            <div className="max-w-[440px] w-full mx-auto">
                                <div className="mb-10">
                                    <h1 className="text-3xl font-bold mb-2">MindCare Login</h1>
                                    <p className="text-slate-500 dark:text-slate-400">Welcome back! Please enter your details.</p>
                                </div>

                                {/* Login Form */}
                                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Student Email</label>
                                        <div className="relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                            <input
                                                {...registerUser('email', {
                                                    required: 'Email là bắt buộc',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Email không hợp lệ'
                                                    }
                                                })}
                                                className="w-full pl-12 pr-4 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                                placeholder="e.g. name@university.edu"
                                                type="email"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                                            <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:underline">Forgot password?</Link>
                                        </div>
                                        <div className="relative">
                                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                            <input
                                                {...registerUser('password', {
                                                    required: 'Mật khẩu là bắt buộc',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Mật khẩu phải có ít nhất 6 ký tự'
                                                    }
                                                })}
                                                className="w-full pl-12 pr-12 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                                placeholder="••••••••"
                                                type={showPassword ? "text" : "password"}
                                                disabled={isLoading}
                                            />
                                            <button
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Đang xử lý...' : 'Log In'}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="relative my-10">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-primary/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm uppercase">
                                        <span className="bg-background-light dark:bg-background-dark px-4 text-slate-500 font-medium tracking-wider">Or continue with</span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-3 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        onClick={() => window.location.href = `${API_URL}/auth/google`}
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">Sign in with Google</span>
                                    </button>
                                </div>

                                {/* Footer Links */}
                                <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
                                    <p>© 2024 MindCare. Your privacy is our priority.</p>
                                    <div className="flex justify-center gap-4 mt-2">
                                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;