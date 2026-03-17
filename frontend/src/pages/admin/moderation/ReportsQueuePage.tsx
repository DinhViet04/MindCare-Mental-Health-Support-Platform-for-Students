import React, { useState } from 'react';

const mockReports = [
    { id: 'R001', reporter: 'user_alpha', reported: 'bad_actor_1', reason: 'Nội dung gây hại', time: '5 phút trước', status: 'pending' },
    { id: 'R002', reporter: 'user_beta', reported: 'spam_bot_99', reason: 'Spam', time: '30 phút trước', status: 'reviewing' },
    { id: 'R003', reporter: 'user_gamma', reported: 'fake_dr_xyz', reason: 'Giả mạo chuyên gia', time: '1 giờ trước', status: 'reviewing' },
    { id: 'R004', reporter: 'user_delta', reported: 'abusive_user', reason: 'Quấy rối', time: '3 giờ trước', status: 'resolved' },
];

const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
    reviewing: { label: 'Đang xem xét', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    resolved: { label: 'Đã xử lý', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

const ReportsQueuePage: React.FC = () => {
    const [reports, setReports] = useState(mockReports);
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? reports : reports.filter(r => r.status === filter);

    return (
        <div className="p-6 max-w-5xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Hàng Chờ Báo Cáo</h1>
                <p className="text-slate-500 text-sm">Xem xét tất cả báo cáo từ người dùng về vi phạm cộng đồng.</p>
            </div>

            <div className="flex gap-2 mb-4">
                {['all', 'pending', 'reviewing', 'resolved'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f === 'all' ? 'Tất cả' : statusMap[f]?.label}
                    </button>
                ))}
            </div>

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
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusMap[r.status]?.color}`}>{statusMap[r.status]?.label}</span>
                                </td>
                                <td className="px-5 py-3 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="text-xs font-bold text-primary hover:underline">Xem</button>
                                        {r.status !== 'resolved' && (
                                            <button onClick={() => setReports(prev => prev.map(x => x.id === r.id ? { ...x, status: 'resolved' } : x))}
                                                className="text-xs font-bold text-green-600 hover:underline">Xử lý</button>
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
