import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const Footer: React.FC = () => {
    const footerLinks = {
        'Về chúng tôi': [
            { label: 'Đội ngũ chuyên gia', to: '/about' },
            { label: 'Cơ hội nghề nghiệp', to: '/careers' },
            { label: 'Liên hệ', to: '/contact' },
            { label: 'Blog', to: '/blog' },
        ],
        'Hỗ trợ': [
            { label: 'Trung tâm trợ giúp', to: '/help' },
            { label: 'Điều khoản dịch vụ', to: '/terms' },
            { label: 'Chính sách bảo mật', to: '/privacy' },
            { label: 'Quy định hoàn tiền', to: '/refund' },
        ],
    };

    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-3 text-white mb-5">
                            <div className="size-6 text-primary">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold">MindCare</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Nền tảng chăm sóc sức khỏe tâm thần hàng đầu dành cho sinh viên Việt Nam.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-colors">
                                <FiGlobe className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-colors">
                                <FiMail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-xs">{heading}</h4>
                            <ul className="space-y-3 text-sm">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.to} className="hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-xs">Liên hệ</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <FiMapPin className="text-primary w-4 h-4 shrink-0 mt-0.5" />
                                <span>Quận 1, TP. Hồ Chí Minh</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiPhone className="text-primary w-4 h-4 shrink-0" />
                                <span>1900 123 456</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiMail className="text-primary w-4 h-4 shrink-0" />
                                <span>hello@mindcare.vn</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© 2024 MindCare. Tất cả quyền được bảo lưu.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Tiếng Việt</a>
                        <a href="#" className="hover:text-white transition-colors">English</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;