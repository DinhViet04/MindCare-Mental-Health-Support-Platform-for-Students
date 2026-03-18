import React from 'react';
import { Link } from 'react-router-dom';


const ServerErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* Illustration */}
          <div className="relative mb-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"></div>
            <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden bg-primary/5 border border-primary/20 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex gap-4 items-end">
                  <div className="w-12 h-24 bg-primary/40 rounded-t-lg"></div>
                  <div className="w-12 h-32 bg-primary rounded-t-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-900">engineering</span>
                  </div>
                  <div className="w-12 h-16 bg-primary/60 rounded-t-lg"></div>
                </div>
                <div className="w-48 h-2 bg-primary/20 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-primary"></div>
                </div>
                <p className="text-sm font-medium text-primary uppercase tracking-widest">Đội ngũ đang xử lý</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold">
            <span className="material-symbols-outlined text-lg mr-2">error</span>
            Mã lỗi: 500
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Đã có lỗi xảy ra trên hệ thống.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-md mx-auto">
            Máy chủ của chúng tôi đang gặp chút sự cố kỹ thuật. 
            Vui lòng thử lại sau ít phút hoặc quay về trang chủ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-slate-900 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <span className="material-symbols-outlined">refresh</span>
              Thử lại
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary/10 text-slate-900 dark:text-slate-100 rounded-xl font-bold border border-primary/20 hover:bg-primary/20 transition-all"
            >
              <span className="material-symbols-outlined">home</span>
              Trang chủ
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-16 pt-8 border-t border-primary/10">
            <p className="text-sm text-slate-500 mb-4">Bạn vẫn cần hỗ trợ?</p>
            <div className="flex justify-center gap-6">
              <Link to="/support" className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                <span className="material-symbols-outlined text-lg">support_agent</span>
                Liên hệ hỗ trợ
              </Link>
              <Link to="/status" className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                <span className="material-symbols-outlined text-lg">description</span>
                Trạng thái hệ thống
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServerErrorPage;