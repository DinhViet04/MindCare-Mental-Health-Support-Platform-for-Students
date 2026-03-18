import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiStar, FiMapPin, FiFilter, FiChevronDown, FiX, FiGrid, FiList } from 'react-icons/fi';

const LANGUAGES = ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Nhật', 'Tiếng Pháp'];
const EXPERIENCES = ['0-2 năm', '3-5 năm', '6-10 năm', '10+ năm'];
const INDUSTRIES = ['Lo âu & stress', 'Trầm cảm', 'Quan hệ & gia đình', 'Burnout', 'Phát triển bản thân', 'Tâm lý trẻ em'];
const LOCATIONS = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Online'];
const CERTIFICATIONS = ['CBT', 'DBT', 'EMDR', 'Mindfulness', 'ACT'];
const SORT_OPTIONS = ['Phù hợp nhất', 'Đánh giá cao nhất', 'Giá thấp nhất', 'Giá cao nhất', 'Kinh nghiệm nhiều nhất'];

const experts = [
    { id: 1, name: 'TS. Nguyễn Thị Hoa', title: 'Tâm lý học lâm sàng', rating: 4.9, reviews: 142, price: 850000, experience: '12 năm', location: 'TP. HCM', tags: ['Lo âu', 'CBT', 'Trầm cảm'], available: true },
    { id: 2, name: 'ThS. Trần Văn Minh', title: 'Tư vấn tâm lý', rating: 4.8, reviews: 98, price: 650000, experience: '8 năm', location: 'Hà Nội', tags: ['Stress', 'Mindfulness', 'Burnout'], available: true },
    { id: 3, name: 'BS. Lê Thu Hương', title: 'Bác sĩ tâm thần', rating: 4.7, reviews: 203, price: 1200000, experience: '15 năm', location: 'TP. HCM', tags: ['Trầm cảm', 'Rối loạn lo âu', 'ADHD'], available: false },
    { id: 4, name: 'ThS. Phạm Quốc Bảo', title: 'Tư vấn gia đình', rating: 4.9, reviews: 76, price: 750000, experience: '6 năm', location: 'Đà Nẵng', tags: ['Gia đình', 'Quan hệ', 'Giao tiếp'], available: true },
    { id: 5, name: 'TS. Vũ Thanh Hà', title: 'Tâm lý học tích cực', rating: 4.8, reviews: 115, price: 900000, experience: '10 năm', location: 'Online', tags: ['Phát triển bản thân', 'Coaching', 'CBT'], available: true },
    { id: 6, name: 'ThS. Hoàng Minh Châu', title: 'Tâm lý trẻ em & vị thành niên', rating: 4.6, reviews: 89, price: 700000, experience: '7 năm', location: 'Hà Nội', tags: ['Trẻ em', 'Học đường', 'Lo âu'], available: true },
];

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const ExpertSearchPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('Phù hợp nhất');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
        languages: [], experiences: [], industries: [], locations: [], certifications: []
    });
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        languages: true, experiences: true, industries: true, locations: true, certifications: false
    });

    const toggleFilter = (category: string, value: string) => {
        setSelectedFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(v => v !== value)
                : [...prev[category], value]
        }));
    };

    const totalActive = Object.values(selectedFilters).flat().length;

    const filtered = experts.filter(e => {
        if (!search) return true;
        return e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    });

    const FilterSection = ({ title, category, options }: { title: string; category: string; options: string[] }) => (
        <div className="border-b border-primary/10 pb-4 mb-4">
            <button
                onClick={() => setExpandedSections(p => ({ ...p, [category]: !p[category] }))}
                className="flex justify-between items-center w-full mb-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
            >
                {title}
                <FiChevronDown className={`w-4 h-4 transition-transform ${expandedSections[category] ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections[category] && (
                <div className="space-y-2">
                    {options.map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedFilters[category].includes(opt)}
                                onChange={() => toggleFilter(category, opt)}
                                className="rounded border-primary/30 text-primary focus:ring-primary w-4 h-4"
                            />
                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                                {opt}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Search Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-primary/10">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-6">
                    <h1 className="text-2xl font-bold mb-4">Tìm chuyên gia phù hợp</h1>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Tìm theo tên, chuyên môn, vấn đề..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 h-12 bg-background-light dark:bg-slate-800 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="h-12 px-4 bg-background-light dark:bg-slate-800 rounded-xl border border-primary/20 focus:border-primary outline-none text-sm font-semibold hidden md:block"
                        >
                            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                        <button
                            onClick={() => setMobileFilterOpen(true)}
                            className="md:hidden h-12 px-4 rounded-xl border border-primary/20 flex items-center gap-2 text-sm font-semibold hover:bg-primary/5 transition-colors"
                        >
                            <FiFilter className="w-4 h-4" />
                            Lọc {totalActive > 0 && <span className="w-5 h-5 bg-primary text-slate-900 rounded-full text-xs font-bold flex items-center justify-center">{totalActive}</span>}
                        </button>
                        <div className="hidden md:flex items-center gap-1 border border-primary/20 rounded-xl p-1">
                            <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-primary text-slate-900' : 'text-slate-500 hover:bg-primary/10'}`}>
                                <FiGrid className="w-4 h-4" />
                            </button>
                            <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-primary text-slate-900' : 'text-slate-500 hover:bg-primary/10'}`}>
                                <FiList className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Active filters */}
                    {totalActive > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {Object.entries(selectedFilters).flatMap(([cat, vals]) =>
                                vals.map(v => (
                                    <span key={`${cat}-${v}`} className="flex items-center gap-1 px-2 py-1 bg-primary/20 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                                        {v}
                                        <button onClick={() => toggleFilter(cat, v)} className="hover:text-red-500 transition-colors">
                                            <FiX className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))
                            )}
                            <button
                                onClick={() => setSelectedFilters({ languages: [], experiences: [], industries: [], locations: [], certifications: [] })}
                                className="text-xs text-slate-500 hover:text-red-500 transition-colors"
                            >
                                Xóa tất cả
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-6 flex gap-6">
                {/* Sidebar */}
                <aside className="hidden md:block w-64 shrink-0">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 p-5 sticky top-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Bộ lọc</h3>
                            {totalActive > 0 && (
                                <button
                                    onClick={() => setSelectedFilters({ languages: [], experiences: [], industries: [], locations: [], certifications: [] })}
                                    className="text-xs text-primary font-semibold hover:underline"
                                >
                                    Xóa tất cả ({totalActive})
                                </button>
                            )}
                        </div>
                        <FilterSection title="Ngôn ngữ" category="languages" options={LANGUAGES} />
                        <FilterSection title="Kinh nghiệm" category="experiences" options={EXPERIENCES} />
                        <FilterSection title="Chuyên môn" category="industries" options={INDUSTRIES} />
                        <FilterSection title="Địa điểm" category="locations" options={LOCATIONS} />
                        <FilterSection title="Chứng chỉ" category="certifications" options={CERTIFICATIONS} />
                    </div>
                </aside>

                {/* Results */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-slate-500">Tìm thấy <strong className="text-slate-900 dark:text-slate-100">{filtered.length}</strong> chuyên gia</p>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="md:hidden h-9 px-3 bg-white dark:bg-slate-900 rounded-lg border border-primary/20 outline-none text-xs font-semibold"
                        >
                            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>

                    <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
                        {filtered.map(expert => (
                            <Link
                                key={expert.id}
                                to={`/experts/${expert.id}`}
                                className="bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 p-5 hover:border-primary/30 hover:shadow-md transition-all block"
                            >
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-lg font-bold text-primary shrink-0">
                                        {expert.name.split(' ').pop()?.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <h3 className="font-bold text-sm truncate">{expert.name}</h3>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs">{expert.title}</p>
                                            </div>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${expert.available
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                                            }`}>
                                                {expert.available ? 'Còn lịch' : 'Hết lịch'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                            <span className="flex items-center gap-1"><FiStar className="w-3 h-3 text-primary fill-primary" />{expert.rating} ({expert.reviews})</span>
                                            <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3" />{expert.location}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {expert.tags.map(t => (
                                                <span key={t} className="px-2 py-0.5 bg-primary/10 text-slate-600 dark:text-slate-400 rounded-full text-[10px]">{t}</span>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center mt-3">
                                            <span className="text-primary font-bold text-sm">{fmt(expert.price)}₫<span className="text-slate-400 font-normal text-xs">/buổi</span></span>
                                            <span className="text-xs text-slate-400">{expert.experience} kinh nghiệm</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-20 text-slate-400">
                            <FiSearch className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-semibold">Không tìm thấy chuyên gia nào</p>
                            <p className="text-sm mt-1">Thử thay đổi từ khóa hoặc bộ lọc</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpertSearchPage;