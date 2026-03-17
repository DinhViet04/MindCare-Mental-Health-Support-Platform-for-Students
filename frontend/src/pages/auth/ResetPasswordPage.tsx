import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/api';
import { FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordForm>();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const password = watch('password');

    const onSubmit = async (data: ResetPasswordForm) => {
        if (!token) {
            toast.error('Token không hợp lệ');
            return;
        }
        try {
            setIsLoading(true);
            await authApi.resetPassword(token, data.password);
            setIsSuccess(true);
            toast.success('Đặt lại mật khẩu thành công!');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
                    </header>
                    {children}
                </div>
            </div>
        </div>
    );

    if (isSuccess) {
        return (
            <PageShell>
                <main className="flex-1 flex items-center justify-center px-6 py-16">
                    <div className="max-w-[440px] w-full mx-auto text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                <FiCheckCircle className="w-10 h-10 text-primary" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-3">Đặt lại mật khẩu thành công!</h1>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                Mật khẩu của bạn đã được đặt lại. Bạn sẽ được chuyển đến trang đăng nhập sau vài giây.
                            </p>
                        </div>
                        <Link to="/login" className="inline-block text-primary font-semibold hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </div>
                </main>
            </PageShell>
        );
    }

    return (
        <PageShell>
            <main className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">

                {/* Left Side */}
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
                        <h2 className="text-3xl font-bold mb-4">Khởi đầu mới.</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            Tạo mật khẩu mới để bảo vệ hành trình sức khoẻ tinh thần của bạn.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-background-light dark:bg-background-dark">
                    <div className="max-w-[440px] w-full mx-auto">
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold mb-2">Đặt lại mật khẩu</h1>
                            <p className="text-slate-500 dark:text-slate-400">Vui lòng nhập mật khẩu mới của bạn bên dưới.</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            {/* Mật khẩu mới */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Mật khẩu mới</label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                    <input
                                        {...register('password', {
                                            required: 'Mật khẩu là bắt buộc',
                                            minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                                message: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số',
                                            },
                                        })}
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full pl-12 pr-12 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Xác nhận mật khẩu mới</label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                    <input
                                        {...register('confirmPassword', {
                                            required: 'Vui lòng xác nhận mật khẩu',
                                            validate: (value) => value === password || 'Mật khẩu xác nhận không khớp',
                                        })}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="w-full pl-12 pr-12 h-14 rounded-xl border border-primary/20 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                            </button>
                        </form>

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
        </PageShell>
    );
};

export default ResetPasswordPage;