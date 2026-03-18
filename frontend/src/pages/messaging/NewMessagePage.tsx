import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';

const mockUsers = [
    { id: '1', name: 'Dr. Nguyễn Minh Tuấn', role: 'Chuyên gia tâm lý' },
    { id: '2', name: 'Dr. Lê Thị Hoa', role: 'Tư vấn viên' },
];

const NewMessagePage: React.FC = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const filtered = mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-700">
                    <FiArrowLeft /> Quay lại
                </button>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tin nhắn mới</h1>

                <div className="relative mb-4">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Tìm chuyên gia..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    {filtered.map(u => (
                        <button key={u.id} onClick={() => navigate(`/messages/${u.id}`)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left">
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
                                {u.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm">{u.name}</p>
                                <p className="text-xs text-gray-400">{u.role}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewMessagePage;
