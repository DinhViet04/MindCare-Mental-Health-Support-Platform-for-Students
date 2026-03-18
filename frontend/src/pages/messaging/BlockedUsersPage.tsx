import React from 'react';
import { FiUserX } from 'react-icons/fi';

const BlockedUsersPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Người dùng đã chặn</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 flex flex-col items-center text-center">
                <FiUserX className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">Chưa có người dùng nào bị chặn</p>
                <p className="text-gray-400 text-sm mt-1">Danh sách người dùng bạn đã chặn sẽ hiển thị ở đây.</p>
            </div>
        </div>
    </div>
);

export default BlockedUsersPage;
