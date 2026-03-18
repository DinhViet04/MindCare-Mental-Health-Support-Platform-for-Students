import React, { useState } from 'react';

type QueueItem = {
    id: string;
    type: 'comment' | 'article' | 'profile' | 'community_post';
    content: string;
    user: string;
    userId: string;
    reportCount: number;
    time: string;
    reason: string;
};

const mockItems: QueueItem[] = [
    { id: '1', type: 'comment', content: 'Người dùng này đang cổ vũ tự làm hại bản thân và chia sẻ phương pháp nguy hiểm.', user: 'user_abc123', userId: 'uid-001', reportCount: 5, time: '10 phút trước', reason: 'Nội dung gây hại' },
    { id: '2', type: 'article', content: 'Bài viết chứa thông tin y tế sai lệch về thuốc điều trị tâm lý.', user: 'fake_expert_99', userId: 'uid-002', reportCount: 3, time: '1 giờ trước', reason: 'Thông tin sai lệch' },
    { id: '3', type: 'community_post', content: 'Spam quảng cáo dịch vụ không liên quan nhiều lần trong cộng đồng.', user: 'spam_user', userId: 'uid-003', reportCount: 8, time: '2 giờ trước', reason: 'Spam' },
    { id: '4', type: 'profile', content: 'Ảnh đại diện chứa hình ảnh không phù hợp.', user: 'profile_user', userId: 'uid-004', reportCount: 2, time: '3 giờ trước', reason: 'Nội dung không phù hợp' },
];

const typeLabels: Record<string, { label: string; color: string; icon: string }> = {
    comment: { label: 'Bình luận', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: 'comment' },
    article: { label: 'Bài viết', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: 'article' },
    profile: { label: 'Hồ sơ', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: 'person' },
    community_post: { label: 'Cộng đồng', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400', icon: 'groups' },
};

const ModerationQueuePage: React.FC = () => {
    const [items, setItems] = useState(mockItems);
    const [filter, setFilter] = useState('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);

    const handleApprove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
    const handleRemove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1 flex items-center gap-3">
                        Hàng Chờ Kiểm Duyệt
                        <span className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-sm font-bold px-2.5 py-0.5 rounded-full">{items.length}</span>
                    </h1>
                    <p className="text-slate-500 text-sm">Xem xét và xử lý nội dung bị báo cáo.</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-5 flex-wrap">
                {[
                    { key: 'all', label: 'Tất cả' },
                    { key: 'comment', label: 'Bình luận' },
                    { key: 'article', label: 'Bài viết' },
                    { key: 'community_post', label: 'Cộng đồng' },
                    { key: 'profile', label: 'Hồ sơ' },
                ].map(f => (
                    <button key={f.key} onClick={() => setFilter(f.key)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === f.key ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f.label}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-16 text-center">
                    <span className="material-symbols-outlined text-4xl text-green-500 mb-3 block">check_circle</span>
                    <p className="text-lg font-bold text-slate-700 dark:text-slate-200">Hàng chờ trống!</p>
                    <p className="text-sm text-slate-400 mt-1">Không có nội dung nào cần xem xét.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map(item => {
                        const typeInfo = typeLabels[item.type];
                        const isExpanded = expandedId === item.id;
                        return (
                            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                                                    <span className="material-symbols-outlined text-[12px]">{typeInfo.icon}</span>
                                                    {typeInfo.label}
                                                </span>
                                                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                                                    {item.reason}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-slate-400">
                                                    <span className="material-symbols-outlined text-[12px]">flag</span>
                                                    {item.reportCount} báo cáo
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">{item.content}</p>
                                            <p className="text-xs text-slate-400">
                                                <span className="font-semibold text-primary">@{item.user}</span> · {item.time}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => handleApprove(item.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-xs font-bold hover:bg-green-200 transition-colors">
                                                <span className="material-symbols-outlined text-sm">check</span>
                                                Bỏ qua
                                            </button>
                                            <button onClick={() => handleRemove(item.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                                Xóa
                                            </button>
                                            <button onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                                <span className="material-symbols-outlined text-sm">more_horiz</span>
                                                Thêm
                                            </button>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 grid grid-cols-3 gap-2">
                                            <button className="py-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-lg text-xs font-bold hover:bg-yellow-200 transition-colors">
                                                ⚠️ Cảnh cáo
                                            </button>
                                            <button className="py-2 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-lg text-xs font-bold hover:bg-orange-200 transition-colors">
                                                🔒 Tạm khóa
                                            </button>
                                            <button onClick={() => handleRemove(item.id)} className="py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors">
                                                🚫 Xóa TK
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ModerationQueuePage;
