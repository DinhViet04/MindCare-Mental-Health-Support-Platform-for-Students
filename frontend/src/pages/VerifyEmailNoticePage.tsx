import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const VerifyEmailNoticePage: React.FC = () => {
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

                            {/* Icon */}
                            <div className="flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                    <FiMail className="w-10 h-10 text-primary" />
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h1 className="text-3xl font-bold mb-3">Kiểm tra email của bạn</h1>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Chúng tôi đã gửi một liên kết xác thực đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư và nhấn vào liên kết để kích hoạt tài khoản.
                                </p>
                            </div>

                            {/* Info box */}
                            <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-4 text-sm text-slate-600 dark:text-slate-400 text-left space-y-2">
                                <p className="font-semibold text-slate-700 dark:text-slate-300">Không nhận được email?</p>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Kiểm tra thư mục spam hoặc rác</li>
                                    <li>Đảm bảo bạn nhập đúng địa chỉ email</li>
                                    <li>Đợi vài phút rồi thử lại</li>
                                </ul>
                            </div>

                            {/* Back to login */}
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
                            >
                                <FiArrowLeft className="w-4 h-4" />
                                Quay lại đăng nhập
                            </Link>

                            {/* Footer */}
                            <div className="pt-4 text-sm text-slate-500 dark:text-slate-400">
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

export default VerifyEmailNoticePage;