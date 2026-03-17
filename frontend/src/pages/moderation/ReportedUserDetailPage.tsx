import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReportedUserDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [actionTaken, setActionTaken] = useState<string | null>(null);
    const [note, setNote] = useState('');

    // Mock data for reported user
    const user = {
        username: 'bad_actor_007',
        email: 'ba007@example.com',
        joinDate: '01/06/2025',
        totalViolations: 3,
        status: 'active',
        avatar: '🧑',
    };

    const reportHistory = [
        { id: 'R-001', reason: 'Nội dung gây hại', reporter: 'user_alpha', date: 'Mar 8, 2026', status: 'pending' },
        { id: 'R-002', reason: 'Spam', reporter: 'user_beta', date: 'Mar 5, 2026', status: 'resolved' },
        { id: 'R-003', reason: 'Quấy rối', reporter: 'user_gamma', date: 'Feb 28, 2026', status: 'resolved' },
    ];

    const actions = [
        { key: 'warn', label: '⚠️ Cảnh cáo', desc: 'Gửi thông báo vi phạm đến người dùng', color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400' },
        { key: 'suspend', label: '🔒 Tạm khóa 7 ngày', desc: 'Khóa tài khoản trong 7 ngày', color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400' },
        { key: 'ban', label: '🚫 Khóa vĩnh viễn', desc: 'Khóa tài khoản vĩnh viễn', color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400' },
        { key: 'dismiss', label: '✅ Bỏ qua báo cáo', desc: 'Đánh dấu là không vi phạm', color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' },
    ];

    return (
        <div className="p-6 max-w-3xl">
            {/* Header */}
            <div className="mb-6">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Quay lại hàng chờ
                </button>
                <h1 className="text-2xl font-bold">Chi Tiết Báo Cáo <span className="text-slate-400 font-normal">#{id}</span></h1>
            </div>

            {/* User Info */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">person</span>
                    Người Bị Báo Cáo
                </h3>
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">{user.avatar}</div>
                    <div>
                        <p className="font-bold text-lg">@{user.username}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <div className="ml-auto">
                        <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full capitalize">{user.status}</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                        <p className="text-xs text-slate-400 mb-1">Ngày tham gia</p>
                        <p className="font-bold">{user.joinDate}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                        <p className="text-xs text-slate-400 mb-1">Tổng báo cáo</p>
                        <p className="font-bold">{reportHistory.length}</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                        <p className="text-xs text-red-400 mb-1">Số lần vi phạm</p>
                        <p className="font-bold text-red-600">{user.totalViolations}</p>
                    </div>
                </div>
            </div>

            {/* Report History */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-5">
                <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold">Lịch Sử Báo Cáo</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {reportHistory.map(r => (
                        <div key={r.id} className="px-5 py-4 flex items-center gap-4">
                            <span className="material-symbols-outlined text-red-400">flag</span>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">{r.reason}</p>
                                <p className="text-xs text-slate-400">Báo cáo bởi @{r.reporter} · {r.date}</p>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                                {r.status === 'pending' ? 'Chờ xử lý' : 'Đã xử lý'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Take Action */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="font-bold mb-4">Hành Động Kiểm Duyệt</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {actions.map(a => (
                        <button key={a.key} onClick={() => setActionTaken(a.key)}
                            className={`p-4 border-2 rounded-xl text-left transition-all ${actionTaken === a.key ? 'border-primary bg-primary/5' : `border ${a.color} hover:opacity-80`}`}>
                            <p className="font-bold text-sm">{a.label}</p>
                            <p className="text-xs opacity-70 mt-1">{a.desc}</p>
                        </button>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ghi chú (tùy chọn)</label>
                    <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
                        placeholder="Ghi lại lý do và chi tiết hành động kiểm duyệt..."
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
                </div>

                {actionTaken && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                            Đã chọn: {actions.find(a => a.key === actionTaken)?.label}
                        </p>
                    </div>
                )}

                <button disabled={!actionTaken}
                    className="w-full py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Xác Nhận Hành Động
                </button>
            </div>
        </div>
    );
};

export default ReportedUserDetailPage;
