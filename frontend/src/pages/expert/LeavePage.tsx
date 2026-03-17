import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type LeaveType = 'planned' | 'emergency';

interface LeaveRecord {
    period: string;
    type: string;
    duration: string;
    status: 'approved' | 'pending' | 'rejected';
}

const HISTORY: LeaveRecord[] = [
    { period: '12 - 15 tháng 8, 2023', type: 'Kế hoạch', duration: '4 ngày', status: 'approved' },
    { period: '02 - 03 tháng 6, 2023', type: 'Khẩn cấp', duration: '2 ngày', status: 'approved' },
    { period: '10 - 15 tháng 1, 2023', type: 'Kế hoạch', duration: '6 ngày', status: 'approved' },
];

const generateDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { day: number | null }[] = [];
    for (let i = 0; i < firstDay; i++) cells.push({ day: null });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });
    return cells;
};

const MONTH_NAMES = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];

interface MonthCalendarProps {
    year: number;
    month: number;
    rangeStart: number | null;
    rangeEnd: number | null;
    currentMonthIndex: number;
    onDayClick: (day: number, monthIndex: number) => void;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ year, month, rangeStart, rangeEnd, currentMonthIndex, onDayClick }) => {
    const cells = generateDays(year, month);
    return (
        <div className="flex-1 min-w-[280px]">
            <h4 className="text-center font-bold text-[#13ecec] mb-2">{MONTH_NAMES[month]}</h4>
            <div className="grid grid-cols-7 gap-1">
                {['CN','T2','T3','T4','T5','T6','T7'].map(d => (
                    <p key={d} className="text-xs font-bold text-center py-2 opacity-50">{d}</p>
                ))}
                {cells.map((cell, i) => {
                    if (!cell.day) return <div key={i} className="h-10" />;
                    const isStart = rangeStart === cell.day && currentMonthIndex === 0;
                    const isEnd = rangeEnd === cell.day && currentMonthIndex === 1;
                    const inRange = rangeStart !== null && rangeEnd !== null && cell.day >= rangeStart && cell.day <= rangeEnd;
                    return (
                        <button
                            key={i}
                            onClick={() => onDayClick(cell.day!, currentMonthIndex)}
                            className={`h-10 w-full text-sm font-medium rounded-lg transition-colors
                                ${isStart || isEnd ? 'bg-[#13ecec] text-slate-900' :
                                inRange ? 'bg-[#13ecec]/20' :
                                'hover:bg-[#13ecec]/20'}`}
                        >
                            {cell.day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const LeavePage: React.FC = () => {
    const [leaveType, setLeaveType] = useState<LeaveType>('planned');
    const [notifyClients, setNotifyClients] = useState(true);
    const [rangeStart, setRangeStart] = useState<number | null>(5);
    const [rangeEnd, setRangeEnd] = useState<number | null>(null);
    const [currentBaseMonth, setCurrentBaseMonth] = useState(9); // October = index 9

    const usedDays = 12;
    const totalDays = 45;
    const usedPercent = (usedDays / totalDays) * 100;

    const handleDayClick = (day: number, monthIdx: number) => {
        if (monthIdx === 0) {
            setRangeStart(day);
            setRangeEnd(null);
        } else {
            setRangeEnd(day);
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f8f8] font-sans">
            {/* Header */}
            <header className="border-b border-[#13ecec]/20 bg-[#f6f8f8] px-10 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#13ecec] text-3xl">verified_user</span>
                        <span className="text-lg font-bold text-slate-900">MindCare</span>
                    </div>
                    <div className="flex w-56 h-10 rounded-lg overflow-hidden">
                        <div className="bg-[#13ecec]/10 flex items-center pl-3 text-[#13ecec]/70">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="flex-1 bg-[#13ecec]/10 border-none outline-none text-sm px-2 placeholder:text-[#13ecec]/70" placeholder="Tìm kiếm" />
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <nav className="flex items-center gap-9">
                        <Link to="/dashboard" className="text-sm text-slate-700 hover:text-[#13ecec] transition-colors">Trang chủ</Link>
                        <Link to="/clients" className="text-sm text-slate-700 hover:text-[#13ecec] transition-colors">Khách hàng</Link>
                        <Link to="/availability" className="text-sm text-slate-700 hover:text-[#13ecec] transition-colors">Lịch trống</Link>
                        <Link to="/earnings" className="text-sm text-slate-700 hover:text-[#13ecec] transition-colors">Thu nhập</Link>
                    </nav>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-lg bg-[#13ecec]/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-900">notifications</span>
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-[#13ecec]/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-900">settings</span>
                        </button>
                    </div>
                    <img src="https://i.pravatar.cc/40?img=52" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#13ecec]" />
                </div>
            </header>

            <main className="flex justify-center py-10 px-4">
                <div className="w-full max-w-[1024px] flex flex-col">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Xin nghỉ phép</h1>
                        <p className="text-[#13ecec]/80 text-base">Đặt thời gian nghỉ và quản lý xung đột lịch hẹn hiệu quả.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Calendar */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#13ecec]/10 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <button onClick={() => setCurrentBaseMonth(m => Math.max(0, m - 1))} className="hover:text-[#13ecec] transition-colors">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <p className="text-lg font-bold text-center flex-1">
                                    {MONTH_NAMES[currentBaseMonth]} - {MONTH_NAMES[(currentBaseMonth + 1) % 12]} 2023
                                </p>
                                <button onClick={() => setCurrentBaseMonth(m => Math.min(10, m + 1))} className="hover:text-[#13ecec] transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                            <div className="flex gap-8 overflow-x-auto pb-4">
                                <MonthCalendar year={2023} month={currentBaseMonth} rangeStart={rangeStart} rangeEnd={rangeEnd} currentMonthIndex={0} onDayClick={handleDayClick} />
                                <MonthCalendar year={2023} month={(currentBaseMonth + 1) % 12} rangeStart={rangeStart} rangeEnd={rangeEnd} currentMonthIndex={1} onDayClick={handleDayClick} />
                            </div>
                        </div>

                        {/* Options Panel */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-white p-6 rounded-xl border border-[#13ecec]/10 shadow-sm">
                                <h3 className="text-lg font-bold mb-4 text-slate-900">Chi tiết nghỉ phép</h3>
                                <div className="flex flex-col gap-6">
                                    {/* Leave Type Toggle */}
                                    <div>
                                        <span className="text-sm font-semibold opacity-70 mb-2 block">Loại nghỉ phép</span>
                                        <div className="flex h-11 items-center rounded-lg bg-[#13ecec]/10 p-1">
                                            {([['planned', 'Kế hoạch'], ['emergency', 'Khẩn cấp']] as [LeaveType, string][]).map(([val, label]) => (
                                                <button
                                                    key={val}
                                                    onClick={() => setLeaveType(val)}
                                                    className={`flex-1 h-full rounded-lg text-sm font-bold transition-all ${leaveType === val ? 'bg-white shadow-sm text-[#13ecec]' : 'text-slate-600'}`}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Selected Range */}
                                    <div>
                                        <span className="text-sm font-semibold opacity-70 mb-2 block">Khoảng thời gian</span>
                                        <div className="flex items-center gap-3 bg-[#13ecec]/5 p-3 rounded-lg border border-[#13ecec]/10">
                                            <span className="material-symbols-outlined text-[#13ecec]">calendar_month</span>
                                            <div className="text-sm">
                                                <p className="font-bold">
                                                    {rangeStart ? `Ngày ${rangeStart}` : 'Chọn ngày bắt đầu'}{' '}
                                                    {rangeEnd ? `— Ngày ${rangeEnd}` : ''}
                                                </p>
                                                <p className="opacity-70">
                                                    {rangeStart && rangeEnd ? `${rangeEnd - rangeStart + 1} ngày tổng cộng` : 'Chưa chọn'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Conflict Warning */}
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                        <div className="flex gap-3 text-amber-700 mb-3">
                                            <span className="material-symbols-outlined">warning</span>
                                            <div className="text-sm">
                                                <p className="font-bold">Phát hiện xung đột lịch</p>
                                                <p>Bạn có 3 lịch hẹn đã xác nhận trong thời gian này.</p>
                                            </div>
                                        </div>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" checked={notifyClients} onChange={e => setNotifyClients(e.target.checked)} className="w-4 h-4 text-amber-600 rounded" />
                                            <span className="text-xs font-medium text-amber-800">Tự động thông báo cho khách hàng bị ảnh hưởng</span>
                                        </label>
                                    </div>

                                    <button className="w-full bg-[#13ecec] hover:bg-[#13ecec]/90 text-slate-900 font-bold py-3 rounded-lg shadow-lg shadow-[#13ecec]/20 transition-all">
                                        Xác nhận nghỉ phép
                                    </button>
                                    <button className="w-full text-slate-500 font-bold py-2 rounded-lg hover:bg-slate-100 transition-all">
                                        Hủy
                                    </button>
                                </div>
                            </div>

                            {/* Leave Entitlement */}
                            <div className="bg-[#13ecec]/5 p-6 rounded-xl border border-[#13ecec]/10">
                                <h4 className="font-bold mb-3 flex items-center gap-2 text-slate-900">
                                    <span className="material-symbols-outlined text-[#13ecec]">info</span>
                                    Quyền nghỉ phép
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Giới hạn hàng năm:</span>
                                        <span className="font-bold">{totalDays} ngày</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Đã sử dụng:</span>
                                        <span className="font-bold">{usedDays} ngày</span>
                                    </div>
                                    <div className="h-2 w-full bg-[#13ecec]/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#13ecec] rounded-full" style={{ width: `${usedPercent}%` }} />
                                    </div>
                                    <p className="text-[11px] opacity-60 italic text-center">Còn lại: {totalDays - usedDays} ngày</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* History Table */}
                    <div className="mt-12 bg-white p-6 rounded-xl border border-[#13ecec]/10 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 text-slate-900">Lịch sử nghỉ phép</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[#13ecec]/10">
                                        {['Khoảng thời gian','Loại','Thời lượng','Trạng thái'].map(h => (
                                            <th key={h} className="py-3 px-4 text-xs font-bold uppercase opacity-50">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {HISTORY.map((row, i) => (
                                        <tr key={i} className="border-b border-[#13ecec]/5 hover:bg-[#13ecec]/5 transition-colors">
                                            <td className="py-4 px-4 text-sm font-medium">{row.period}</td>
                                            <td className="py-4 px-4 text-sm">{row.type}</td>
                                            <td className="py-4 px-4 text-sm">{row.duration}</td>
                                            <td className="py-4 px-4 text-sm">
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Đã duyệt</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LeavePage;