import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiLock, FiEye, FiEyeOff, FiCheck, FiCircle,
  FiAlertCircle, FiMail, FiClock, FiShield
} from "react-icons/fi";

interface Requirement {
  label: string;
  test: (pw: string) => boolean;
}

const REQUIREMENTS: Requirement[] = [
  { label: "Ít nhất 8 ký tự", test: pw => pw.length >= 8 },
  { label: "Bao gồm số hoặc ký hiệu", test: pw => /[\d!@#$%^&*]/.test(pw) },
  { label: "Chữ hoa", test: pw => /[A-Z]/.test(pw) },
  { label: "Chữ thường", test: pw => /[a-z]/.test(pw) },
];

const RECENT_ACTIVITY = [
  { label: "Đổi mật khẩu", time: "3 tháng trước" },
  { label: "Đăng nhập từ Chrome (macOS)", time: "2 giờ trước" },
];

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <FiLock size={16} />
        </div>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-12 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white text-sm"
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      {error && (
        <p className="text-xs text-rose-500 flex items-center gap-1">
          <FiAlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mismatch = confirm.length > 0 && newPw !== confirm;
  const allReqsMet = REQUIREMENTS.every(r => r.test(newPw));
  const canSubmit = current.length > 0 && allReqsMet && newPw === confirm && confirm.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => navigate("/settings"), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222] flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-12 max-w-md w-full text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <FiCheck size={36} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mật khẩu đã được cập nhật!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Đang chuyển hướng về cài đặt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8 max-w-2xl xl:max-w-none mx-auto">
          {/* Main Form */}
          <div className="max-w-[560px] w-full mx-auto xl:mx-0 space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary mb-1">
                <FiLock size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">Bảo mật</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                Đổi mật khẩu
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Bảo vệ tài khoản bằng cách tạo mật khẩu mạnh, duy nhất mà bạn không dùng ở nơi khác.
              </p>
            </div>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-primary/10 shadow-sm space-y-6"
            >
              <PasswordInput
                label="Mật khẩu hiện tại"
                value={current}
                onChange={setCurrent}
                placeholder="Nhập mật khẩu hiện tại"
              />

              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              <PasswordInput
                label="Mật khẩu mới"
                value={newPw}
                onChange={setNewPw}
                placeholder="Tạo mật khẩu mới"
              />

              <PasswordInput
                label="Xác nhận mật khẩu mới"
                value={confirm}
                onChange={setConfirm}
                placeholder="Nhập lại mật khẩu mới"
                error={mismatch ? "Mật khẩu không khớp" : undefined}
              />

              {/* Strength Requirements */}
              <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/20">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Yêu cầu bảo mật
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {REQUIREMENTS.map(req => {
                    const met = newPw.length > 0 && req.test(newPw);
                    return (
                      <div
                        key={req.label}
                        className={`flex items-center gap-3 transition-colors ${met ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}
                      >
                        {met ? <FiCheck size={14} className="shrink-0" /> : <FiCircle size={14} className="shrink-0" />}
                        <span className="text-sm font-medium">{req.label}</span>
                      </div>
                    );
                  })}
                </div>
                {/* Strength bar */}
                {newPw.length > 0 && (
                  <div className="mt-4">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map(i => {
                        const metCount = REQUIREMENTS.filter(r => r.test(newPw)).length;
                        return (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              i <= metCount
                                ? metCount <= 1 ? "bg-rose-400"
                                  : metCount <= 2 ? "bg-amber-400"
                                  : metCount <= 3 ? "bg-blue-400"
                                  : "bg-emerald-400"
                                : "bg-slate-200 dark:bg-slate-700"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {(() => {
                        const n = REQUIREMENTS.filter(r => r.test(newPw)).length;
                        return n <= 1 ? "Rất yếu" : n <= 2 ? "Yếu" : n <= 3 ? "Khá mạnh" : "Mạnh";
                      })()}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="flex-1 bg-primary text-slate-900 font-bold h-14 rounded-xl hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Cập nhật mật khẩu
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold h-14 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Hủy
                </button>
              </div>
            </form>

            {/* Footer Help */}
            <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
              Quên mật khẩu hiện tại?{" "}
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-primary font-semibold hover:underline decoration-primary underline-offset-4"
              >
                Đặt lại qua email
              </button>
            </p>
          </div>

          {/* Sidebar */}
          <aside className="hidden xl:flex flex-col gap-4 pt-[120px]">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-primary/10">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-800 dark:text-white">
                <FiClock size={16} className="text-primary" />
                Hoạt động gần đây
              </h3>
              <div className="space-y-4">
                {RECENT_ACTIVITY.map(item => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <p className="text-xs text-slate-900 dark:text-slate-100 font-medium">{item.label}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2FA Notice */}
            <div className="bg-gradient-to-br from-primary/20 to-transparent p-4 rounded-xl border border-primary/10">
              <div className="flex items-start gap-2 mb-2">
                <FiShield size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Xác thực 2 yếu tố đang bật</p>
              </div>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Tài khoản của bạn được bảo vệ thêm một lớp bảo mật bổ sung.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}