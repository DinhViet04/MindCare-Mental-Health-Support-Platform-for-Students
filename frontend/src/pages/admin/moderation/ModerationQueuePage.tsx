import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
    { id: '1', type: 'comment', content: 'Người dùng này đang cổ vũ tự làm hại bản thân.', user: 'user_abc123', reportCount: 5, time: '10 phút trước', reason: 'Nội dung gây hại' },
    { id: '2', type: 'article', content: 'Bài viết chứa thông tin y tế sai lệch về thuốc điều trị tâm lý.', user: 'fake_expert_99', reportCount: 3, time: '1 giờ trước', reason: 'Thông tin sai lệch' },
    { id: '3', type: 'community_post', content: 'Spam quảng cáo dịch vụ không liên quan.', user: 'spam_user', reportCount: 8, time: '2 giờ trước', reason: 'Spam' },
];

const typeLabels: Record<string, { label: string; color: string }> = {
    comment: { label: 'Bình luận', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
    article: { label: 'Bài viết', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    community_post: { label: 'Cộng đồng', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' },
};

const ModerationQueuePage: React.FC = () => {
    const navigate = useNavigate();
    const [queue, setQueue] = useState(items);

    const remove = (id: string) => setQueue(prev => prev.filter(i => i.id !== id));

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1 flex items-center gap-3">
                        Hàng Chờ Kiểm Duyệt
                        <span className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-sm font-bold px-2.5 py-0.5 rounded-full">{queue.length}</span>
                    </h1>
                    <p className="text-slate-500 text-sm">Xem xét và xử lý nội dung bị báo cáo.</p>
                </div>
            </div>

            {queue.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-16 text-center">
                    <span className="material-symbols-outlined text-4xl text-green-500 mb-3 block">check_circle</span>
                    <p className="text-lg font-bold">Hàng chờ trống!</p>
                    <p className="text-sm text-slate-400 mt-1">Không có nội dung nào cần xem xét.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {queue.map(item => (
                        <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeLabels[item.type]?.color}`}>
                                            {typeLabels[item.type]?.label}
                                        </span>
                                        <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">{item.reason}</span>
                                        <span className="text-xs text-slate-400">{item.reportCount} báo cáo</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{item.content}</p>
                                    <p className="text-xs text-slate-400"><span className="font-semibold text-primary">@{item.user}</span> · {item.time}</p>
                                </div>
                                <div className="flex flex-col gap-2 flex-shrink-0">
                                    <button onClick={() => remove(item.id)} className="px-3 py-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-xs font-bold hover:bg-green-200 transition-colors">
                                        Bỏ qua
                                    </button>
                                    <button onClick={() => remove(item.id)} className="px-3 py-1.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModerationQueuePage;
