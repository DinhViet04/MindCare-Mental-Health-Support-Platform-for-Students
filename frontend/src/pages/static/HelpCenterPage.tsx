import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp, FiBook, FiCreditCard, FiUser, FiMessageCircle } from 'react-icons/fi';

const categories = [
    {
        icon: FiUser,
        title: 'Tài khoản',
        articles: [
            { q: 'Làm thế nào để đổi mật khẩu?', a: 'Vào Cài đặt tài khoản → Bảo mật → Đổi mật khẩu.' },
            { q: 'Cách xóa tài khoản?', a: 'Liên hệ hỗ trợ để yêu cầu xóa tài khoản.' },
        ],
    },
    {
        icon: FiCreditCard,
        title: 'Thanh toán',
        articles: [
            { q: 'Các phương thức thanh toán được chấp nhận?', a: 'Chúng tôi chấp nhận thẻ ngân hàng, MoMo, ZaloPay, và chuyển khoản.' },
            { q: 'Chính sách hoàn tiền?', a: 'Bạn có thể yêu cầu hoàn tiền trong vòng 24h sau khi đặt lịch.' },
        ],
    },
    {
        icon: FiBook,
        title: 'Đặt lịch',
        articles: [
            { q: 'Làm sao để hủy buổi hẹn?', a: 'Vào Lịch hẹn → Chọn buổi hẹn → Hủy. Lưu ý chính sách hủy của từng chuyên gia.' },
        ],
    },
    {
        icon: FiMessageCircle,
        title: 'Tư vấn',
        articles: [
            { q: 'Buổi tư vấn kéo dài bao lâu?', a: 'Thông thường 45-60 phút tùy chuyên gia.' },
        ],
    },
];

const HelpCenterPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggle = (key: string) => setOpenItems(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-16 px-4 text-center text-white">
                <h1 className="text-4xl font-bold mb-3">Trung tâm trợ giúp</h1>
                <p className="text-teal-100 mb-6">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
                <div className="max-w-xl mx-auto relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Tìm kiếm câu hỏi..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-700 focus:outline-none shadow-lg"
                    />
                </div>
            </div>
            <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
                {categories.map(cat => (
                    <div key={cat.title}>
                        <div className="flex items-center gap-2 mb-4">
                            <cat.icon className="text-teal-500 w-5 h-5" />
                            <h2 className="text-lg font-semibold text-gray-800">{cat.title}</h2>
                        </div>
                        <div className="space-y-2">
                            {cat.articles.filter(a => !search || a.q.toLowerCase().includes(search.toLowerCase())).map((article, idx) => {
                                const key = `${cat.title}-${idx}`;
                                const isOpen = openItems.includes(key);
                                return (
                                    <div key={key} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                        <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => toggle(key)}>
                                            <span className="font-medium text-gray-700 text-sm">{article.q}</span>
                                            {isOpen ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-4 text-sm text-gray-500 border-t border-gray-100 pt-3">{article.a}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpCenterPage;
