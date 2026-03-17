import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

interface RegisterForm {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}

const RegisterPage: React.FC = () => {
    const {
        register: registerUser,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterForm>();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const password = watch('password');

    const onSubmit = async (data: RegisterForm) => {
        try {
            setIsLoading(true);
            await register(data.email, data.password, data.fullName);
            navigate('/verify-email-notice');
        } catch (error) {
            // Error handled in auth context
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">

                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                        <div className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                            <div className="size-6 text-primary">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold leading-tight tracking-tight">MindCare</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm hidden sm:inline-block text-slate-600 dark:text-slate-400">Đã có tài khoản?</span>
                            <Link
                                to="/login"
                                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-slate-900 text-sm font-bold leading-normal"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </header>

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
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3izyIiHln0SMWFc_8o6rDq3DdVmxdkeS1cYT7BUFw_tR7i8coliGNvlp3ftjD6g8Y_HVv7qK-aS3jvOzyg_Ub2XuT3viUr4Dk9P8AFRe1yffmdRkB8K8M-dHWqGZgwvizWd8X24CRE6OmTzihNITE0hBPPOCy3_4ENsWl7yI0TNQogfoSjzmA6pqFG1v7Liib116IrDzeD0Ey9LbRt3_5rWYphlzomEniZaW6S703ca7egyCE7tAOfSmtVeUl-oocT35tc-6Aj4bw')",
                                        }}
                                    />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Bắt đầu hành trình của bạn.</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                    Hàng nghìn sinh viên đã ưu tiên sức khoẻ tinh thần của họ. Hành trình của bạn bắt đầu từ đây.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Register Form */}
                        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-background-light dark:bg-background-dark overflow-y-auto">
                            <div className="max-w-[440px] w-full mx-auto">
                                <div className="mb-10">
                                    <h1 className="text-3xl font-bold mb-2">Đăng ký MindCare</h1>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Tạo tài khoản sinh viên để tiếp cận các tài nguyên và hỗ trợ sức khoẻ tâm thần.
                                    </p>
                                </div>

                                {/* Register Form */}
                                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                                    {/* Họ và tên */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Họ và tên</label>
                                        <div className="relative">
                                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                            <input
                                                {...registerUser('fullName', {
                                                    required: 'Họ tên là bắt buộc',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Họ tên phải có ít nhất 2 ký tự',
                                                    },
                                                })}
                                                className="w-full pl-12 pr-4 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                                placeholder="Nhập họ và tên của bạn"
                                                type="text"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        {errors.fullName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                                        )}
                                    </div>

                                    {/* Email sinh viên */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Email sinh viên</label>
                                        <div className="relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                            <input
                                                {...registerUser('email', {
                                                    required: 'Email là bắt buộc',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Email không hợp lệ',
                                                    },
                                                })}
                                                className="w-full pl-12 pr-4 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                                placeholder="tenban@university.edu"
                                                type="email"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Mật khẩu */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Mật khẩu</label>
                                        <div className="relative">
                                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                            <input
                                                {...registerUser('password', {
                                                    required: 'Mật khẩu là bắt buộc',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Mật khẩu must be at least 6 characters',
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                                        message: 'Mật khẩu must contain at least 1 letter and 1 number',
                                                    },
                                                })}
                                                className="w-full pl-12 pr-12 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                                placeholder="Tạo mật khẩu mạnh"
                                                type={showPassword ? 'text' : 'password'}
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

                                    {/* Confirm Mật khẩu */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Confirm Mật khẩu</label>
                                        <div className="relative">
                                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                            <input
                                                {...registerUser('confirmPassword', {
                                                    required: 'Vui lòng xác nhận mật khẩu',
                                                    validate: (value) =>
                                                        value === password || 'Mật khẩu xác nhận không khớp',
                                                })}
                                                className="w-full pl-12 pr-12 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                                placeholder="Nhập lại mật khẩu"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                disabled={isLoading}
                                            />
                                            <button
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                                        )}
                                    </div>

                                    {/* Terms & Conditions */}
                                    <div className="flex items-start gap-3 py-1">
                                        <input
                                            {...registerUser('terms', {
                                                required: 'Bạn phải đồng ý với điều khoản để tiếp tục',
                                            })}
                                            id="terms"
                                            type="checkbox"
                                            disabled={isLoading}
                                            className="mt-1 size-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-white dark:bg-slate-800 accent-primary"
                                        />
                                        <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                                            Tôi đồng ý với{' '}
                                            <a href="#" className="text-primary font-medium hover:underline">Điều khoản dịch vụ</a>
                                            {' '}and{' '}
                                            <a href="#" className="text-primary font-medium hover:underline">Chính sách bảo mật</a>.
                                        </label>
                                    </div>
                                    {errors.terms && (
                                        <p className="-mt-3 text-sm text-red-600">{errors.terms.message}</p>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản'}
                                    </button>
                                </form>

                                {/* Footer Links */}
                                <div className="mt-8 text-center">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Đã có tài khoản?{' '}
                                        <Link to="/login" className="text-primary font-bold hover:underline">
                                            Đăng nhập tại đây
                                        </Link>
                                    </p>
                                </div>

                                <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                    <p>© 2024 MindCare. Quyền riêng tư của bạn là ưu tiên của chúng tôi.</p>
                                    <div className="flex justify-center gap-4 mt-2">
                                        <a className="hover:text-primary transition-colors" href="#">Chính sách bảo mật</a>
                                        <a className="hover:text-primary transition-colors" href="#">Điều khoản dịch vụ</a>
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

export default RegisterPage;