import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiChevronLeft, FiChevronRight, FiSliders, FiStar } from 'react-icons/fi';

interface Expert {
    id: number;
    name: string;
    title: string;
    rating: number;
    reviews: number;
    price: number;
    bio: string;
    tags: string[];
    img: string;
}

const experts: Expert[] = [
    {
        id: 1,
        name: 'TS. Nguyễn Thị Hoa',
        title: 'Chuyên gia tâm lý lâm sàng',
        rating: 4.9,
        reviews: 120,
        price: 350000,
        bio: 'Hỗ trợ sinh viên vượt qua áp lực học tập, khủng hoảng bản sắc và các vấn đề tâm lý phổ biến trong môi trường đại học.',
        tags: ['Lo âu', 'Stress', 'Lâm sàng'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe4I_ALufQgizuQ4533Xby0l_xuToO5rFwia4nezux4JCBvmgmugw0DgOQ9SNBGyBj87j2cLRxNgaHbLbt2HSrSjBnwmmLPYx72YBETzT4aansJdqaNOdHO7pNTXNEsbccprhoRiyttnyKDZDC8Wy8kAskYkryRbVLF0uYhqo9Tmph7hGjULiX-NCApgwzIdX6boFzlg_CzJy04KeO1Zcl0rnkY5pHA8Vitxnf1GgGKRlUEiP800Cjb-GWi9Zr2tuPgLw21lfEMDjT',
    },
    {
        id: 2,
        name: 'ThS. Trần Văn Minh',
        title: 'Chuyên gia tham vấn lo âu',
        rating: 5.0,
        reviews: 85,
        price: 400000,
        bio: 'Chuyên điều trị rối loạn lo âu, trầm cảm nhẹ và hỗ trợ phát triển kỹ năng quản lý cảm xúc cho sinh viên.',
        tags: ['Lo âu', 'Trầm cảm', 'CBT'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7W1syEvn6YI5FEAzNC_0oF6NCStYD6_KN2CSvWIvbAvcJQxlcBS1aRcuSj2Jtf3gM707oZ5NxivQBX6SWuxNfh3eN5f9MCSSBRRESF9VYXkARd1n6uUuSjQ7NawLMoIgvw3alq6VFP28qGN051pVajFVecYw-hT7CeN7_tTP2IGUjl8WvTnZZCGeFDFB_hCcTAKsl9tPoaQy3oc-0fr0LPZRa5Xm3z8VrCduWcTuM8z2t7cJ-CuS-4pWIHkG1xCStPJ602ddSQQ82',
    },
    {
        id: 3,
        name: 'BS. Lê Thu Hương',
        title: 'Giám đốc nghiên cứu tâm lý',
        rating: 4.8,
        reviews: 92,
        price: 450000,
        bio: 'Chuyên gia nghiên cứu đa chiều về sức khỏe tâm thần, kiểm tra khả năng sử dụng và hệ thống thiết kế tiếp cận đầu tiên.',
        tags: ['Nghiên cứu', 'Chiến lược', 'Thiết kế'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDesPWpfspAK7ZBszKiIgmocnejl298YSARVosz5peeyTTCtfjVcM0aOt12SNISiaMeypHNmXC8nUklUZtznGd0h5tf-Z5qRpKMUtf3grVtrL3iXhzsBQ3xML9ysnp-z-QwlyVZ1454XL7ZoTykXvHb7tEauTUC578k5fsaXb6vruDj8JjUPgtrFea2ev7H0qB_aZmvCQwgeXi1DrjfnoRd4-gp3hIZJ6yK0OtG5N1EZ3SVC1d1YBOoAGtTDL94raXnbNNoL5r52o87',
    },
    {
        id: 4,
        name: 'TS. Phạm Quốc Bảo',
        title: 'Tư vấn tâm lý nhận thức',
        rating: 4.9,
        reviews: 43,
        price: 500000,
        bio: 'Thiết kế và triển khai liệu pháp nhận thức hành vi (CBT) giúp sinh viên xây dựng tư duy lành mạnh và vượt qua khó khăn.',
        tags: ['CBT', 'Nhận thức', 'Tâm lý'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLaHrY8t4rHw6_dMIvxuPz5yWksC1qsRDVQD8CDhdC54OZ6MhnUKs5utVfpc90eA6MAfWFWr7FwNb7TLCLHbtSfJgEZoxFKJj9PLWAinJc6GTAPDA9FpYtkG8IYZZeWyAQ4CKRA0Jj-XD7aoTRjC5OaD2f3Ti6yGXqWTC2ZDulwZr6L3ZjeZqs6SSiZwaWile8YmDUXoiukabpRNNggFEJ6TxLRx8GeVH-t7dquFpWo5mWJUxY11XN0FB8j0Zc175DTxGqnCzljlvW',
    },
    {
        id: 5,
        name: 'ThS. Nguyễn Minh Châu',
        title: 'Chuyên gia sức khỏe tâm thần',
        rating: 5.0,
        reviews: 67,
        price: 550000,
        bio: 'Xây dựng các mô hình dự đoán và kế hoạch can thiệp giúp biến dữ liệu thành thông tin sức khỏe có giá trị cho sinh viên.',
        tags: ['Sức khỏe', 'Phòng ngừa', 'Tư vấn'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMe2FXMYIiRjNyX7OxOe6MhCOU4TtnAiao4TijgY0YLZXcLAfZpYTQ10Ea5qzFfNxPGhZwSX2PKCSSx7mkZKiU5h7qUVFraHfSyELnBWyiYsAJLzi4jNQw7yJD47SExxvxysLRcWBpLT0MoIN1SX4M5EDDZZqw1868wDnBZNiy-UZU0ajmXN9aovp_YU-boKJUmVEsfmr5Vo4Lv6Dc9HMswyl9o3MLBPNRiypzaXPbyo8i8dtSPZQwPjkIOsnpw-uzpu429Q-LgBZO',
    },
    {
        id: 6,
        name: 'BS. Vũ Thanh Hà',
        title: 'Chuyên gia phát triển bản thân',
        rating: 4.7,
        reviews: 110,
        price: 300000,
        bio: 'Chuyên gia về kỹ năng quản lý thời gian, nâng cao động lực học tập và phát triển các thói quen tích cực cho sinh viên.',
        tags: ['Phát triển', 'Động lực', 'Kỹ năng'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbkWp351bKvyVY2Suj8p1tKff_F8ARyMT4mJetAebWrc9YnF61eAaTPnyE-ilYsnCysOCk-lu2qMZk7hGDW_3fyPjPCFeQR-9WcukiBTeQ--1qVviwINH7X3DUOWSlZnJdURjK6e72tSGMClZI8KM4KFW_VK47UGbVY23wgxvjIxXH0WuxAUBRZPRjP5zuv27ks_6bmV1eh1s7xZ2xMMl84IV4kj55zmrz_cejP6jcrYFDzr9NiPv8QKIawaJBZiHXe9RbR7t9XQ_F',
    },
];

const ITEMS_PER_PAGE = 6;

const ExpertsPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = experts.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 lg:px-20">
                <div className="flex flex-col gap-8">

                    {/* Header */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black tracking-tight">Danh sách chuyên gia</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            Kết nối với các chuyên gia tâm lý hàng đầu, từ tư vấn đến điều trị chuyên sâu.
                        </p>
                    </div>

                    {/* Search + Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 items-end">
                        <div className="w-full lg:flex-1">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tìm kiếm</span>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <FiSearch className="w-5 h-5" />
                                    </div>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="Tìm theo tên, chuyên môn hoặc lĩnh vực..."
                                        type="text"
                                        value={search}
                                        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 w-full lg:w-auto">
                            <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium whitespace-nowrap hover:border-primary transition-colors">
                                Chuyên môn <FiChevronRight className="w-4 h-4 rotate-90" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium whitespace-nowrap hover:border-primary transition-colors">
                                Giá <FiChevronRight className="w-4 h-4 rotate-90" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl text-sm font-medium whitespace-nowrap">
                                <FiSliders className="w-4 h-4" /> Bộ lọc
                            </button>
                        </div>
                    </div>

                    {/* Grid */}
                    {paginated.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <FiSearch className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="font-semibold">Không tìm thấy chuyên gia phù hợp</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginated.map(expert => (
                                <div
                                    key={expert.id}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                            style={{ backgroundImage: `url("${expert.img}")` }}
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1">
                                            <FiStar className="w-3.5 h-3.5 fill-current" />
                                            {expert.rating} ({expert.reviews})
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold">{expert.name}</h3>
                                                <p className="text-primary text-sm font-semibold">{expert.title}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-black">{formatPrice(expert.price)}</p>
                                                <p className="text-xs text-slate-500 uppercase tracking-wider">/ buổi</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">{expert.bio}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {expert.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link
                                                to={`/experts/${expert.id}`}
                                                className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-bold transition-colors text-center block"
                                            >
                                                Xem hồ sơ
                                            </Link>
                                            <Link
                                                to="/booking/new"
                                                className="py-2.5 px-4 bg-primary text-slate-900 hover:brightness-95 rounded-xl text-sm font-bold transition-all text-center block"
                                            >
                                                Đặt lịch
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 py-8">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-40"
                            >
                                <FiChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === page
                                            ? 'bg-primary text-slate-900'
                                            : 'border border-slate-200 dark:border-slate-800 hover:border-primary'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-40"
                            >
                                <FiChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpertsPage;