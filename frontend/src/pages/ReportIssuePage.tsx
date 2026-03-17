import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiUpload, FiX, FiCheck, FiAlertCircle } from "react-icons/fi";

const CATEGORIES = [
  { value: "", label: "-- Chọn loại vấn đề --" },
  { value: "technical", label: "Lỗi kỹ thuật (âm thanh/video/kết nối)" },
  { value: "billing", label: "Vấn đề thanh toán" },
  { value: "booking", label: "Lỗi đặt lịch / hủy lịch" },
  { value: "expert", label: "Phản hồi về chuyên gia" },
  { value: "privacy", label: "Bảo mật & quyền riêng tư" },
  { value: "other", label: "Vấn đề khác" },
];

const PRIORITIES = [
  { value: "low", label: "Thấp", desc: "Không ảnh hưởng đến việc sử dụng", color: "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20" },
  { value: "medium", label: "Trung bình", desc: "Ảnh hưởng một phần trải nghiệm", color: "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/20" },
  { value: "high", label: "Cao", desc: "Không thể sử dụng dịch vụ", color: "text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-900/20" },
];

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []).map(f => f.name);
    setFiles(prev => [...prev, ...picked].slice(0, 3));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222] flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <FiCheck size={36} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Đã ghi nhận báo cáo!</h2>
          <p className="text-slate-500 dark:text-slate-400">Mã hỗ trợ: <span className="font-mono font-bold text-primary">#TK-20250212</span></p>
          <p className="text-sm text-slate-400">Đội hỗ trợ sẽ phản hồi trong vòng 24 giờ qua email của bạn.</p>
          <div className="flex gap-3 pt-2">
            <button onClick={() => navigate("/")} className="flex-1 h-11 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 text-sm">
              Trang chủ
            </button>
            <button onClick={() => navigate("/bookings")} className="flex-1 h-11 bg-primary text-slate-900 font-bold rounded-xl hover:brightness-105 text-sm">
              Lịch hẹn
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222] py-10 px-4 pb-28 sm:pb-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm">
          <FiChevronLeft size={18} /> Quay lại
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 space-y-7">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Báo cáo sự cố</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Mô tả vấn đề bạn gặp phải để chúng tôi hỗ trợ kịp thời</p>
          </div>

          {/* Warning */}
          <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl text-sm text-amber-700 dark:text-amber-400">
            <FiAlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>Nếu bạn đang trong tình trạng khẩn cấp tâm lý, hãy gọi ngay <strong>1800 599 920</strong> (miễn phí, 24/7).</p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-800 dark:text-white">Loại vấn đề <span className="text-rose-500">*</span></label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full h-14 rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 px-4 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
            >
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          {/* Priority */}
          <div className="space-y-3">
            <label className="block font-semibold text-slate-800 dark:text-white">Mức độ ưu tiên <span className="text-rose-500">*</span></label>
            <div className="grid grid-cols-3 gap-3">
              {PRIORITIES.map(p => (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    priority === p.value ? `${p.color} border-current` : "border-slate-200 dark:border-slate-600 hover:border-primary/30"
                  }`}
                >
                  <p className={`font-bold text-sm ${priority === p.value ? "" : "text-slate-700 dark:text-slate-300"}`}>{p.label}</p>
                  <p className={`text-xs mt-0.5 ${priority === p.value ? "opacity-80" : "text-slate-400"}`}>{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-800 dark:text-white">Mô tả chi tiết <span className="text-rose-500">*</span></label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              placeholder="Mô tả chi tiết vấn đề bạn gặp phải, khi nào xảy ra, và các bước dẫn đến sự cố..."
              className="w-full resize-none rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 p-4 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed"
            />
            <p className="text-xs text-slate-400 text-right">{description.length}/1000</p>
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-3">
            <label className="block font-semibold text-slate-800 dark:text-white">Ảnh chụp màn hình <span className="text-slate-400 font-normal">(tùy chọn, tối đa 3 ảnh)</span></label>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFile} className="hidden" />
            {files.length < 3 && (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full h-20 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center gap-2 text-sm text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
              >
                <FiUpload size={18} /> Tải lên ảnh chụp màn hình
              </button>
            )}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                    <span className="truncate max-w-[140px]">{f}</span>
                    <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="text-slate-400 hover:text-rose-500 transition-colors"><FiX size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={() => setSubmitted(true)}
            disabled={!category || !description.trim()}
            className="w-full h-14 bg-primary text-slate-900 font-bold rounded-xl hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
          >
            Gửi báo cáo
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav (fixed) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-3 flex justify-around">
        {[
          { label: "Trang chủ", icon: "🏠", path: "/" },
          { label: "Lịch hẹn", icon: "📅", path: "/bookings" },
          { label: "Chuyên gia", icon: "👨‍⚕️", path: "/experts" },
          { label: "Hồ sơ", icon: "👤", path: "/profile" },
        ].map(item => (
          <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}