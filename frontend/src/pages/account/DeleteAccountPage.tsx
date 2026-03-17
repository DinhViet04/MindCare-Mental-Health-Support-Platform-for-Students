import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiLock, FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const DeleteAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [password, setPassword] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isConfirmed) {
            toast.error('Vui lòng đánh dấu xác nhận xóa tài khoản');
            return;
        }

        if (!password) {
            toast.error('Vui lòng nhập mật khẩu để xác nhận');
            return;
        }

        try {
            setIsDeleting(true);
            // Replace with actual API call
            // await api.delete('/users/account', { data: { password } });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Tài khoản của bạn đã được xóa thành công. Cảm ơn bạn đã sử dụng MindCare.');
            logout();
            navigate('/');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Sinh lỗi, mật khẩu có thể không đúng.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222] py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-xl w-full space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-sm border border-red-100 dark:border-red-900/30">

                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/40 mb-4">
                        <FiAlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">Xóa tài khoản</h2>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                    </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-5 border border-red-100 dark:border-red-900/30">
                    <h3 className="text-sm font-bold text-red-800 dark:text-red-300 mb-2">Điều gì sẽ xảy ra?</h3>
                    <ul className="text-sm text-red-700 dark:text-red-400/80 space-y-2 list-disc pl-5">
                        <li>Hồ sơ cá nhân và cài đặt của bạn sẽ bị xóa.</li>
                        <li>Lịch sử tư vấn, bài test và ghi chú sẽ bị vô hiệu hóa.</li>
                        <li>Bất kỳ gói đăng ký hiện tại nào sẽ bị hủy ngay lập tức không hoàn tiền.</li>
                    </ul>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleDelete}>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="confirm"
                                name="confirm"
                                type="checkbox"
                                checked={isConfirmed}
                                onChange={(e) => setIsConfirmed(e.target.checked)}
                                className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded accent-red-600"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="confirm" className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                                Tôi hiểu rằng hành động này không thể hoàn tác
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Nhập mật khẩu để xác nhận
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiLock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all outline-none"
                                placeholder="Mật khẩu của bạn"
                                disabled={isDeleting}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/account/settings')}
                            disabled={isDeleting}
                            className="flex-1 inline-flex justify-center items-center py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-xl shadow-sm text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50"
                        >
                            <FiX className="mr-2 h-5 w-5" />
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isDeleting || !isConfirmed || !password}
                            className="flex-1 inline-flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDeleting ? (
                                'Đang xóa...'
                            ) : (
                                <>
                                    <FiTrash2 className="mr-2 h-5 w-5" />
                                    Xóa tài khoản
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccountPage;
