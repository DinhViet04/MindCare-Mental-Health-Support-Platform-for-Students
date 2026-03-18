import React from 'react';
import { Link } from 'react-router-dom';

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="text-primary">
            <span className="material-symbols-outlined text-4xl">psychology</span>
          </div>
          <h2 className="text-xl font-bold">MindCare</h2>
        </div>
        <div className="bg-primary/20 p-2 rounded-full text-primary">
          <span className="material-symbols-outlined">settings_slow_motion</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full text-center">
          {/* Illustration */}
          <div className="relative mb-8">
            <div className="w-full max-w-md mx-auto aspect-[16/9] rounded-xl bg-primary/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
              <div className="relative flex flex-col items-center gap-6">
                <span className="material-symbols-outlined text-8xl text-primary">eco</span>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-4xl text-primary/40">construction</span>
                  <span className="material-symbols-outlined text-4xl text-primary/60">architecture</span>
                  <span className="material-symbols-outlined text-4xl text-primary/80">handyman</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Chúng tôi đang bảo trì hệ thống để nâng cao trải nghiệm.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            MindCare sẽ sớm quay trở lại với nhiều tính năng mới giúp hành trình chăm sóc tâm trí của bạn tốt hơn. 
            Cảm ơn sự kiên nhẫn của bạn.
          </p>

          {/* ETA */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-col items-center gap-2 rounded-xl p-6 border border-primary/30 bg-white dark:bg-slate-800 shadow-sm">
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                Thời gian dự kiến hoàn thành
              </p>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <p className="text-2xl md:text-3xl font-bold">14:00 - 25/10/2023</p>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
            <p className="text-slate-600 font-medium mb-4">Bạn cần hỗ trợ ngay?</p>
            <Link
              to="mailto:support@mindcare.vn"
              className="inline-flex items-center gap-2 text-primary hover:underline font-semibold mb-6"
            >
              <span className="material-symbols-outlined">mail</span>
              support@mindcare.vn
            </Link>
            
            <div className="flex justify-center gap-4">
              <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-primary/20 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-primary/20 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">public</span>
              </button>
              <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-primary/20 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">brand_awareness</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2023 MindCare Platform. Mọi quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default MaintenancePage;