import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    FiSearch, FiChevronLeft, FiChevronRight,
    FiLock, FiCheckCircle, FiClock,
    FiMapPin, FiPhone, FiMail, FiGlobe
} from 'react-icons/fi';

const specialists = [
    {
        name: 'TS. Nguyễn Văn A',
        title: 'Chuyên gia tâm lý lâm sàng',
        rating: 5,
        reviews: 48,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkuAOzp2Ci9loaXArDksJglUYqrFpsZVHMSwAxHojP05qdml02a9wDOWJ3xCneYXX3FTkr5qv3NZTHlhwH_7A3q6FYeGfn8Yl2nuCfUNzXWbiVaMSjuVXR4NekcYtBliYTnJV6JJzMBtwLIFaxDgJ88w2zXUzof-jJjixP4aXvrswj6J_aoWSgunWfoNIqMp6xsWE2kPBN4V9_hPSWB_V6joIPoorfeTYJdoX4xkbLXssX_oUyuDdSY3S-oxsimmHC9XUwE1vh0Gol',
    },
    {
        name: 'ThS. Lê Thị B',
        title: 'Chuyên gia tham vấn lo âu',
        rating: 4.5,
        reviews: 32,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9WGox_liAlgm8CQgMQd1fRFUnVDmntmBBGagb1e4n5wR2gtEJuM7UgoB5J6YJf5Xmgb_0X-AkxPmw67VyIDuUFrtzy0uM3P2dtVBNnLkoSqbzkVUH4j8EtpOLIqWPGiorBxrE9vJMCWMhg72qM-G5DkTS5_8uMIubLjGypf8bNsf6CsB8zXxIPtOsRN_3Wk8E-0db4Mv0dXnQEoVbePZSsz7ie74UTsCE6OG4dYdclLwFRD4DrX9d2X4EVMO-ytXzmey2fbpzQXiY',
    },
    {
        name: 'BS. Trần Minh C',
        title: 'Điều trị trầm cảm',
        rating: 5,
        reviews: 56,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaNkV4fdV6XtLtI8B-WagfNCQBZvNfSF8p5k0K1COzvmOpcU-nZHClsrX7EZ6of56LWEJyZ1WIl7dc_878jMm40fyYSlk7gmTFk9VM6TNQRXF8b2nwfKW2YQvPBQHsfjdGyVRiGEejMSP5EnnNh-pHqMSwiObzz640E-OcsZn_elyVhFJe2J9Eu36yZxts6NoUt7HNCRxrDmWVd7fFjENc2Vc-G5maV-bqZf5UaZT_9PeK5qy96to2S9z8C2N8v9OOu-XJsP-DTxE-',
    },
];

const articles = [
    {
        category: 'Sống khỏe',
        readTime: '5 phút đọc',
        title: '5 Cách quản lý stress hiệu quả trong mùa thi cử',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfhcrELaeYN4_snz_8O_ew-qsL4p2CXxdjql4QSc56ayaolgYGrIDcJfKZuymWFRIELtMMcF6ZC2adkHBy4Wt2w-DX2HLjygFTN6ZDXglJzz1VSKqwILfu-3sk0cLIqArZUYAqyhIJ9P23OY75x6feBEA3uNuto23MtjaKUa5tWCzWnHAXSYcYV0xW6aQhKec6XPCMl1B4ZasGsnMAx6eesnpgQG9HdXPBoafhm_8qW6T-UVfq06p9tyrbIJZjk-Cep-Y_K0ZjxU2D',
    },
    {
        category: 'Thói quen',
        readTime: '8 phút đọc',
        title: 'Viết nhật ký: Liều thuốc chữa lành tâm hồn đơn giản',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVRN72Yfpx5rNXQLrOkYGECce1s8-iz1CtZ78lAKKMk15IC0MwTc8gwOgmRD2h0NCTlUcL9TEQstoomgBMl8e1DXurMDRfvIjqzhRXZuxkHCaT3raZTxuWI0kVZ9YN9NaZ70MvfzTe3UV5BVakvrKqxRvH97kjdekk1q4wswNPYReqr5B3PdsRITop4399TvsmGsdr6z1IdfuVkkDAgzXvO3FXeE3C8S7JsTXQGUjwgOW1Caia7TeQ3vv2bLDjsWdjqo0vk8CMlMqE',
    },
    {
        category: 'Tâm lý',
        readTime: '6 phút đọc',
        title: 'Hiểu về sự cô đơn và cách vượt qua nó ở đại học',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaxsvcKOqWQT_nSF5TBHuaad7-rDyZZvQOsZbqwOlLu1TSweT7rtuSb-DYgg7wt49WosTMm3y8a0DyxDEWhA_FLkleHVLe0xR0fHVCojqqNRCPdU5LphNbPe4nbO9_1vwZ-5yKAzPylgVt7oyoTnsd4c4i4Ikur-fr-5DWpmxGYjoSGgM0y6aS86kBicg7xBlXZ0tLLCygVG-K1aGcibeGrsVxR9sfedd6bcPSlFPFtThjYkcDHhgGRiz9QFSebWGYLtyWsOioLfqO',
    },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center gap-0.5 text-yellow-400">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4" fill={i <= Math.floor(rating) ? 'currentColor' : i - 0.5 === rating ? 'url(#half)' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <defs>
                        <linearGradient id="half">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ))}
        </div>
    );
};

const HomePage: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">

            {/* ── Hero Section ── */}
            <section className="px-4 md:px-20 lg:px-40 py-8">
                <div
                    className="flex min-h-[520px] flex-col items-center justify-center rounded-xl p-8 text-center relative overflow-hidden"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAX9hlF0znEAGBs0xx7QdvXGlEZvN2u6B6SLquYUUNhhuQMB0f8c-Ou7UZimRKHwsiiHCKLyYF_MZtW0iF9Z-2WzSqYSLzgfoj0Bng-zv91yxxj4E2OG2DDUZdb3XwuezdBflqC7iPGeS7UBfazuWpUv-6_Xj7ySsMfeFHUWDLj6tDqNO3--NS3ldKDE9cROHGCXc8ItTl9dHEFQQITmEJd7qJnuLd5ZUJCL8SETlXodQ3lMtdALfOs6EOkoZ7PFrhCbQrZqjCUcY-3")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="max-w-3xl flex flex-col gap-4 relative z-10">
                        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                            Hành trình tìm lại sự cân bằng cho sinh viên
                        </h1>
                        <p className="text-white text-lg md:text-xl font-normal opacity-90">
                            Không gian an toàn để bạn chia sẻ, thấu hiểu và chăm sóc sức khỏe tâm thần của chính mình.
                        </p>
                        <div className="mt-4">
                            <Link
                                to={isAuthenticated ? '/bookings' : '/register'}
                                className="inline-flex min-w-[160px] items-center justify-center rounded-full h-14 px-8 bg-primary text-slate-900 text-lg font-bold hover:scale-105 transition-transform"
                            >
                                Bắt đầu ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Search & Filter ── */}
            <section className="px-4 md:px-20 lg:px-40 py-10">
                <div className="max-w-[960px] mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-2xl font-bold mb-6">Tìm kiếm chuyên gia tư vấn</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="flex items-stretch rounded-lg bg-slate-100 dark:bg-slate-800 h-12">
                                <div className="flex items-center justify-center pl-4 text-slate-400">
                                    <FiSearch className="w-5 h-5" />
                                </div>
                                <input
                                    className="w-full bg-transparent border-none focus:ring-0 px-3 text-base outline-none"
                                    placeholder="Tìm theo tên hoặc chuyên môn..."
                                    type="text"
                                />
                            </label>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            <button className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 hover:bg-primary/20 transition-colors text-sm font-medium">
                                Tư vấn Online
                                <FiChevronRight className="w-4 h-4 rotate-90" />
                            </button>
                            <button className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 hover:bg-primary/20 transition-colors text-sm font-medium">
                                Lĩnh vực
                                <FiChevronRight className="w-4 h-4 rotate-90" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Services ── */}
            <section className="px-4 md:px-20 lg:px-40 py-16 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Dịch vụ của chúng tôi</h2>
                        <p className="text-slate-600 dark:text-slate-400">Các giải pháp đa dạng giúp bạn vượt qua áp lực cuộc sống sinh viên.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🎥',
                                title: 'Tư vấn trực tuyến',
                                desc: 'Kết nối với chuyên gia tâm lý qua video call hoặc chat bảo mật.',
                            },
                            {
                                icon: '👥',
                                title: 'Hội thảo & Workshop',
                                desc: 'Tham gia các buổi chia sẻ nhóm về quản lý stress và kỹ năng sống.',
                            },
                            {
                                icon: '🧘',
                                title: 'Tự chăm sóc bản thân',
                                desc: 'Thư viện tài liệu, bài tập thiền và công cụ theo dõi tâm trạng.',
                            },
                        ].map((s, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center text-3xl mb-6">
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">{s.desc}</p>
                                <a className="text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all" href="#">
                                    Tìm hiểu thêm <FiChevronRight className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why MindCare ── */}
            <section className="px-4 md:px-20 lg:px-40 py-20">
                <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1">
                        <div className="relative rounded-2xl overflow-hidden aspect-square w-full max-w-lg mx-auto shadow-2xl">
                            <img
                                alt="Sinh viên bình yên"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAngXk_Fn1p3_s_CN6XUaSYJYQRdS8m6cKgL21h4omiZtUgJUgsjpiglpeKCrOxv_-A8bGdqfJiEbQGgXrSLrpQbXJSA4j5XJSwddmHq3OkLyOTnj9AqRA_CWrHPP4vw10oypjLEMNcGCDNjzolDlwPyi6i7XmFY2KJgjaN-30CySTm2fWnj33ydYI_QvKmM1p13knuEKGwvdu4lESCiAnt3pn2NYF6N6lPzffSB-CbJ6AFnKasjmwZG4Sxch9aj8jZBwWWyeZiUKBA"
                            />
                            <div className="absolute inset-0 bg-primary/10" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">Tại sao nên chọn MindCare?</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    icon: <FiLock className="w-5 h-5" />,
                                    title: 'Bảo mật tuyệt đối',
                                    desc: 'Mọi thông tin chia sẻ đều được mã hóa và bảo mật hoàn toàn.',
                                },
                                {
                                    icon: <FiCheckCircle className="w-5 h-5" />,
                                    title: 'Đội ngũ chuyên nghiệp',
                                    desc: 'Các chuyên gia tâm lý có nhiều kinh nghiệm làm việc với sinh viên.',
                                },
                                {
                                    icon: <FiClock className="w-5 h-5" />,
                                    title: 'Tiện lợi & Linh hoạt',
                                    desc: 'Đặt lịch hẹn dễ dàng, tư vấn mọi lúc mọi nơi phù hợp với lịch học.',
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-slate-900">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{item.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Specialists ── */}
            <section className="px-4 md:px-20 lg:px-40 py-20 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Gặp gỡ chuyên gia</h2>
                            <p className="text-slate-600 dark:text-slate-400">Đội ngũ tận tâm, sẵn sàng lắng nghe bạn.</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                                <FiChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                                <FiChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-6">
                        {specialists.map((sp, i) => (
                            <div key={i} className="min-w-[280px] bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
                                <img alt={sp.name} className="w-full h-56 object-cover" src={sp.img} />
                                <div className="p-6">
                                    <h4 className="text-lg font-bold">{sp.name}</h4>
                                    <p className="text-primary text-sm font-medium mb-3">{sp.title}</p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <StarRating rating={sp.rating} />
                                        <span className="text-slate-400 text-xs">({sp.reviews} đánh giá)</span>
                                    </div>
                                    <Link
                                        to="/experts"
                                        className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-700 font-bold text-sm hover:bg-primary transition-colors block text-center"
                                    >
                                        Đặt lịch
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Articles ── */}
            <section className="px-4 md:px-20 lg:px-40 py-20">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Bài viết mới nhất</h2>
                        <p className="text-slate-600 dark:text-slate-400">Kiến thức và kinh nghiệm hữu ích về chăm sóc sức khỏe tâm thần.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((a, i) => (
                            <article key={i} className="group cursor-pointer">
                                <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-slate-200">
                                    <img
                                        alt={a.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src={a.img}
                                    />
                                </div>
                                <div className="flex items-center gap-3 mb-2 text-xs text-slate-500 font-medium uppercase tracking-wider">
                                    <span>{a.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span>{a.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{a.title}</h3>
                            </article>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <button className="px-8 py-3 rounded-full border-2 border-slate-900 dark:border-slate-100 font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-slate-100 dark:hover:text-slate-900 transition-all">
                            Xem tất cả bài viết
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Newsletter ── */}
            <section className="px-4 md:px-20 lg:px-40 py-20 bg-primary/10">
                <div className="max-w-[800px] mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold">Luôn cập nhật những tin tức mới nhất</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Đăng ký nhận bản tin về sức khỏe tâm thần và các sự kiện sắp tới của MindCare.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            className="flex-1 rounded-lg border-none bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary h-12 px-4 shadow-sm outline-none"
                            placeholder="Email của bạn"
                            type="email"
                        />
                        <button className="bg-primary text-slate-900 px-8 h-12 rounded-lg font-bold hover:opacity-90 transition-opacity">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default HomePage;