import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiStar, FiMapPin, FiGlobe, FiMessageSquare, FiCalendar,
    FiCheck, FiChevronLeft, FiChevronRight, FiHeart, FiShare2,
    FiClock, FiAward, FiBriefcase, FiUsers
} from 'react-icons/fi';

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MONTHS = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

const reviews = [
    { id: 1, name: 'Nguyễn Thị Mai', date: '15 Tháng 10, 2023', rating: 5, text: 'Bác sĩ rất tận tâm và lắng nghe. Tôi cảm thấy được hiểu và hỗ trợ đúng cách.' },
    { id: 2, name: 'Trần Văn Hùng', date: '08 Tháng 10, 2023', rating: 5, text: 'Phương pháp trị liệu hiệu quả, chuyên nghiệp và dễ tiếp cận.' },
    { id: 3, name: 'Lê Thu Hà', date: '01 Tháng 10, 2023', rating: 4, text: 'Rất hài lòng với buổi tư vấn, sẽ quay lại.' },
];

const services = [
    { name: 'Trị liệu nhận thức hành vi (CBT)', duration: '50 phút', price: 850000 },
    { name: 'Tư vấn lo âu & stress', duration: '50 phút', price: 750000 },
    { name: 'Trị liệu cặp đôi', duration: '80 phút', price: 1200000 },
    { name: 'Tư vấn hướng nghiệp', duration: '50 phút', price: 650000 },
];

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const ExpertDetailPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2023, 10));
    const [selectedDay, setSelectedDay] = useState<number | null>(15);
    const [saved, setSaved] = useState(false);

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8">

                {/* Breadcrumb */}
                <nav className="flex gap-2 mb-6 text-sm">
                    <Link to="/" className="text-primary font-medium hover:underline">Trang chủ</Link>
                    <span className="text-slate-400">/</span>
                    <Link to="/experts" className="text-primary font-medium hover:underline">Chuyên gia</Link>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-500">TS. Nguyễn Thị Hoa</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Profile Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
                            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5" />
                            <div className="px-6 pb-6">
                                <div className="flex flex-col sm:flex-row gap-4 -mt-12 items-end sm:items-start">
                                    <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-900 overflow-hidden shadow-lg shrink-0">
                                        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                                            NH
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0 pb-1">
                                        <div className="flex flex-wrap justify-between gap-3 items-start">
                                            <div>
                                                <h1 className="text-2xl font-bold">TS. Nguyễn Thị Hoa</h1>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm">Tiến sĩ Tâm lý học lâm sàng</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setSaved(!saved)}
                                                    className={`p-2 rounded-lg border transition-colors ${saved ? 'border-rose-500 text-rose-500' : 'border-primary/20 text-slate-500 hover:border-rose-400'}`}
                                                >
                                                    <FiHeart className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
                                                </button>
                                                <button className="p-2 rounded-lg border border-primary/20 text-slate-500 hover:border-primary/50 transition-colors">
                                                    <FiShare2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1.5"><FiMapPin className="w-4 h-4 text-primary" />TP. Hồ Chí Minh</span>
                                            <span className="flex items-center gap-1.5"><FiGlobe className="w-4 h-4 text-primary" />Tiếng Việt, Tiếng Anh</span>
                                            <span className="flex items-center gap-1.5"><FiStar className="w-4 h-4 text-primary fill-primary" />4.9 (142 đánh giá)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary/10">
                                    {[
                                        { icon: <FiBriefcase className="w-5 h-5" />, value: '12+', label: 'Năm kinh nghiệm' },
                                        { icon: <FiUsers className="w-5 h-5" />, value: '500+', label: 'Khách hàng' },
                                        { icon: <FiAward className="w-5 h-5" />, value: '8', label: 'Chứng chỉ' },
                                    ].map((s, i) => (
                                        <div key={i} className="text-center">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-2">
                                                {s.icon}
                                            </div>
                                            <p className="text-xl font-bold">{s.value}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm">
                            <div className="flex border-b border-primary/10">
                                {(['about', 'services', 'reviews'] as const).map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === tab
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        {tab === 'about' ? 'Giới thiệu' : tab === 'services' ? 'Dịch vụ' : 'Đánh giá'}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {activeTab === 'about' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">Về tôi</h3>
                                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                                Tôi là Tiến sĩ Tâm lý học lâm sàng với hơn 12 năm kinh nghiệm làm việc với các cá nhân, cặp đôi và gia đình. Chuyên môn của tôi bao gồm điều trị lo âu, trầm cảm, stress liên quan đến công việc và các vấn đề quan hệ.
                                            </p>
                                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-3">
                                                Tôi sử dụng phương pháp tiếp cận dựa trên bằng chứng kết hợp với liệu pháp nhận thức hành vi (CBT), chánh niệm và tâm lý học tích cực để giúp khách hàng đạt được sức khỏe tâm thần tốt hơn.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">Chuyên môn</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {['Lo âu & stress', 'Trầm cảm', 'CBT', 'Chánh niệm', 'Tư vấn cặp đôi', 'Burnout', 'Phát triển bản thân'].map(t => (
                                                    <span key={t} className="px-3 py-1 bg-primary/10 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">Học vấn & Chứng chỉ</h3>
                                            <div className="space-y-3">
                                                {[
                                                    { degree: 'Tiến sĩ Tâm lý học lâm sàng', school: 'Đại học Quốc gia TP.HCM', year: '2011' },
                                                    { degree: 'Thạc sĩ Tâm lý học', school: 'Đại học Sư phạm TP.HCM', year: '2008' },
                                                    { degree: 'Chứng chỉ CBT Nâng cao', school: 'Beck Institute, USA', year: '2015' },
                                                ].map((e, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0 mt-0.5">
                                                            <FiAward className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-sm">{e.degree}</p>
                                                            <p className="text-slate-500 dark:text-slate-400 text-xs">{e.school} · {e.year}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'services' && (
                                    <div className="space-y-3">
                                        {services.map((s, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                                                <div>
                                                    <p className="font-semibold text-sm">{s.name}</p>
                                                    <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1 mt-1">
                                                        <FiClock className="w-3 h-3" /> {s.duration}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">{fmt(s.price)}₫</p>
                                                    <p className="text-slate-400 text-xs">/buổi</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
                                            <div className="text-center">
                                                <p className="text-4xl font-black">4.9</p>
                                                <div className="flex gap-0.5 mt-1">
                                                    {[1, 2, 3, 4, 5].map(i => <FiStar key={i} className="w-4 h-4 text-primary fill-primary" />)}
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1">142 đánh giá</p>
                                            </div>
                                            <div className="flex-1 space-y-1.5">
                                                {[5, 4, 3, 2, 1].map(star => (
                                                    <div key={star} className="flex items-center gap-2 text-xs">
                                                        <span className="w-4">{star}★</span>
                                                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                            <div className="h-full bg-primary rounded-full" style={{ width: `${star === 5 ? 85 : star === 4 ? 12 : 3}%` }} />
                                                        </div>
                                                        <span className="text-slate-400">{star === 5 ? '85%' : star === 4 ? '12%' : '3%'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {reviews.map(r => (
                                            <div key={r.id} className="p-4 rounded-xl border border-primary/10">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-semibold text-sm">{r.name}</p>
                                                        <p className="text-slate-400 text-xs">{r.date}</p>
                                                    </div>
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map(i => (
                                                            <FiStar key={i} className={`w-3 h-3 ${i <= r.rating ? 'text-primary fill-primary' : 'text-slate-300'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm">{r.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Widget */}
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-lg p-6 sticky top-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-2xl font-bold text-primary">850.000₫</p>
                                    <p className="text-slate-400 text-xs">/buổi tư vấn</p>
                                </div>
                                <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full font-semibold">
                                    <FiCheck className="w-3 h-3" /> Còn lịch
                                </span>
                            </div>

                            {/* Calendar */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-1 hover:bg-primary/10 rounded-lg transition-colors">
                                        <FiChevronLeft className="w-4 h-4" />
                                    </button>
                                    <p className="text-sm font-bold">{MONTHS[month]} {year}</p>
                                    <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-1 hover:bg-primary/10 rounded-lg transition-colors">
                                        <FiChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-7 gap-0.5 mb-1">
                                    {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-0.5">
                                    {Array.from({ length: startOffset }).map((_, i) => <div key={`e-${i}`} />)}
                                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                        const isSelected = day === selectedDay;
                                        const isToday = day === 15;
                                        const isDisabled = day < 10;
                                        return (
                                            <button
                                                key={day}
                                                disabled={isDisabled}
                                                onClick={() => setSelectedDay(day)}
                                                className={`aspect-square rounded-lg text-xs font-semibold transition-all ${isDisabled
                                                    ? 'text-slate-300 dark:text-slate-600 cursor-default'
                                                    : isSelected
                                                        ? 'bg-primary text-slate-900'
                                                        : isToday
                                                            ? 'border border-primary text-primary'
                                                            : 'hover:bg-primary/10 text-slate-700 dark:text-slate-300'
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Time Slots */}
                            {selectedDay && (
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Giờ trống</p>
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {timeSlots.map(slot => (
                                            <button
                                                key={slot}
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`py-2 text-xs font-semibold rounded-lg transition-all ${selectedSlot === slot
                                                    ? 'bg-primary text-slate-900'
                                                    : 'bg-primary/10 text-slate-700 dark:text-slate-300 hover:bg-primary/20'
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Link
                                to="/booking/new"
                                onClick={(e) => {
                                    if (!selectedSlot) e.preventDefault();
                                }}
                                className={`w-full flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-bold transition-all ${selectedSlot
                                    ? 'bg-primary text-slate-900 shadow-lg shadow-primary/20 hover:brightness-105'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                <FiCalendar className="w-4 h-4" />
                                Đặt lịch ngay
                            </Link>

                            <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-primary/20 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-primary/5 transition-colors mt-2">
                                <FiMessageSquare className="w-4 h-4" />
                                Gửi tin nhắn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertDetailPage;