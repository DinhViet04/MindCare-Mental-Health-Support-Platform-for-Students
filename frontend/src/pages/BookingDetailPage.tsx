import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Objective {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface Document {
    id: string;
    name: string;
    type: 'pdf' | 'xlsx' | 'docx' | 'other';
}

interface BookingDetail {
    id: string;
    expertName: string;
    expertTitle: string;
    expertAvatar: string;
    expertCertification: string;
    date: string;
    startTime: string;
    endTime: string;
    timezone: string;
    type: 'video' | 'chat' | 'voice';
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    meetingLink?: string;
    amount: number;
    sessionLabel: string;
    objectives: Objective[];
    documents: Document[];
}

const BookingDetailPage: React.FC = () => {
    const [activeNav, setActiveNav] = useState<string>('overview');
    const [countdown, setCountdown] = useState({ days: 0, hours: 2, mins: 45, secs: 12 });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                let { days, hours, mins, secs } = prev;
                secs--;
                if (secs < 0) { secs = 59; mins--; }
                if (mins < 0) { mins = 59; hours--; }
                if (hours < 0) { hours = 23; days--; }
                if (days < 0) return prev;
                return { days, hours, mins, secs };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const booking: BookingDetail = {
        id: 'BK-8829',
        expertName: 'TS. Nguyễn Thị Lan',
        expertTitle: 'Chuyên gia Tâm lý lâm sàng',
        expertAvatar: 'https://i.pravatar.cc/150?img=47',
        expertCertification: 'Chứng chỉ Tâm lý trị liệu cấp cao',
        date: 'Thứ Năm, 24 tháng 10, 2024',
        startTime: '10:00',
        endTime: '11:00',
        timezone: 'ICT',
        type: 'video',
        status: 'confirmed',
        meetingLink: 'https://meet.google.com/abc-xyz',
        amount: 750000,
        sessionLabel: 'Buổi tư vấn chuyên sâu 60 phút',
        objectives: [
            {
                id: '1',
                title: 'Đánh giá tình trạng lo lắng học tập',
                description: 'Phân tích nguyên nhân và mức độ ảnh hưởng đến hiệu suất.',
                completed: true,
            },
            {
                id: '2',
                title: 'Xây dựng kế hoạch quản lý căng thẳng',
                description: 'Thảo luận về các kỹ thuật thở và mindfulness phù hợp.',
                completed: false,
            },
        ],
        documents: [
            { id: '1', name: 'Bảng_đánh_giá_tâm_lý.pdf', type: 'pdf' },
            { id: '2', name: 'Kế_hoạch_theo_dõi.xlsx', type: 'xlsx' },
        ],
    };

    const navItems = [
        { id: 'overview', label: 'Tổng quan buổi hẹn', icon: 'info' },
        { id: 'notes', label: 'Ghi chú buổi hẹn', icon: 'note_alt' },
        { id: 'resources', label: 'Tài liệu chia sẻ', icon: 'folder_shared' },
        { id: 'actions', label: 'Mục hành động', icon: 'checklist' },
        { id: 'history', label: 'Lịch sử chỉnh sửa', icon: 'history' },
    ];

    const pad = (n: number) => String(n).padStart(2, '0');

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    const getDocIcon = (type: string) => {
        if (type === 'pdf') return { icon: 'picture_as_pdf', color: 'text-red-500' };
        if (type === 'xlsx') return { icon: 'table_chart', color: 'text-green-600' };
        return { icon: 'description', color: 'text-blue-500' };
    };

    return (
        <div className="min-h-screen bg-[#f6f8f8] font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-10 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-[#13ecec]">
                        <svg width="24" height="24" fill="none" viewBox="0 0 48 48">
                            <path d="M8.578 8.578C5.528 11.628 3.451 15.515 2.61 19.745c-.842 4.231-.41 8.616 1.241 12.601 1.65 3.985 4.446 7.391 8.032 9.788C15.47 44.53 19.687 45.81 24 45.81s8.53-1.28 12.117-3.676c3.587-2.397 6.382-5.803 8.033-9.788 1.65-3.985 2.082-8.37 1.24-12.601-.841-4.23-2.918-8.117-5.968-11.167L24 24 8.578 8.578Z" fill="currentColor" />
                        </svg>
                        <span className="text-lg font-bold text-slate-900">MindCare</span>
                    </div>
                    <nav className="flex items-center gap-6">
                        <Link to="/dashboard" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Trang chủ</Link>
                        <Link to="/bookings" className="text-sm font-semibold text-[#13ecec]">Lịch hẹn</Link>
                        <Link to="/experts" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Chuyên gia</Link>
                        <Link to="/invoices" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Hóa đơn</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                    <button className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                    </button>
                    <img src="https://i.pravatar.cc/40?img=12" alt="User avatar" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                </div>
            </header>

            <main className="max-w-[1200px] mx-auto px-10 py-8 flex gap-8">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 flex flex-col gap-6">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 mb-1">Lịch hẹn #{booking.id}</h1>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#13ecec]" />
                            <p className="text-sm text-slate-500">Buổi hẹn đã xác nhận</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeNav === item.id
                                        ? 'bg-[#13ecec]/10 text-[#0bc8c8] font-semibold'
                                        : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span className="text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto p-4 bg-slate-100 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cần hỗ trợ?</p>
                        <p className="text-sm text-slate-500 mb-3">Có câu hỏi về lịch hẹn? Liên hệ đội hỗ trợ của chúng tôi.</p>
                        <button className="w-full py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                            Liên hệ hỗ trợ
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-6 min-w-0">
                    {/* Breadcrumb & Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Link to="/bookings" className="hover:text-[#13ecec] transition-colors">Lịch hẹn</Link>
                            <span>/</span>
                            <span className="text-slate-900 font-medium">{booking.expertName}</span>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-[16px]">download</span>
                                Hóa đơn
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#13ecec] text-slate-900 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                <span className="material-symbols-outlined text-[16px]">mail</span>
                                Nhắn tin chuyên gia
                            </button>
                        </div>
                    </div>

                    {/* Main Info Card */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-8 flex flex-col gap-8">
                            {/* Expert Info & Price */}
                            <div className="flex justify-between items-start">
                                <div className="flex gap-5">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#13ecec]/20 flex-shrink-0">
                                        <img src={booking.expertAvatar} alt={booking.expertName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h2 className="text-2xl font-black text-slate-900">{booking.expertName}</h2>
                                        <p className="text-slate-500 font-medium">{booking.expertTitle}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="material-symbols-outlined text-[#13ecec] text-[16px]">verified</span>
                                            <span className="text-sm font-semibold text-slate-700">{booking.expertCertification}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">Đã thanh toán</span>
                                    <p className="text-2xl font-bold text-slate-900">{formatCurrency(booking.amount)}</p>
                                    <p className="text-xs text-slate-400 italic">{booking.sessionLabel}</p>
                                </div>
                            </div>

                            {/* Date/Time & Countdown */}
                            <div className="grid grid-cols-2 gap-8 border-y border-slate-100 py-8">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ngày & Giờ</p>
                                            <p className="text-slate-900 font-semibold">{booking.date}</p>
                                            <p className="text-sm text-slate-500">{booking.startTime} - {booking.endTime} ({booking.timezone})</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">video_call</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hình thức</p>
                                            <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer" className="text-[#13ecec] font-semibold hover:underline flex items-center gap-1">
                                                Đường dẫn cuộc họp
                                                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                            </a>
                                            <p className="text-sm text-slate-400 italic">Mật khẩu trong chi tiết</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Countdown */}
                                <div className="flex flex-col gap-3">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phiên bắt đầu sau</p>
                                    <div className="flex gap-3">
                                        {[
                                            { label: 'Ngày', val: countdown.days },
                                            { label: 'Giờ', val: countdown.hours },
                                            { label: 'Phút', val: countdown.mins },
                                            { label: 'Giây', val: countdown.secs },
                                        ].map(({ label, val }) => (
                                            <div key={label} className="flex flex-col items-center flex-1 bg-slate-100 rounded-lg p-3">
                                                <span className="text-xl font-black text-slate-900">{pad(val)}</span>
                                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex gap-5">
                                    <Link to={`/bookings/${booking.id}/reschedule`} className="text-sm font-bold text-slate-600 hover:text-[#13ecec] transition-colors flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                                        Đặt lại lịch
                                    </Link>
                                    <Link to={`/bookings/${booking.id}/cancel`} className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">cancel</span>
                                        Hủy lịch hẹn
                                    </Link>
                                </div>
                                <button className="px-6 py-3 bg-[#13ecec] font-bold text-slate-900 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                                    <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                                    Vào phòng chờ
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Objectives */}
                    <div className="bg-white border border-slate-200 rounded-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Mục tiêu buổi hẹn</h3>
                            <button className="text-[#13ecec] text-sm font-bold flex items-center gap-1 hover:opacity-80 transition-opacity">
                                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                Thêm ghi chú
                            </button>
                        </div>
                        <ul className="space-y-4">
                            {booking.objectives.map(obj => (
                                <li key={obj.id} className="flex items-start gap-4">
                                    <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${obj.completed ? 'border-[#13ecec]' : 'border-slate-300'}`}>
                                        {obj.completed && <span className="material-symbols-outlined text-[#13ecec] text-[12px] font-black">check</span>}
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-medium">{obj.title}</p>
                                        <p className="text-sm text-slate-500">{obj.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Documents */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-[#13ecec]">description</span>
                                <h4 className="font-bold text-slate-900">Tài liệu chuẩn bị</h4>
                            </div>
                            <div className="space-y-3">
                                {booking.documents.map(doc => {
                                    const { icon, color } = getDocIcon(doc.type);
                                    return (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                                                <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-[#13ecec] transition-colors">download</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">upload_file</span>
                            <h4 className="font-bold text-slate-900 mb-1">Tải tài liệu lên</h4>
                            <p className="text-xs text-slate-500 mb-4">Chia sẻ tài liệu với chuyên gia trước buổi hẹn.</p>
                            <button className="px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:border-[#13ecec] hover:text-[#13ecec] transition-all">
                                Chọn tệp
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Google Fonts & Material Symbols */}
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        </div>
    );
};

export default BookingDetailPage;