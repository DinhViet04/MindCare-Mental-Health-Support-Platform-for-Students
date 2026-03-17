import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiPlus } from 'react-icons/fi';

const mockGroups = [
    { id: '1', name: 'Nhóm hỗ trợ lo âu', members: 128, role: 'Quản trị viên' },
    { id: '2', name: 'Vượt qua trầm cảm', members: 95, role: 'Thành viên' },
    { id: '3', name: 'Mindfulness 365', members: 240, role: 'Thành viên' },
];

const MyGroupsPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Nhóm của tôi</h1>
                <Link to="/community/groups/create" className="bg-teal-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal-600 transition-colors flex items-center gap-2">
                    <FiPlus /> Tạo nhóm
                </Link>
            </div>

            <div className="space-y-3">
                {mockGroups.map(g => (
                    <Link key={g.id} to={`/community/groups/${g.id}`} className="block bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                                <FiUsers className="text-teal-500 w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{g.name}</p>
                                <p className="text-xs text-gray-400">{g.members} thành viên · {g.role}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default MyGroupsPage;
