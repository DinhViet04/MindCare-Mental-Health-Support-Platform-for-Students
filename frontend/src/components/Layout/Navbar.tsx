import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navLinks = [
        { label: 'Trang chủ', to: '/' },
        { label: 'Chuyên gia', to: '/experts' },
        { label: 'Dịch vụ', to: '/services' },
        { label: 'Cộng đồng', to: '/community' },
        { label: 'Bài viết', to: '/blog' },
        { label: 'Về chúng tôi', to: '/about' },
    ];

    const isActive = (path: string) =>
        location.pathname === path ? 'text-primary' : 'hover:text-primary';

    return (
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                    <div className="size-7 text-primary">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight">MindCare</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`text-sm font-medium transition-colors ${isActive(link.to)}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {user?.fullName?.split(' ').pop()}
                                </span>
                            </button>
                            
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 mb-1">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Đăng nhập với email</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.email || 'user@example.com'}</p>
                                    </div>
                                    <Link onClick={() => setDropdownOpen(false)} to="/profile" className="block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50">Hồ sơ cá nhân</Link>
                                    <Link onClick={() => setDropdownOpen(false)} to="/bookings" className="block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50">Lịch khám của tôi</Link>
                                    <Link onClick={() => setDropdownOpen(false)} to="/saved-articles" className="block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50">Bài viết đã lưu</Link>
                                    
                                    {(user?.role === 'expert' || user?.role === 'admin') && (
                                        <Link onClick={() => setDropdownOpen(false)} to="/expert/schedule" className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5">Dành cho Chuyên gia</Link>
                                    )}
                                    
                                    {(user?.role === 'admin' || user?.role === 'moderator') && (
                                        <Link onClick={() => setDropdownOpen(false)} to="/admin" className="block px-4 py-2.5 text-sm font-medium text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10">Quản trị hệ thống</Link>
                                    )}
                                    
                                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-1 font-medium"></div>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 font-bold"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm font-medium bg-primary text-slate-900 rounded-lg hover:opacity-90 transition-all"
                            >
                                Đăng ký
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark px-6 py-4 space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`block text-sm font-medium py-2 transition-colors ${isActive(link.to)}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="w-full py-2.5 text-sm font-medium text-center border border-slate-200 dark:border-slate-700 rounded-lg" onClick={() => setMobileOpen(false)}>
                                    Hồ sơ
                                </Link>
                                <button onClick={logout} className="w-full py-2.5 text-sm font-bold bg-primary text-slate-900 rounded-lg">
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="w-full py-2.5 text-sm font-medium text-center border border-slate-200 dark:border-slate-700 rounded-lg" onClick={() => setMobileOpen(false)}>
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="w-full py-2.5 text-sm font-bold text-center bg-primary text-slate-900 rounded-lg" onClick={() => setMobileOpen(false)}>
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;