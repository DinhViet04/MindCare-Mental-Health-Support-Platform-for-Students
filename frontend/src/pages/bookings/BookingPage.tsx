import React from 'react';
import { Link } from 'react-router-dom';

const BookingPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Đặt lịch tư vấn</h1>
            <p className="text-gray-500 mb-8">Chọn chuyên gia và thời gian phù hợp với bạn</p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên gia</label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300">
                        <option>-- Chọn chuyên gia --</option>
                        <option>Dr. Nguyễn Minh Tuấn</option>
                        <option>Dr. Lê Thị Hoa</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày hẹn</label>
                    <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giờ hẹn</label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300">
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hình thức tư vấn</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['Video Call', 'Chat'].map(type => (
                            <button key={type} className="py-2.5 px-4 border border-teal-300 text-teal-600 rounded-xl text-sm font-medium hover:bg-teal-50 transition-colors">
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                    <textarea rows={3} placeholder="Mô tả vấn đề bạn muốn tư vấn..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none" />
                </div>
                <Link to="/checkout">
                    <button className="w-full py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors">
                        Tiếp tục xác nhận
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

export default BookingPage;
