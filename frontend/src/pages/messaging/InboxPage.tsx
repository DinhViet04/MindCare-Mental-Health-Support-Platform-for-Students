import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMessageSquare, FiUser } from 'react-icons/fi';

const mockConversations = [
    { id: '1', name: 'Dr. Nguyễn Minh Tuấn', lastMessage: 'Hẹn gặp lại bạn vào thứ Hai nhé!', time: '10:30', unread: 2, avatar: '' },
    { id: '2', name: 'Dr. Lê Thị Hoa', lastMessage: 'Cảm ơn bạn đã chia sẻ.', time: 'Hôm qua', unread: 0, avatar: '' },
    { id: '3', name: 'Dr. Trần Văn Nam', lastMessage: 'Hãy thực hiện bài tập thở mỗi sáng.', time: '2 ngày', unread: 0, avatar: '' },
];

const InboxPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const filtered = mockConversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto py-10 px-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Hộp thư</h1>
                    <Link to="/messages/new" className="bg-teal-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal-600 transition-colors flex items-center gap-2">
                        <FiMessageSquare /> Tin mới
                    </Link>
                </div>

                <div className="relative mb-4">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Tìm kiếm cuộc trò chuyện..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {filtered.length === 0 && (
                        <div className="py-16 text-center text-gray-400">Không tìm thấy cuộc trò chuyện nào</div>
                    )}
                    {filtered.map((c, i) => (
                        <Link key={c.id} to={`/messages/${c.id}`} className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${i < filtered.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                                <FiUser className="text-teal-500 w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                                <p className="text-gray-400 text-xs truncate">{c.lastMessage}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-xs text-gray-400">{c.time}</p>
                                {c.unread > 0 && (
                                    <span className="inline-block mt-1 bg-teal-500 text-white text-xs rounded-full px-2 py-0.5">{c.unread}</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InboxPage;
