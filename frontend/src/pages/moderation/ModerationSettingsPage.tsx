import React, { useState } from 'react';

type SettingItem = { key: string; label: string; desc: string; enabled: boolean };

const ModerationSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<SettingItem[]>([
        { key: 'auto_filter', label: 'Tự động lọc từ ngữ không phù hợp', desc: 'Tự động xóa hoặc che giấu nội dung chứa từ ngữ vi phạm theo danh sách từ khoá.', enabled: true },
        { key: 'require_approval', label: 'Yêu cầu duyệt bài đăng mới', desc: 'Mọi bài viết của người dùng mới cần được kiểm duyệt trước khi hiển thị.', enabled: false },
        { key: 'notify_new_report', label: 'Thông báo khi có báo cáo mới', desc: 'Gửi thông báo realtime đến moderator khi có báo cáo mới được gửi.', enabled: true },
        { key: 'auto_ban_3_violations', label: 'Tự động khóa sau 3 lần vi phạm', desc: 'Tài khoản sẽ bị tạm khóa tự động sau 3 lần bị xác nhận vi phạm.', enabled: true },
        { key: 'profanity_warning', label: 'Cảnh báo người dùng trước khi đăng', desc: 'Hiển thị cảnh báo khi hệ thống phát hiện nội dung có thể vi phạm.', enabled: false },
        { key: 'shadow_ban', label: 'Shadow ban nội dung spam', desc: 'Ẩn nội dung spam khỏi cộng đồng mà không thông báo cho người đăng.', enabled: true },
        { key: 'ai_detection', label: 'Phát hiện vi phạm bằng AI', desc: 'Sử dụng AI để phát hiện và gắn cờ nội dung có khả năng vi phạm cao.', enabled: false },
    ]);

    const [blocklistText, setBlocklistText] = useState('spam\nlừa đảo\nquảng cáo');
    const [saved, setSaved] = useState(false);

    const toggleSetting = (key: string) => {
        setSettings(prev => prev.map(s => s.key === key ? { ...s, enabled: !s.enabled } : s));
        setSaved(false);
    };

    return (
        <div className="p-6 max-w-3xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Cài Đặt Kiểm Duyệt</h1>
                <p className="text-slate-500 text-sm">Điều chỉnh quy tắc và cơ chế kiểm duyệt nội dung trên nền tảng.</p>
            </div>

            {/* Feature Toggles */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700 mb-5">
                {settings.map(item => (
                    <div key={item.key} className="flex items-center justify-between px-6 py-4">
                        <div className="mr-4">
                            <p className="font-semibold text-sm">{item.label}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        <button
                            onClick={() => toggleSetting(item.key)}
                            className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${item.enabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.enabled ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Blocklist */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                <h3 className="font-bold mb-1">Danh Sách Từ Khoá Bị Chặn</h3>
                <p className="text-xs text-slate-500 mb-3">Mỗi từ/cụm từ trên một dòng. Nội dung chứa các từ này sẽ bị tự động lọc.</p>
                <textarea rows={6} value={blocklistText} onChange={e => { setBlocklistText(e.target.value); setSaved(false); }}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm font-mono resize-none" />
            </div>

            {saved && (
                <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600">check_circle</span>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400">Đã lưu cài đặt kiểm duyệt!</p>
                </div>
            )}

            <button onClick={() => setSaved(true)}
                className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Lưu Cài Đặt
            </button>
        </div>
    );
};

export default ModerationSettingsPage;
