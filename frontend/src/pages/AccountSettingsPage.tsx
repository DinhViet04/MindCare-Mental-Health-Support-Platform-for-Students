import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser, FiShield, FiBell, FiCreditCard, FiSettings,
  FiCamera, FiTrash2, FiMail, FiPhone, FiLogOut, FiHelpCircle, FiCheck
} from "react-icons/fi";

const NAV_LINKS = [
  { icon: FiUser, label: "Thông tin hồ sơ", id: "profile" },
  { icon: FiShield, label: "Bảo mật & Quyền riêng tư", id: "security" },
  { icon: FiBell, label: "Thông báo", id: "notifications" },
  { icon: FiCreditCard, label: "Thanh toán & Gói dịch vụ", id: "billing" },
  { icon: FiSettings, label: "Tùy chọn chung", id: "general" },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full relative flex items-center px-1 transition-colors ${enabled ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}
    >
      <div className={`size-4 rounded-full transition-all ${enabled ? "bg-slate-900 ml-auto" : "bg-white"}`} />
    </button>
  );
}

export default function AccountSettingsPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: "Alex Johnson",
    title: "Mindfulness Enthusiast",
    bio: "Passionate about mental health and sustainable wellbeing practices. Joining MindCare to build better habits.",
    phone: "+1 (555) 000-0000",
  });

  const [prefs, setPrefs] = useState({
    publicProfile: true,
    newsletter: false,
    darkMode: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-slate-900">
            <span className="font-bold text-sm">M</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">MindCare</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <FiHelpCircle size={18} />
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <FiLogOut size={18} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-col p-4 gap-4 sticky top-[65px] h-[calc(100vh-65px)]">
          {/* User Info */}
          <div className="flex gap-3 p-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold text-lg shrink-0">
              AJ
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 dark:text-white">{form.name}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">alex.j@mindcare.com</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeSection === link.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
              >
                <link.icon size={18} />
                {link.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Cài đặt tài khoản</h1>
              <p className="text-slate-500 dark:text-slate-400">Quản lý thông tin cá nhân, chi tiết liên hệ và trải nghiệm nền tảng của bạn.</p>
            </div>

            {/* Profile Section */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Thông tin hồ sơ</h2>

              {/* Avatar */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-violet-200 dark:from-primary/20 dark:to-violet-800 flex items-center justify-center text-2xl font-bold text-slate-700 dark:text-white border-4 border-slate-50 dark:border-slate-800">
                    AJ
                  </div>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-slate-900 border-2 border-white dark:border-slate-900 hover:brightness-110 transition-all"
                  >
                    <FiCamera size={13} />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Ảnh đại diện</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">JPG, GIF hoặc PNG. Tối đa 2MB.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
                    >
                      Đổi ảnh
                    </button>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors flex items-center gap-1.5">
                      <FiTrash2 size={14} /> Xóa
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Họ và tên</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chức danh</label>
                  <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white text-sm transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Giới thiệu bản thân</label>
                  <textarea
                    value={form.bio}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white text-sm resize-none transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Thông tin liên hệ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Địa chỉ email</label>
                  <div className="relative">
                    <FiMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value="alex.j@mindcare.com"
                      readOnly
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 text-sm cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Để thay đổi email, vui lòng liên hệ hỗ trợ.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Số điện thoại</label>
                  <div className="relative">
                    <FiPhone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tùy chọn tài khoản</h2>
              <div className="space-y-0">
                {[
                  {
                    key: "publicProfile" as const,
                    label: "Hồ sơ công khai",
                    desc: "Cho phép người khác xem tiến trình và thành tích của bạn",
                  },
                  {
                    key: "newsletter" as const,
                    label: "Bản tin & Marketing",
                    desc: "Nhận mẹo hàng tuần và cập nhật nền tảng",
                  },
                  {
                    key: "darkMode" as const,
                    label: "Chế độ tối",
                    desc: "Chuyển đổi giữa giao diện sáng và tối",
                  },
                ].map((item, i) => (
                  <div
                    key={item.key}
                    className={`flex items-center justify-between py-5 ${i > 0 ? "border-t border-slate-100 dark:border-slate-800" : ""}`}
                  >
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white text-sm">{item.label}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={prefs[item.key]}
                      onChange={v => setPrefs(p => ({ ...p, [item.key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-red-50/50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20 p-6 mb-8">
              <h2 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">Vùng nguy hiểm</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Xóa vĩnh viễn tài khoản của bạn và mọi dữ liệu liên quan. Hành động này không thể hoàn tác.
              </p>
              <button
                onClick={() => navigate('/account/delete')}
                className="px-6 py-2.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold rounded-xl text-sm hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-2"
              >
                <FiTrash2 size={16} /> Xóa tài khoản
              </button>
            </section>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pb-12">
              <button
                onClick={() => {
                  setForm({ name: "Alex Johnson", title: "Mindfulness Enthusiast", bio: "Passionate about mental health and sustainable wellbeing practices. Joining MindCare to build better habits.", phone: "+1 (555) 000-0000" });
                  setPrefs({ publicProfile: true, newsletter: false, darkMode: true });
                }}
                className="px-6 py-2.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Hủy thay đổi
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-2.5 bg-primary text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2"
              >
                {saved ? <><FiCheck size={16} /> Đã lưu</> : "Lưu cài đặt"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}