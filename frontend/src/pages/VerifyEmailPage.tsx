import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Module-level Set: tồn tại xuyên suốt vòng đời app, không bị reset khi component unmount/remount
// → Ngăn React 18 Strict Mode gọi useEffect 2 lần
const pendingTokens = new Set<string>();

const VerifyEmailPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token || pendingTokens.has(token)) return;
            pendingTokens.add(token);

            try {
                const response = await fetch(`http://localhost:5000/api/auth/verify-email/${token}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message || 'Xác thực email thành công!');
                    toast.success('Xác thực email thành công!');
                    setTimeout(() => navigate('/login'), 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Xác thực thất bại');
                    toast.error(data.message || 'Xác thực thất bại');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
                toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
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

                    <main className="flex-1 flex items-center justify-center px-6 py-16">
                        <div className="max-w-[440px] w-full mx-auto text-center space-y-6">

                            {/* Loading */}
                            {status === 'loading' && (
                                <>
                                    <div className="flex justify-center">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                            <FiLoader className="w-10 h-10 text-primary animate-spin" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold mb-3">Đang xác thực email...</h1>
                                        <p className="text-slate-500 dark:text-slate-400">Vui lòng đợi trong giây lát.</p>
                                    </div>
                                </>
                            )}

                            {/* Success */}
                            {status === 'success' && (
                                <>
                                    <div className="flex justify-center">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                            <FiCheckCircle className="w-10 h-10 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold mb-3">Xác thực thành công!</h1>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{message}</p>
                                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
                                            Bạn sẽ được chuyển đến trang đăng nhập sau vài giây.
                                        </p>
                                    </div>
                                    <Link
                                        to="/login"
                                        className="inline-block h-14 px-8 leading-[3.5rem] bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all"
                                    >
                                        Đăng nhập ngay
                                    </Link>
                                </>
                            )}

                            {/* Error */}
                            {status === 'error' && (
                                <>
                                    <div className="flex justify-center">
                                        <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                                            <FiXCircle className="w-10 h-10 text-red-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold mb-3">Xác thực thất bại!</h1>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{message}</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-4">
                                        <Link
                                            to="/"
                                            className="h-14 px-6 leading-[3.5rem] inline-block rounded-xl border border-primary/20 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            Trang chủ
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="h-14 px-6 leading-[3.5rem] inline-block bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all"
                                        >
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </>
                            )}

                            {/* Footer */}
                            <div className="pt-8 text-sm text-slate-500 dark:text-slate-400">
                                <p>© 2024 MindCare. Quyền riêng tư của bạn là ưu tiên của chúng tôi.</p>
                                <div className="flex justify-center gap-4 mt-2">
                                    <a className="hover:text-primary transition-colors" href="#">Chính sách bảo mật</a>
                                    <a className="hover:text-primary transition-colors" href="#">Điều khoản dịch vụ</a>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;