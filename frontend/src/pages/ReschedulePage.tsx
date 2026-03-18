import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface TimeSlot {
    time: string;
    available: boolean;
}

const DAYS_OF_WEEK = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const TIME_SLOTS: TimeSlot[] = [
    { time: '09:00 SA', available: true },
    { time: '10:30 SA', available: true },
    { time: '11:00 SA', available: true },
    { time: '02:00 CH', available: true },
    { time: '03:30 CH', available: true },
    { time: '04:00 CH', available: true },
];

const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const cells: { day: number; currentMonth: boolean; isWeekend: boolean }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
        cells.push({ day: prevMonthDays - i, currentMonth: false, isWeekend: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const dow = new Date(year, month, d).getDay();
        cells.push({ day: d, currentMonth: true, isWeekend: dow === 0 || dow === 6 });
    }
    return cells;
};

const MONTH_NAMES = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

const ReschedulePage: React.FC = () => {
    const navigate = useNavigate();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(7);
    const [selectedSlot, setSelectedSlot] = useState<string>('10:30 SA');
    const [note, setNote] = useState('');

    const cells = generateCalendar(currentYear, currentMonth);

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };

    return (
        <div className="min-h-screen bg-[#f6f8f8] font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-10 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#13ecec] rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-900 text-[20px]">bolt</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">MindCare</span>
                </div>
                <nav className="flex items-center gap-8">
                    <Link to="/dashboard" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Trang chủ</Link>
                    <Link to="/bookings" className="text-sm font-semibold text-[#13ecec]">Lịch hẹn</Link>
                    <Link to="/experts" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Chuyên gia</Link>
                    <Link to="/messages" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Tin nhắn</Link>
                </nav>
                <img src="https://i.pravatar.cc/40?img=12" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#13ecec]" />
            </header>

            <main className="px-4 md:px-20 lg:px-40 py-8 flex justify-center">
                <div className="w-full max-w-[1200px] flex flex-col">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 mb-6 text-sm">
                        <Link to="/bookings" className="text-slate-500 hover:text-[#13ecec] transition-colors">Lịch hẹn của tôi</Link>
                        <span className="material-symbols-outlined text-slate-400 text-[16px]">chevron_right</span>
                        <span className="text-slate-900 font-medium">Đặt lại lịch hẹn</span>
                    </nav>

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Đặt lại lịch hẹn</h1>
                        <p className="text-slate-500 text-lg">Điều chỉnh buổi hẹn sắp tới của bạn với chuyên gia tư vấn.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Current Booking Card */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-4 text-slate-900">Chi tiết lịch hẹn hiện tại</h3>
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src="https://i.pravatar.cc/64?img=47" alt="expert" className="w-16 h-16 rounded-full border-2 border-[#13ecec]/20 object-cover" />
                                        <div>
                                            <p className="font-bold text-slate-900">TS. Nguyễn Thị Lan</p>
                                            <p className="text-sm text-slate-500">Chuyên gia Tâm lý lâm sàng</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#13ecec]">event</span>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ngày</p>
                                                <p className="font-medium text-slate-900">Thứ Ba, 24/10/2023</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#13ecec]">schedule</span>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Giờ</p>
                                                <p className="font-medium text-slate-900">14:00 - 15:00 (ICT)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#13ecec]/5 p-4 border-t border-slate-200">
                                    <p className="text-sm text-slate-600 italic">"Buổi tư vấn về lo lắng học tập và kế hoạch quản lý căng thẳng."</p>
                                </div>
                            </div>

                            {/* Note */}
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-bold text-slate-900" htmlFor="note">Ghi chú cho chuyên gia</label>
                                <textarea
                                    id="note"
                                    value={note}
                                    onChange={e => setNote(e.target.value)}
                                    rows={4}
                                    placeholder="Giải thích ngắn gọn lý do bạn muốn đặt lại lịch..."
                                    className="w-full rounded-lg border border-slate-200 bg-white focus:ring-[#13ecec] focus:border-[#13ecec] text-slate-700 p-3 outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                {/* Calendar Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">Chọn ngày & giờ mới</h3>
                                    <div className="flex gap-2">
                                        <button onClick={prevMonth} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                                            <span className="material-symbols-outlined">chevron_left</span>
                                        </button>
                                        <button onClick={nextMonth} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar */}
                                <div className="mb-8">
                                    <p className="text-center font-bold mb-4 text-slate-900">{MONTH_NAMES[currentMonth]} {currentYear}</p>
                                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
                                        {DAYS_OF_WEEK.map(d => <div key={d}>{d}</div>)}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {cells.map((cell, i) => (
                                            <button
                                                key={i}
                                                onClick={() => cell.currentMonth && !cell.isWeekend && setSelectedDay(cell.day)}
                                                disabled={!cell.currentMonth || cell.isWeekend}
                                                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                                                    ${!cell.currentMonth || cell.isWeekend ? 'text-slate-300 cursor-not-allowed' :
                                                        selectedDay === cell.day ? 'bg-[#13ecec] text-slate-900 font-bold' :
                                                            'hover:bg-[#13ecec]/20'}`}
                                            >
                                                {cell.day}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div>
                                    <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-900">
                                        Khung giờ trống {selectedDay ? `- Ngày ${selectedDay}` : ''}
                                        <span className="text-xs font-normal text-slate-500">(ICT)</span>
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {TIME_SLOTS.map(slot => (
                                            <button
                                                key={slot.time}
                                                onClick={() => setSelectedSlot(slot.time)}
                                                className={`py-3 px-4 rounded-lg text-center font-medium transition-all text-sm
                                                    ${selectedSlot === slot.time
                                                        ? 'border-2 border-[#13ecec] bg-[#13ecec]/10 font-bold text-slate-900'
                                                        : 'border border-slate-200 hover:border-[#13ecec] hover:bg-[#13ecec]/5'
                                                    }`}
                                            >
                                                {slot.time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-4 pt-2">
                                <Link to="/bookings" className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                                    Hủy
                                </Link>
                                <button onClick={() => navigate('/bookings/1')} className="px-8 py-3 rounded-xl bg-[#13ecec] text-slate-900 font-bold shadow-lg shadow-[#13ecec]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    Xác nhận đặt lại lịch
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Support Banner */}
                    <div className="mt-12 p-6 rounded-xl bg-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#13ecec]/20 flex items-center justify-center text-[#13ecec]">
                                <span className="material-symbols-outlined">help_outline</span>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">Cần hỗ trợ đặt lại lịch?</p>
                                <p className="text-sm text-slate-500">Đội hỗ trợ của chúng tôi luôn sẵn sàng 24/7.</p>
                            </div>
                        </div>
                        <button className="text-[#13ecec] font-bold hover:underline">Liên hệ hỗ trợ</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReschedulePage;