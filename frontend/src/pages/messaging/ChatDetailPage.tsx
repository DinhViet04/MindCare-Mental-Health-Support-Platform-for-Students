import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiSend, FiUser } from 'react-icons/fi';

const ChatDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, from: 'other', text: 'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?', time: '09:00' },
        { id: 2, from: 'me', text: 'Cảm ơn bác sĩ, tôi muốn hỏi về bài tập giảm stress.', time: '09:02' },
        { id: 3, from: 'other', text: 'Tất nhiên! Hãy thử kỹ thuật thở 4-7-8 mỗi sáng nhé.', time: '09:03' },
    ]);

    const send = () => {
        if (!message.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), from: 'me', text: message, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }]);
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-teal-500" />
                </div>
                <div>
                    <p className="font-semibold text-gray-800 text-sm">Cuộc trò chuyện #{id}</p>
                    <p className="text-xs text-green-500">Đang hoạt động</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${msg.from === 'me' ? 'bg-teal-500 text-white rounded-br-sm' : 'bg-white text-gray-700 shadow-sm rounded-bl-sm'}`}>
                            <p>{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-teal-100' : 'text-gray-400'}`}>{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border-t border-gray-200 px-4 py-3 flex gap-2">
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send()}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
                <button onClick={send} className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-colors">
                    <FiSend />
                </button>
            </div>
        </div>
    );
};

export default ChatDetailPage;
