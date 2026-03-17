import React from 'react';
import { Link } from 'react-router-dom';


const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"></div>
            <div className="relative w-48 h-48 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[80px] text-primary">lock_person</span>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Truy cập bị từ chối
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-3">
            Bạn không có quyền truy cập trang này.
          </p>
          <p className="text-slate-500 text-sm mb-10 max-w-sm mx-auto">
            Vui lòng đăng nhập với tài khoản có quyền phù hợp hoặc liên hệ với quản trị viên để được hỗ trợ tiếp tục.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-slate-900 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <span className="material-symbols-outlined">login</span>
              Đăng nhập ngay
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary/10 text-slate-900 dark:text-slate-100 rounded-xl font-bold border border-primary/20 hover:bg-primary/20 transition-all"
            >
              <span className="material-symbols-outlined">home</span>
              Về trang chủ
            </Link>
          </div>

          {/* Help Link */}
          <div className="mt-12 pt-8 border-t border-primary/10">
            <p className="text-sm text-slate-500">
              Cần hỗ trợ?{' '}
              <Link to="/help" className="text-primary font-medium hover:underline">
                Trung tâm trợ giúp MindCare
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnauthorizedPage;