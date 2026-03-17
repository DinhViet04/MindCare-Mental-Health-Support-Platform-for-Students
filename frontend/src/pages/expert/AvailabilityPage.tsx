import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'working' | 'blocked' | 'recurring';

interface TimeBlock {
    day: number; // 0=Mon..6=Sun
    startSlot: number; // 0=08:00, 1=09:00...
    endSlot: number;
    type: 'working' | 'blocked';
    label: string;
    detail?: string;
}

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const DAY_DATES = [12, 13, 14, 15, 16, 17, 18];
const TODAY_COL = 2; // Wednesday
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
const SLOT_HEIGHT = 64; // px per hour

const TIME_BLOCKS: TimeBlock[] = [
    { day: 0, startSlot: 1, endSlot: 3, type: 'working', label: '09:00 - 11:00', detail: 'Làm việc' },
    { day: 1, startSlot: 2, endSlot: 5, type: 'working', label: '10:00 - 13:00', detail: 'Làm việc' },
    { day: 2, startSlot: 1, endSlot: 5, type: 'working', label: '09:00 - 13:00', detail: 'Làm việc' },
    { day: 3, startSlot: 3, endSlot: 5, type: 'blocked', label: '11:00 - 13:00', detail: 'Bị chặn: Phòng khám' },
    { day: 4, startSlot: 1, endSlot: 6, type: 'working', label: '09:00 - 14:00', detail: 'Làm việc' },
];

const NAV_ITEMS = [
    { id: 'weekly', label: 'Lịch tuần', icon: 'calendar_today', active: true },
    { id: 'holiday', label: 'Kế hoạch nghỉ', icon: 'beach_access' },
    { id: 'buffer', label: 'Quy tắc đệm', icon: 'timer' },
    { id: 'session', label: 'Cài đặt buổi hẹn', icon: 'settings_suggest' },
    { id: 'integrations', label: 'Tích hợp', icon: 'sync' },
];

const AvailabilityPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('working');
    const [maxBookings, setMaxBookings] = useState(8);
    const [bufferBefore, setBufferBefore] = useState('15 phút');
    const [bufferAfter, setBufferAfter] = useState('15 phút');
    const [recurring, setRecurring] = useState(true);

    return (
        <div className="min-h-screen bg-[#f6f8f8] font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-10 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 text-[#13ecec]">
                            <svg fill="none" viewBox="0 0 48 48"><path d="M8.578 8.578C5.528 11.628 3.451 15.515 2.61 19.745c-.842 4.231-.41 8.616 1.241 12.601 1.65 3.985 4.446 7.391 8.032 9.788C15.47 44.53 19.687 45.81 24 45.81s8.53-1.28 12.117-3.676c3.587-2.397 6.382-5.803 8.033-9.788 1.65-3.985 2.082-8.37 1.24-12.601-.841-4.23-2.918-8.117-5.968-11.167L24 24 8.578 8.578Z" fill="currentColor"/></svg>
                        </div>
                        <span className="text-xl font-bold text-slate-900">MindCare</span>
                    </div>
                    <div className="flex w-56 h-10 rounded-lg overflow-hidden">
                        <div className="bg-slate-100 flex items-center pl-3 text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="flex-1 bg-slate-100 border-none outline-none text-sm px-2 placeholder:text-slate-400" placeholder="Tìm lịch hẹn..." />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-6">
                        <Link to="/dashboard" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Trang chủ</Link>
                        <Link to="/availability" className="text-sm font-bold text-[#13ecec]">Lịch trống</Link>
                        <Link to="/bookings" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Lịch hẹn</Link>
                        <Link to="/clients" className="text-sm text-slate-600 hover:text-[#13ecec] transition-colors">Khách hàng</Link>
                    </nav>
                    <div className="h-6 w-px bg-slate-200" />
                    <button className="px-4 py-2 rounded-lg bg-[#13ecec] text-slate-900 text-sm font-bold">Cài đặt hồ sơ</button>
                    <img src="https://i.pravatar.cc/40?img=52" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#13ecec]" />
                </div>
            </header>

            <main className="flex gap-6 p-10 max-w-[1440px] mx-auto w-full">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 flex flex-col gap-6">
                    <div>
                        <h1 className="text-slate-900 text-lg font-bold">Quản lý lịch trống</h1>
                        <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Tuần này</p>
                    </div>
                    <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.map(item => (
                            <a key={item.id} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${item.active ? 'bg-[#13ecec]/10 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <span className={`material-symbols-outlined ${item.active ? 'text-[#13ecec]' : ''}`}>{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    {/* Max Bookings */}
                    <div className="p-4 rounded-xl bg-slate-900 text-white">
                        <p className="text-sm font-bold mb-2">Tối đa lịch hẹn/ngày</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-[#13ecec]">{String(maxBookings).padStart(2, '0')}</span>
                            <div className="flex gap-1">
                                <button onClick={() => setMaxBookings(v => Math.max(1, v - 1))} className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center">-</button>
                                <button onClick={() => setMaxBookings(v => v + 1)} className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center">+</button>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">Giới hạn số buổi mỗi ngày để tránh quá tải.</p>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900">Lịch làm việc</h2>
                            <p className="text-slate-500">Nhấp và kéo để xác định giờ làm việc cho từng ngày trong tuần.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 rounded-lg bg-slate-200 font-bold text-sm">Hủy</button>
                            <button className="px-5 py-2.5 rounded-lg bg-[#13ecec] text-slate-900 font-bold text-sm shadow-lg shadow-[#13ecec]/20">Lưu thay đổi</button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 gap-8 px-2">
                        {[{id: 'working', label: 'Giờ làm việc'}, {id: 'blocked', label: 'Thời gian bị chặn'}, {id: 'recurring', label: 'Quy tắc lặp'}].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-[#13ecec] font-bold text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        {/* Day Headers */}
                        <div className="grid grid-cols-8 border-b border-slate-200">
                            <div className="p-4 border-r border-slate-200" />
                            {DAYS.map((day, i) => (
                                <div key={day} className={`p-4 text-center border-r border-slate-200 last:border-r-0 ${i === TODAY_COL ? 'bg-[#13ecec]/5' : i >= 5 ? 'bg-slate-50' : ''}`}>
                                    <p className={`text-xs font-bold uppercase ${i === TODAY_COL ? 'text-[#13ecec]' : 'text-slate-400'}`}>{day}</p>
                                    <p className={`text-lg font-black ${i === TODAY_COL ? 'text-[#13ecec]' : ''}`}>{DAY_DATES[i]}</p>
                                </div>
                            ))}
                        </div>

                        {/* Time Grid */}
                        <div className="relative overflow-y-auto" style={{ height: 500 }}>
                            <div className="grid grid-cols-8">
                                {/* Hour labels */}
                                <div className="border-r border-slate-200">
                                    {HOURS.map(h => (
                                        <div key={h} style={{ height: SLOT_HEIGHT }} className="border-b border-slate-100 flex justify-center items-start pt-2">
                                            <span className="text-[10px] font-bold text-slate-400">{h}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Day columns */}
                                {DAYS.map((_, dayIdx) => (
                                    <div key={dayIdx} className={`relative border-r border-slate-100 last:border-r-0 ${dayIdx >= 5 ? 'bg-slate-50/50' : ''}`} style={{ height: SLOT_HEIGHT * HOURS.length }}>
                                        {/* Grid lines */}
                                        {HOURS.map((_, hi) => <div key={hi} className="border-b border-slate-100" style={{ height: SLOT_HEIGHT }} />)}
                                        {/* Time blocks */}
                                        {TIME_BLOCKS.filter(b => b.day === dayIdx).map((block, bi) => (
                                            <div
                                                key={bi}
                                                className={`absolute left-1 right-1 rounded p-2 overflow-hidden cursor-move group ${block.type === 'working' ? 'bg-[#13ecec]/20 border-l-4 border-[#13ecec]' : 'bg-rose-500/20 border-l-4 border-rose-500 cursor-not-allowed'}`}
                                                style={{ top: block.startSlot * SLOT_HEIGHT, height: (block.endSlot - block.startSlot) * SLOT_HEIGHT }}
                                            >
                                                <p className="text-[10px] font-bold text-slate-800">{block.label}</p>
                                                <p className="text-[9px] text-slate-500">{block.detail}</p>
                                                <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Settings Cards */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white rounded-xl border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-[#13ecec]">timer</span>
                                <h3 className="font-bold text-slate-900">Khoảng đệm buổi hẹn</h3>
                            </div>
                            <div className="space-y-4">
                                {[{label: 'Trước buổi hẹn', val: bufferBefore, set: setBufferBefore}, {label: 'Sau buổi hẹn', val: bufferAfter, set: setBufferAfter}].map(item => (
                                    <div key={item.label} className="flex justify-between items-center">
                                        <span className="text-sm text-slate-600">{item.label}</span>
                                        <select value={item.val} onChange={e => item.set(e.target.value)} className="text-sm rounded-lg bg-slate-50 border-none focus:ring-[#13ecec] p-1.5">
                                            {['Không', '5 phút', '15 phút', '30 phút'].map(o => <option key={o}>{o}</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-[#13ecec]">event_repeat</span>
                                <h3 className="font-bold text-slate-900">Cài đặt lặp lịch</h3>
                            </div>
                            <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={recurring}
                                    onChange={e => setRecurring(e.target.checked)}
                                    className="w-4 h-4 text-[#13ecec] mt-0.5"
                                />
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Áp dụng mặc định hàng tuần</p>
                                    <p className="text-xs text-slate-500">Lịch này sẽ lặp lại hàng tuần cho đến khi thay đổi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AvailabilityPage;