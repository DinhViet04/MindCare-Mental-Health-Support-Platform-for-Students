import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiMail, FiLinkedin, FiTwitter, FiSend } from 'react-icons/fi';

const ContactPage: React.FC = () => {
    const [form, setForm] = useState({ fullName: '', email: '', subject: 'Câu hỏi chung', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="max-w-[1200px] mx-auto px-6 py-10">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 pb-8 text-sm">
                    <a href="/" className="text-primary/70 font-medium hover:text-primary">Trang chủ</a>
                    <span className="text-slate-400">/</span>
                    <span className="font-medium">Liên hệ</span>
                </div>

                {/* Hero */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black leading-tight tracking-tight mb-4">Liên hệ với chúng tôi</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                        Bạn có câu hỏi về dịch vụ hoặc cần hỗ trợ? Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng giúp đỡ.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left: Form */}
                    <div className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <FiSend className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold">Gửi thành công!</h2>
                                <p className="text-slate-500 dark:text-slate-400">Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
                                <button
                                    onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', subject: 'Câu hỏi chung', message: '' }); }}
                                    className="mt-2 text-primary font-semibold hover:underline"
                                >
                                    Gửi tin nhắn khác
                                </button>
                            </div>
                        ) : (
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-semibold">Họ và tên</span>
                                        <input
                                            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent h-12 px-4 text-sm outline-none transition-all"
                                            placeholder="Nguyễn Văn A"
                                            type="text"
                                            value={form.fullName}
                                            onChange={e => setForm({ ...form, fullName: e.target.value })}
                                            required
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-semibold">Email</span>
                                        <input
                                            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent h-12 px-4 text-sm outline-none transition-all"
                                            placeholder="ban@email.com"
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            required
                                        />
                                    </label>
                                </div>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold">Chủ đề</span>
                                    <select
                                        className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent h-12 px-4 text-sm outline-none transition-all"
                                        value={form.subject}
                                        onChange={e => setForm({ ...form, subject: e.target.value })}
                                    >
                                        <option>Câu hỏi chung</option>
                                        <option>Đặt lịch tư vấn</option>
                                        <option>Hỗ trợ kỹ thuật</option>
                                        <option>Hợp tác</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold">Nội dung</span>
                                    <textarea
                                        className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none px-4 py-3 outline-none transition-all"
                                        placeholder="Chúng tôi có thể giúp gì cho bạn?"
                                        rows={5}
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        required
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-slate-900 font-bold py-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    Gửi tin nhắn
                                    <FiSend className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col gap-10">
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    <FiMapPin className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold">Địa chỉ</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    101 Nguyễn Huệ, Quận 1<br />
                                    TP. Hồ Chí Minh<br />
                                    Việt Nam
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold">Email hỗ trợ</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    Tư vấn: <a href="mailto:support@mindcare.vn" className="text-primary hover:underline">support@mindcare.vn</a><br />
                                    Hợp tác: <a href="mailto:hello@mindcare.vn" className="text-primary hover:underline">hello@mindcare.vn</a>
                                </p>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <img
                                className="w-full h-full object-cover grayscale opacity-80"
                                alt="Bản đồ TP. HCM"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYQ_0TgXryA0wbQiuwCHQZZ_U0cYtGsMgy9qkEjAFDmCvE8XMrBucb_G-sYF7YZYloIwFU0FujDpeqjkp-ZiesrVUVlabIDwJleyU4tK7ik68GjZ0txttm_NwyXd_85cJA5JdLUks-2JAJIEfD7ffXTQXWNcT8nhO1wsvCCgN_fYIjn1swme99bxO31t4UTGWPBkcmJLzQrv6tNF7Nck129ezvQUrytOkca0uRxVOv3Y8PN_I19XkjJS5xKD7JTwmTQNTgccoB0bUJ"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white dark:bg-slate-900 p-3 rounded-full shadow-xl border-4 border-primary/30">
                                    <FiMapPin className="w-7 h-7 text-primary" />
                                </div>
                            </div>
                        </div>

                        {/* Social + CTA */}
                        <div className="flex flex-col gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-6">
                                <p className="font-bold">Theo dõi chúng tôi</p>
                                <div className="flex gap-3">
                                    <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all">
                                        <FiLinkedin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all">
                                        <FiTwitter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                    </a>
                                </div>
                            </div>
                            <div className="bg-primary/10 rounded-xl p-6 flex items-center justify-between border border-primary/20">
                                <div>
                                    <p className="font-bold">Cần tư vấn riêng?</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Đặt lịch gặp chuyên gia ngay hôm nay.</p>
                                </div>
                                <Link to="/experts" className="bg-primary text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                                    Đặt lịch
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;