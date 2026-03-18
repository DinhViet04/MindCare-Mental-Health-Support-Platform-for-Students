import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function BookingConfirmationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/bookings');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col font-display">
      <main className="flex-1 flex flex-col items-center py-12 px-4 max-w-4xl mx-auto w-full">
        {/* Success Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-primary/5">
            <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3">Đặt lịch thành công!</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg text-center max-w-xl">
            Buổi tư vấn của bạn với Dr. Sarah Jenkins đã được xác nhận. Chúng tôi đã gửi link cuộc họp và chi tiết đến email của bạn.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-primary/10 overflow-hidden mb-8">
          <div className="bg-primary/5 px-8 py-4 border-b border-primary/10 flex justify-between items-center">
            <span className="font-semibold text-primary uppercase tracking-wider text-xs">Chi tiết đặt lịch</span>
            <span className="text-sm text-slate-500 font-mono">#BK-88291</span>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Chuyên gia</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Dr. Sarah Jenkins</p>
                  <p className="text-sm text-slate-500 italic">Tư vấn viên chiến lược cao cấp</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Ngày</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">24 tháng 10, 2023</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Giờ</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">10:00 SA - 11:00 SA</p>
                  <p className="text-xs text-slate-400">Múi giờ: Asia/Ho_Chi_Minh (ICT)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">business_center</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Loại dịch vụ</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Tư vấn chiến lược</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Integration */}
          <div className="border-t border-slate-100 dark:border-slate-800 p-8 bg-slate-50/50 dark:bg-slate-800/20">
            <p className="text-sm font-medium mb-4 text-slate-700 dark:text-slate-300">Thêm vào lịch của bạn:</p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Google Calendar", icon: "event" },
                { label: "Outlook", icon: "event" },
                { label: "Apple Calendar", icon: "mail" },
              ].map((cal) => (
                <button
                  key={cal.label}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-primary transition-all text-sm font-semibold shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">{cal.icon}</span>
                  {cal.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/bookings"
            className="px-10 py-4 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
          >
            Xem dashboard đặt lịch
          </Link>
          <Link
            to="/experts"
            className="px-10 py-4 bg-white dark:bg-slate-900 border border-primary/30 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center"
          >
            Quay lại chuyên gia
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary mb-2">support_agent</span>
            <h4 className="font-bold text-sm">Cần hỗ trợ?</h4>
            <p className="text-xs text-slate-500">Liên hệ đội hỗ trợ 24/7 của chúng tôi</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary mb-2">description</span>
            <h4 className="font-bold text-sm">Hướng dẫn chuẩn bị</h4>
            <p className="text-xs text-slate-500">Những gì cần mang đến buổi tư vấn</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary mb-2">verified_user</span>
            <h4 className="font-bold text-sm">Thanh toán an toàn</h4>
            <p className="text-xs text-slate-500">Thanh toán #INV-10292 đã xác nhận</p>
          </div>
        </div>
      </main>
    </div>
  );
}