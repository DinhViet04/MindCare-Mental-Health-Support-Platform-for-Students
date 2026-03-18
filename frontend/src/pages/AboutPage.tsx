import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiEye, FiZap, FiCpu, FiGlobe } from 'react-icons/fi';

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
    { value: '10k+', label: 'Người dùng' },
    { value: '50+', label: 'Quốc gia' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Hỗ trợ' },
];

const timeline = [
    {
        icon: '🚀',
        year: '2022',
        title: 'Khởi đầu',
        desc: 'Được thành lập bởi ba nhà tâm lý học trẻ với mong muốn giúp sinh viên vượt qua áp lực học đường. Ra mắt phiên bản đầu tiên với hai tính năng cốt lõi.',
    },
    {
        icon: '👥',
        year: '2023',
        title: 'Mở rộng',
        desc: 'Nhận được nguồn đầu tư Series A, mở rộng đội ngũ lên 20 chuyên gia. Ra mắt ứng dụng di động cho iOS và Android.',
    },
    {
        icon: '🌏',
        year: 'Hôm nay',
        title: 'Tầm ảnh hưởng',
        desc: 'Phục vụ hàng nghìn sinh viên trên cả nước với đội ngũ chuyên gia đa dạng. Dẫn đầu trong lĩnh vực chăm sóc sức khỏe tâm thần cho sinh viên.',
    },
];

const values = [
    {
        icon: <FiEye className="w-6 h-6 text-primary" />,
        title: 'Minh bạch hoàn toàn',
        desc: 'Chúng tôi tin vào giao tiếp cởi mở, cả trong nội bộ lẫn với khách hàng.',
    },
    {
        icon: <FiZap className="w-6 h-6 text-primary" />,
        title: 'Lấy sinh viên làm trung tâm',
        desc: 'Chúng tôi không xây dựng tính năng cho có. Chúng tôi giải quyết vấn đề thực tế.',
    },
    {
        icon: <FiCpu className="w-6 h-6 text-primary" />,
        title: 'Không ngừng học hỏi',
        desc: 'Chúng tôi không bao giờ ngừng phát triển. Chúng tôi xem thách thức là cơ hội để cải thiện.',
    },
];

const team = [
    {
        name: 'TS. Nguyễn Minh Tuấn',
        role: 'CEO & Nhà sáng lập',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcm97J7fLuCdqUpA-mWgjS4MQaQfa-8f88I6l3XlzVMk8K-_gH_OHm1Ut0lWGSXIjpGrSH1Pq2IzFjAw-md2gTFbaAJ-3aex3Lj7nJbxs8BOyzW0tSoYPBXQ-obrg1HE28FnUuNI_pgH3PYRJ45aqEpiU6-wFFG_CgEBrsoCIulI4Brl_erHzPm4NM1lSXOxUtOoSXyrQ_dpCBH26JPfok52xm5tUxQec31KqYJNGivf69gJHWqJzB-ZGCDt2lkC76q7Ux7dn0_uDT',
    },
    {
        name: 'ThS. Lê Thu Hương',
        role: 'Giám đốc chuyên môn',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB96fzoY2A5r-c-0sUW0gQ0MhWNfFGOZddLQp4GXFCx4L43DkY-vpl3BOnd9B_J5BJj2MlXUb3mhhUk8-AzsW1zqdPwoEHJzfZFfdtQgs3pj6aQOCiSO2LNROkw4aAGneqcSHVKlf8sAwAIaLvUS0u5Il2jpDF-s-OH0BUeb-DDZjlahIT4wcualPkQjOUBHWhPySKoKBcEvaLHRr6mY3bsPTlfS09eqW8MlBscPXissEZox5UQFkjV_ay-pp5rBdj15fyruYvqNYmn',
    },
    {
        name: 'Trần Quốc Bảo',
        role: 'Trưởng phòng thiết kế',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM-wzwvrOvJtnklo9Q1fxuLohZKybH00HytzuFAnT4oosMCLvyJ3BbuZCpUyRT3K3wJf1NSf5jKBZJRBwNBdDGJDuCKOKNkwr9R6-rTxFm-a27RK0UNBaGAT5z-dgsyzhwDsb0CupH3CRTAUZSiKI4QnC-ZdLB7sS7u2vE8-_eh2cleUl0XGuIWG3WVlYdQBSLA95CK_zpBlAheQYuuX8OUjQsB0TqEmHKfAFYUnVBZcf9vvUM3PjRrWxduEcQmmVbrz_gWlzeLjCS',
    },
    {
        name: 'Phạm Hà My',
        role: 'Trưởng phòng Marketing',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV60THR--FYaBKlNmE0Ct7hu-vjiKko-zxqwt52dVEFdYpZsc-Yd3uuqO61S_z8ms5JKWDzoBhqsjf59FA15Rh0yiShIAUiw3q6HMmcpG36DXV6D5UNEP3tyQVLRwkmLWH1bxRbyAHJ7O3kApffQ-elp5V3A33E14XjDk22btrogZRXkKi334hWUFlxCsxzo9e1JlXRq_BzvXu0uhn57zbJBZJSl8AYa9Qh9EEHhJBr0yAm8kPq3u3Ik-xZJHL99QlnrzzFTjYGoQO',
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

const AboutPage: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">

            {/* ── Hero ── */}
            <header className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40">
                <div className="absolute inset-0 -z-10"
                    style={{ background: 'radial-gradient(45% 45% at 50% 50%, rgba(19,236,236,0.1) 0%, rgba(255,255,255,0) 100%)' }}
                />
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
                        Sứ mệnh của chúng tôi
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight max-w-3xl mx-auto">
                        Đồng hành cùng sinh viên <span className="text-primary">chăm sóc sức khỏe tâm thần</span>.
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Chúng tôi đặt mục tiêu giúp sinh viên Việt Nam tiếp cận dịch vụ tâm lý chuyên nghiệp một cách dễ dàng, bảo mật và không kỳ thị.
                    </p>
                </div>
            </header>

            {/* ── Stats ── */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-12 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">{s.value}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Story Timeline ── */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Sticky Left */}
                        <div className="lg:w-1/3 lg:sticky lg:top-32">
                            <h2 className="text-4xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">
                                Từ một dự án nhỏ của sinh viên đến nền tảng sức khỏe tâm thần được hàng nghìn người tin dùng.
                            </p>
                            <img
                                className="rounded-xl shadow-lg w-full aspect-video object-cover"
                                alt="Đội ngũ MindCare"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7dhN6ElxmPLjqxYhZoyeIXKxXr_ehDQHHc-_iz52yU8ppidAiXD5EawaTYRlO6JJWHYrj1ZdCSKe1gEq_W403qvIXV0HnbFtlt9rSUcBN5tOfBerShn3fRJ5EGS3GTcb7K_LUQRoGQKcxrb80lP0u-5__MbYhyfcLtw5WN9mwI5EzVXsnCrY4szJgunNnO9p4hlwawFTbFrE9-1sTFdWCfuiqd1Cl9axvGpR3nQMvkPPcpQ_vxeTkGS0nZOD06J3rciK_RjOzTKOj"
                            />
                        </div>

                        {/* Timeline Right */}
                        <div className="lg:w-2/3 space-y-0">
                            {timeline.map((item, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl ${i === 0 ? 'bg-primary' : 'bg-primary/20'}`}>
                                            {item.icon}
                                        </div>
                                        {i < timeline.length - 1 && (
                                            <div className="w-px flex-1 bg-slate-200 dark:bg-slate-800 mt-4 mb-0 min-h-[60px]" />
                                        )}
                                    </div>
                                    <div className="pb-12">
                                        <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                                        <span className="text-primary font-semibold mb-4 block">{item.year}</span>
                                        <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Core Values ── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold mb-4">Giá trị cốt lõi</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Những nguyên tắc định hướng mọi quyết định và từng dòng code chúng tôi viết.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary/50 transition-colors">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Gặp gỡ đội ngũ</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                                Những con người tận tâm, đang xây dựng trải nghiệm tốt nhất cho bạn.
                            </p>
                        </div>
                        <button className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-90 transition-all">
                            Gia nhập đội ngũ
                        </button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <div key={i} className="group">
                                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        alt={member.name}
                                        src={member.img}
                                    />
                                </div>
                                <h4 className="text-lg font-bold">{member.name}</h4>
                                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                                <div className="flex gap-3">
                                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                                        <FiGlobe className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                                        <FiMail className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Headquarters ── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
                        <div className="p-12 lg:w-2/5 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-6">Trụ sở chính</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Đội ngũ của chúng tôi hoạt động từ xa, nhưng trái tim vẫn ở Thành phố Hồ Chí Minh. Ghé thăm chúng tôi nếu bạn có dịp đến đây!
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <FiMapPin className="text-primary w-5 h-5 shrink-0" />
                                    <span className="font-medium">101 Nguyễn Huệ, Quận 1, TP. HCM</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FiPhone className="text-primary w-5 h-5 shrink-0" />
                                    <span className="font-medium">1900 123 456</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FiMail className="text-primary w-5 h-5 shrink-0" />
                                    <span className="font-medium">hello@mindcare.vn</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-3/5 h-[400px] lg:h-auto min-h-[400px] relative">
                            <img
                                className="w-full h-full object-cover"
                                alt="Bản đồ TP. HCM"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcJtLqi-4LR-k5hJnAZayYJ2g1eTfYnrQxMrT-hzmSpgyPiIUJCgC3fNpDR_Udzx1BykiDuWvy5Kpt08EyeTb77lDK7SWv_aGFGh7otj_gTpsTXeGcL0HrgWpfMtLWmYBxUseer70fxjov0dAZUsieNri4PcW5TC_8pfgglcUAdvyse-KDkxilxek8qXKW6RnHUka5g0VMYhNurj6waaFrEBlaq8HxZAHGb_JKJzZa-fg4ClhPATUn_a_758TMFuDLaDKl5fv1rviP"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8">
                                Sẵn sàng bắt đầu hành trình của bạn?
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/register"
                                    className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                                >
                                    Đăng ký ngay
                                </Link>
                                <Link
                                    to="/experts"
                                    className="px-8 py-4 bg-white/20 border border-slate-900/10 text-slate-900 rounded-xl font-bold hover:bg-white/30 transition-all"
                                >
                                    Tìm chuyên gia
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;