import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';

const CreateGroupPage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', description: '', category: '', isPrivate: false });

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <FiUsers className="text-teal-500 w-6 h-6" />
                    <h1 className="text-2xl font-bold text-gray-800">Tạo nhóm mới</h1>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Tên nhóm *</label>
                        <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Nhập tên nhóm..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả</label>
                        <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Mô tả về nhóm của bạn..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Danh mục</label>
                        <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300">
                            <option value="">-- Chọn danh mục --</option>
                            <option>Lo âu & Stress</option>
                            <option>Trầm cảm</option>
                            <option>Mối quan hệ</option>
                            <option>Phát triển bản thân</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Nhóm riêng tư</p>
                            <p className="text-xs text-gray-400">Chỉ thành viên được chấp nhận mới có thể xem</p>
                        </div>
                        <button onClick={() => setForm(p => ({ ...p, isPrivate: !p.isPrivate }))} className={`relative w-11 h-6 rounded-full transition-colors ${form.isPrivate ? 'bg-teal-500' : 'bg-gray-200'}`}>
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isPrivate ? 'translate-x-5' : ''}`} />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button onClick={() => navigate(-1)} className="py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Hủy</button>
                        <button className="py-2.5 bg-teal-500 text-white rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors">Tạo nhóm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupPage;
