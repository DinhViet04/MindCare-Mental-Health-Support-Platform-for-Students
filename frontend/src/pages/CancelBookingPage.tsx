import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CANCEL_REASONS = [
    { value: 'scheduling', label: 'Xung đột lịch trình' },
    { value: 'personal', label: 'Tình huống khẩn cấp cá nhân' },
    { value: 'changed-mind', label: 'Thay đổi quyết định' },
    { value: 'expert-request', label: 'Theo yêu cầu của chuyên gia' },
    { value: 'other', label: 'Lý do khác' },
];

const CancelBookingPage: React.FC = () => {
    const navigate = useNavigate();
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirm = () => {
        if (!reason) return;
        setConfirmed(true);
    };

    if (confirmed) {
        return (
            <div className="min-h-screen bg-[#f6f8f8] flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Đã hủy lịch hẹn</h2>
                    <p className="text-slate-500 mb-2">Lịch hẹn đã được hủy thành công.</p>
                    <p className="text-sm text-slate-400 mb-8">Hoàn tiền 100% sẽ được xử lý trong 3-5 ngày làm việc.</p>
                    <Link to="/bookings" className="block w-full py-3 bg-[#13ecec] text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Quay lại lịch hẹn
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f6f8f8] font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 lg:px-40 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-[#13ecec]">
                        <svg fill="none" viewBox="0 0 48 48"><path d="M8.578 8.578C5.528 11.628 3.451 15.515 2.61 19.745c-.842 4.231-.41 8.616 1.241 12.601 1.65 3.985 4.446 7.391 8.032 9.788C15.47 44.53 19.687 45.81 24 45.81s8.53-1.28 12.117-3.676c3.587-2.397 6.382-5.803 8.033-9.788 1.65-3.985 2.082-8.37 1.24-12.601-.841-4.23-2.918-8.117-5.968-11.167L24 24 8.578 8.578Z" fill="currentColor"/></svg>
                    </div>
                    <span className="text-lg font-bold text-slate-900">MindCare</span>
                </div>
                <nav className="hidden md:flex items-center gap-9">
                    <Link to="/dashboard" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Trang chủ</Link>
                    <Link to="/bookings" className="text-sm font-semibold text-slate-900">Lịch hẹn</Link>
                    <Link to="/experts" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Chuyên gia</Link>
                    <Link to="/messages" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Tin nhắn</Link>
                </nav>
                <img src="https://i.pravatar.cc/40?img=12" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#13ecec]/20 object-cover" />
            </header>

            <main className="px-6 lg:px-40 py-8 flex justify-center">
                <div className="w-full max-w-[800px] flex flex-col">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 mb-6 text-sm flex-wrap">
                        <Link to="/" className="text-[#13ecec] hover:underline">Trang chủ</Link>
                        <span className="text-slate-400">/</span>
                        <Link to="/bookings" className="text-[#13ecec] hover:underline">Lịch hẹn</Link>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-500">Hủy lịch hẹn</span>
                    </nav>

                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Hủy lịch hẹn</h1>
                        <p className="text-slate-600 text-lg">Vui lòng xem lại thông tin trước khi xác nhận hủy.</p>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('https://i.pravatar.cc/300?img=47')" }} />
                            <div className="flex flex-col justify-center p-6 gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#13ecec]/10 text-[#0bc8c8] w-fit">Buổi hẹn sắp tới</span>
                                <p className="text-xl font-bold text-slate-900">Tư vấn cùng TS. Nguyễn Thị Lan</p>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                    <p className="text-sm">24 tháng 10, 2023</p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                                    <p className="text-sm">10:00 - 11:00 (ICT)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Refund Policy */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex gap-4">
                        <span className="material-symbols-outlined text-amber-600 text-3xl flex-shrink-0">info</span>
                        <div>
                            <h3 className="text-amber-800 font-bold mb-1">Chính sách hoàn tiền</h3>
                            <p className="text-amber-700 text-sm leading-relaxed">
                                Hủy trước 24 giờ được hoàn tiền đầy đủ. Vì buổi hẹn của bạn còn 48 giờ, bạn sẽ nhận được{' '}
                                <span className="font-bold">hoàn tiền 100% (750.000 ₫)</span> về phương thức thanh toán ban đầu.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-bold text-slate-900" htmlFor="reason">Lý do hủy lịch</label>
                            <p className="text-sm text-slate-500">Giúp chúng tôi cải thiện dịch vụ bằng cách cho biết lý do.</p>
                            <select
                                id="reason"
                                value={reason}
                                onChange={e => setReason(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg text-slate-700 focus:border-[#13ecec] focus:ring-[#13ecec] p-3 outline-none"
                            >
                                <option value="">Chọn lý do</option>
                                {CANCEL_REASONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-900" htmlFor="message">Ghi chú thêm (tùy chọn)</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                rows={4}
                                placeholder="Cho TS. Nguyễn Thị Lan biết thêm về tình huống của bạn..."
                                className="w-full bg-white border border-slate-200 rounded-lg text-slate-700 focus:border-[#13ecec] focus:ring-[#13ecec] p-3 outline-none resize-none"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                            <button
                                onClick={handleConfirm}
                                disabled={!reason}
                                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">event_busy</span>
                                Xác nhận hủy lịch
                            </button>
                            <Link
                                to="/bookings"
                                className="flex-1 px-6 py-3 bg-[#13ecec]/10 hover:bg-[#13ecec]/20 text-slate-900 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#13ecec]/30"
                            >
                                <span className="material-symbols-outlined">event_available</span>
                                Giữ lịch hẹn
                            </Link>
                        </div>
                        <p className="text-center text-slate-400 text-xs">
                            Bằng cách nhấn "Xác nhận hủy lịch", lịch hẹn sẽ bị xóa và quá trình hoàn tiền sẽ được khởi tạo.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 lg:px-40 py-10 border-t border-slate-200 bg-white mt-8">
                <div className="max-w-[800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-sm font-semibold text-slate-400 opacity-50">MindCare © 2024</span>
                    <div className="flex gap-6">
                        <Link to="#" className="text-slate-400 text-xs hover:text-[#13ecec] transition-colors">Chính sách bảo mật</Link>
                        <Link to="#" className="text-slate-400 text-xs hover:text-[#13ecec] transition-colors">Điều khoản dịch vụ</Link>
                        <Link to="#" className="text-slate-400 text-xs hover:text-[#13ecec] transition-colors">Trung tâm hỗ trợ</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CancelBookingPage;