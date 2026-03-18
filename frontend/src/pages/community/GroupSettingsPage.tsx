import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSettings, FiTrash2, FiUserMinus } from 'react-icons/fi';

const GroupSettingsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <FiSettings className="text-teal-500 w-6 h-6" />
                    <h1 className="text-2xl font-bold text-gray-800">Cài đặt nhóm</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    <button onClick={() => navigate(`/community/groups/${id}/edit`)} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left">
                        <FiSettings className="text-gray-400" />
                        <span className="text-sm text-gray-700">Chỉnh sửa thông tin nhóm</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left">
                        <FiUserMinus className="text-orange-400" />
                        <span className="text-sm text-gray-700">Quản lý thành viên</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-colors text-left">
                        <FiTrash2 className="text-red-400" />
                        <span className="text-sm text-red-600">Xóa nhóm</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupSettingsPage;
