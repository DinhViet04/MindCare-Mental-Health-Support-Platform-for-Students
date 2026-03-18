import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Illustration */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl flex flex-col items-center border border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-[120px] text-primary">explore_off</span>
                <div className="mt-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
              Lỗi 404
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Oops! Trang này không tồn tại.
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
              Trang bạn đang tìm kiếm đã được chuyển đi hoặc không tồn tại. 
              Đừng lo lắng, hãy để MindCare giúp bạn quay lại đúng lộ trình.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 bg-primary text-slate-900 font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined">home</span>
                Trang chủ
              </Link>
              <Link
                to="/support"
                className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold px-8 py-4 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined">support_agent</span>
                Liên hệ hỗ trợ
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12 grid grid-cols-2 gap-6 max-w-sm">
              <Link to="/community" className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary mb-2">menu_book</span>
                <h3 className="font-bold text-sm">Lộ trình học</h3>
                <p className="text-xs text-slate-500">Tiếp tục hành trình của bạn</p>
              </Link>
              <Link to="/community/groups" className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary mb-2">forum</span>
                <h3 className="font-bold text-sm">Cộng đồng</h3>
                <p className="text-xs text-slate-500">Kết nối với mọi người</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">verified_user</span>
            <span>© 2024 MindCare - Vì sức khỏe tâm thần sinh viên</span>
          </div>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-primary transition-colors">Điều khoản</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Bảo mật</Link>
            <Link to="/help" className="hover:text-primary transition-colors">Trợ giúp</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;