import React, { useState } from 'react';

const historyEvents = [
    { id: '1', action: 'Xóa bình luận', actionType: 'remove', target: 'Bình luận #1234 của @user_abc', moderator: 'Admin John', reason: 'Nội dung gây hại', time: '2026-03-08 22:14' },
    { id: '2', action: 'Cảnh cáo người dùng', actionType: 'warn', target: '@user_fake99', moderator: 'Mod Sarah', reason: 'Spam quảng cáo', time: '2026-03-08 18:30' },
    { id: '3', action: 'Tạm khóa tài khoản', actionType: 'suspend', target: '@bad_actor_007', moderator: 'Admin John', reason: 'Vi phạm lần 3', time: '2026-03-07 14:00' },
    { id: '4', action: 'Xóa bài viết', actionType: 'remove', target: 'Bài viết #567 của @fake_dr', moderator: 'Mod Lisa', reason: 'Thông tin y tế sai lệch', time: '2026-03-07 10:20' },
    { id: '5', action: 'Khóa tài khoản vĩnh viễn', actionType: 'ban', target: '@repeat_offender', moderator: 'Admin John', reason: 'Quấy rối nghiêm trọng', time: '2026-03-06 09:45' },
    { id: '6', action: 'Bỏ qua báo cáo', actionType: 'dismiss', target: 'Báo cáo R-043 về @innocent_user', moderator: 'Mod Sarah', reason: 'Không vi phạm', time: '2026-03-05 16:00' },
];

const actionStyles: Record<string, { color: string; icon: string; badge: string }> = {
    remove: { color: 'bg-red-100 dark:bg-red-900/20', icon: 'delete', badge: 'text-red-600' },
    warn: { color: 'bg-yellow-100 dark:bg-yellow-900/20', icon: 'warning', badge: 'text-yellow-600' },
    suspend: { color: 'bg-orange-100 dark:bg-orange-900/20', icon: 'lock', badge: 'text-orange-600' },
    ban: { color: 'bg-red-200 dark:bg-red-900/40', icon: 'block', badge: 'text-red-700' },
    dismiss: { color: 'bg-slate-100 dark:bg-slate-700', icon: 'cancel', badge: 'text-slate-500' },
};

const ModerationHistoryPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [actionFilter, setActionFilter] = useState('all');

    const filtered = historyEvents.filter(e => {
        const matchAction = actionFilter === 'all' || e.actionType === actionFilter;
        const matchSearch = e.target.toLowerCase().includes(search.toLowerCase()) || e.moderator.toLowerCase().includes(search.toLowerCase());
        return matchAction && matchSearch;
    });

    return (
        <div className="p-6 max-w-5xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Lịch Sử Kiểm Duyệt</h1>
                <p className="text-slate-500 text-sm">Xem lại tất cả hành động kiểm duyệt đã thực hiện.</p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm..."
                        className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                {[
                    { key: 'all', label: 'Tất cả' },
                    { key: 'remove', label: 'Xóa nội dung' },
                    { key: 'warn', label: 'Cảnh cáo' },
                    { key: 'suspend', label: 'Tạm khóa' },
                    { key: 'ban', label: 'Khóa vĩnh viễn' },
                    { key: 'dismiss', label: 'Bỏ qua' },
                ].map(f => (
                    <button key={f.key} onClick={() => setActionFilter(f.key)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${actionFilter === f.key ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f.label}
                    </button>
                ))}
                <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-500 hover:text-primary transition-colors ml-auto">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Xuất CSV
                </button>
            </div>

            <div className="space-y-3">
                {filtered.map(event => {
                    const style = actionStyles[event.actionType] || actionStyles['dismiss'];
                    return (
                        <div key={event.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className={`w-10 h-10 rounded-full ${style.color} flex items-center justify-center flex-shrink-0`}>
                                <span className={`material-symbols-outlined text-lg ${style.badge}`}>{style.icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-2 flex-wrap">
                                    <div>
                                        <p className="font-bold text-sm">{event.action}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{event.target}</p>
                                    </div>
                                    <p className="text-xs text-slate-400 whitespace-nowrap">{event.time}</p>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-slate-500">Người thực hiện: <span className="font-semibold">{event.moderator}</span></span>
                                    <span className="text-xs text-slate-400">•</span>
                                    <span className="text-xs text-slate-500">Lý do: <span className="font-semibold">{event.reason}</span></span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ModerationHistoryPage;
