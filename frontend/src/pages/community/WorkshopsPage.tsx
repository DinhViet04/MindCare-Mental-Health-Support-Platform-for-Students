import React, { useState } from 'react';

const workshops = [
    { id: '1', title: 'Kỹ Năng Đối Phó Với Lo Âu', host: 'Dr. Sarah Jenkins', date: 'Mar 15, 2026', time: '10:00 AM', duration: '90 phút', spots: 20, enrolled: 14, price: 'Miễn phí', category: 'Anxiety', image: '🧘' },
    { id: '2', title: 'Xây Dựng Mối Quan Hệ Lành Mạnh', host: 'Dr. Linda Park', date: 'Mar 18, 2026', time: '2:00 PM', duration: '2 giờ', spots: 15, enrolled: 15, price: '$25', category: 'Relationships', image: '💑' },
    { id: '3', title: 'Thiền Chánh Niệm Cho Người Mới', host: 'Dr. Emma Davis', date: 'Mar 20, 2026', time: '9:00 AM', duration: '60 phút', spots: 30, enrolled: 22, price: 'Miễn phí', category: 'Mindfulness', image: '🌿' },
    { id: '4', title: 'Vượt Qua Traumatism & Phục Hồi', host: 'Dr. James Wilson', date: 'Mar 22, 2026', time: '3:00 PM', duration: '2 giờ', spots: 12, enrolled: 8, price: '$30', category: 'Trauma', image: '💚' },
    { id: '5', title: 'Khuôn Khổ CBT Cho Cuộc Sống Hàng Ngày', host: 'Dr. Michael Torres', date: 'Mar 25, 2026', time: '11:00 AM', duration: '90 phút', spots: 25, enrolled: 19, price: '$20', category: 'Therapy', image: '🧠' },
    { id: '6', title: 'Quản Lý Căng Thẳng Tại Nơi Làm Việc', host: 'Dr. Sarah Jenkins', date: 'Apr 1, 2026', time: '12:00 PM', duration: '60 phút', spots: 20, enrolled: 5, price: 'Miễn phí', category: 'Stress', image: '💼' },
];

const categories = ['Tất cả', 'Anxiety', 'Relationships', 'Mindfulness', 'Trauma', 'Therapy', 'Stress'];

const WorkshopsPage: React.FC = () => {
    const [category, setCategory] = useState('Tất cả');
    const [search, setSearch] = useState('');

    const filtered = workshops.filter(w => {
        const matchCat = category === 'Tất cả' || w.category === category;
        const matchSearch = w.title.toLowerCase().includes(search.toLowerCase()) || w.host.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Hero */}
            <div className="bg-gradient-to-br from-primary/20 via-teal-400/10 to-transparent py-14 px-4 mb-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Workshop & Sự Kiện</h1>
                    <p className="text-slate-500 text-lg mb-6">Tham gia các buổi hội thảo trực tuyến được dẫn dắt bởi các chuyên gia tâm lý uy tín.</p>
                    <div className="relative max-w-md mx-auto">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm workshop..."
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none shadow-sm" />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-16">
                {/* Category Filter */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${category === cat ? 'bg-primary text-slate-900 shadow-md shadow-primary/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary hover:border-primary/40'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Workshops Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(w => {
                        const isFull = w.enrolled >= w.spots;
                        const isFree = w.price === 'Miễn phí';
                        const fillPercent = Math.round((w.enrolled / w.spots) * 100);

                        return (
                            <div key={w.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                {/* Card Header */}
                                <div className="h-32 bg-gradient-to-br from-primary/10 to-teal-400/10 flex items-center justify-center relative">
                                    <span className="text-5xl">{w.image}</span>
                                    <div className="absolute top-3 right-3">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isFree ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-primary/10 text-primary'}`}>
                                            {w.price}
                                        </span>
                                    </div>
                                    {isFull && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            Đã đầy
                                        </div>
                                    )}
                                </div>

                                {/* Card Body */}
                                <div className="p-5">
                                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{w.category}</span>
                                    <h3 className="font-bold text-base mt-2 mb-1 line-clamp-2 group-hover:text-primary transition-colors">{w.title}</h3>
                                    <p className="text-xs text-slate-500 mb-4">Dẫn bởi <span className="font-semibold">{w.host}</span></p>

                                    <div className="space-y-1.5 mb-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                                            {w.date} · {w.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                                            {w.duration}
                                        </div>
                                    </div>

                                    {/* Capacity */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="text-slate-500">{w.enrolled}/{w.spots} đã đăng ký</span>
                                            <span className={`font-bold ${fillPercent >= 80 ? 'text-orange-500' : 'text-slate-400'}`}>{fillPercent}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${fillPercent >= 100 ? 'bg-red-500' : fillPercent >= 80 ? 'bg-orange-400' : 'bg-primary'}`}
                                                style={{ width: `${Math.min(fillPercent, 100)}%` }} />
                                        </div>
                                    </div>

                                    <button disabled={isFull}
                                        className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${isFull ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-primary text-slate-900 hover:bg-primary/90 shadow-md shadow-primary/20'}`}>
                                        {isFull ? 'Đã đầy chỗ' : 'Đăng ký'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">event_busy</span>
                        <p className="text-lg font-bold text-slate-500">Không tìm thấy workshop phù hợp</p>
                        <p className="text-sm text-slate-400 mt-1">Hãy thử từ khóa khác hoặc chọn danh mục khác.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkshopsPage;
