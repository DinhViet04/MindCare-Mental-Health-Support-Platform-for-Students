import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Report = {
    id: string;
    reporter: string;
    reported: string;
    reportedId: string;
    reason: string;
    detail: string;
    time: string;
    status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
};

const mockReports: Report[] = [
    { id: 'R001', reporter: 'user_alpha', reported: 'bad_actor_1', reportedId: 'uid-010', reason: 'Nội dung gây hại', detail: 'Người dùng này đang đăng thông tin khuyến khích tự làm hại bản thân.', time: '5 phút trước', status: 'pending' },
    { id: 'R002', reporter: 'user_beta', reported: 'spam_bot_99', reportedId: 'uid-011', reason: 'Spam', detail: 'Gửi hàng chục tin nhắn quảng cáo không được yêu cầu.', time: '30 phút trước', status: 'reviewing' },
    { id: 'R003', reporter: 'user_gamma', reported: 'fake_dr_xyz', reportedId: 'uid-012', reason: 'Giả mạo chuyên gia', detail: 'Tài khoản này tự xưng là bác sĩ nhưng không có chứng chỉ hợp lệ.', time: '1 giờ trước', status: 'reviewing' },
    { id: 'R004', reporter: 'user_delta', reported: 'abusive_user', reportedId: 'uid-013', reason: 'Quấy rối', detail: 'Liên tục gửi tin nhắn đe dọa sau khi bị từ chối kết bạn.', time: '3 giờ trước', status: 'resolved' },
    { id: 'R005', reporter: 'user_epsilon', reported: 'random_troll', reportedId: 'uid-014', reason: 'Troll / Khiêu khích', detail: 'Để lại bình luận phân biệt đối xử trong bài viết cộng đồng.', time: '5 giờ trước', status: 'dismissed' },
];

const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
    reviewing: { label: 'Đang xem xét', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    resolved: { label: 'Đã xử lý', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    dismissed: { label: 'Bỏ qua', color: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400' },
};

const ReportsQueuePage: React.FC = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState(mockReports);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = reports.filter(r => {
        const matchFilter = filter === 'all' || r.status === filter;
        const matchSearch = r.reporter.toLowerCase().includes(search.toLowerCase()) || r.reported.toLowerCase().includes(search.toLowerCase()) || r.reason.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const updateStatus = (id: string, status: Report['status']) => {
        setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    return (
        <div className="p-6 max-w-5xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Hàng Chờ Báo Cáo</h1>
                <p className="text-slate-500 text-sm">Xem xét tất cả báo cáo từ người dùng về vi phạm cộng đồng.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Chờ xử lý', value: reports.filter(r => r.status === 'pending').length, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', icon: 'pending' },
                    { label: 'Đang xem xét', value: reports.filter(r => r.status === 'reviewing').length, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'visibility' },
                    { label: 'Đã xử lý', value: reports.filter(r => r.status === 'resolved').length, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', icon: 'task_alt' },
                    { label: 'Bỏ qua', value: reports.filter(r => r.status === 'dismissed').length, color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-700', icon: 'cancel' },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                        <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-2`}>
                            <span className={`material-symbols-outlined text-lg ${s.color}`}>{s.icon}</span>
                        </div>
                        <p className="text-xl font-bold mb-0.5">{s.value}</p>
                        <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4 flex-wrap">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm báo cáo..."
                        className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                {['all', 'pending', 'reviewing', 'resolved', 'dismissed'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f === 'all' ? 'Tất cả' : statusMap[f]?.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-5 py-3 text-left">Người báo cáo</th>
                            <th className="px-5 py-3 text-left">Người bị báo cáo</th>
                            <th className="px-5 py-3 text-left">Lý do</th>
                            <th className="px-5 py-3 text-left">Thời gian</th>
                            <th className="px-5 py-3 text-center">Trạng thái</th>
                            <th className="px-5 py-3 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.map(r => (
                            <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">@{r.reporter}</td>
                                <td className="px-5 py-3 font-semibold text-primary">@{r.reported}</td>
                                <td className="px-5 py-3">
                                    <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-semibold px-2 py-0.5 rounded-full">{r.reason}</span>
                                </td>
                                <td className="px-5 py-3 text-slate-400 text-xs">{r.time}</td>
                                <td className="px-5 py-3 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusMap[r.status].color}`}>{statusMap[r.status].label}</span>
                                </td>
                                <td className="px-5 py-3 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <button onClick={() => navigate(`/moderation/reported-user/${r.reportedId}`)}
                                            className="px-2 py-1 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                            Xem
                                        </button>
                                        {r.status === 'pending' && (
                                            <button onClick={() => updateStatus(r.id, 'reviewing')}
                                                className="px-2 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                Xem xét
                                            </button>
                                        )}
                                        {r.status !== 'resolved' && r.status !== 'dismissed' && (
                                            <button onClick={() => updateStatus(r.id, 'resolved')}
                                                className="px-2 py-1 text-xs font-bold text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                                                Xử lý
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportsQueuePage;
