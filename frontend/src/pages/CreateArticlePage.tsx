import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBold, FiItalic, FiUnderline, FiList, FiLink,
  FiImage, FiCode, FiAlignLeft, FiAlignCenter,
  FiEye, FiSave, FiSend, FiX, FiTag, FiChevronDown,
  FiUpload, FiGlobe, FiLock, FiCheck
} from "react-icons/fi";

const CATEGORIES = ["Lo âu", "Trầm cảm", "Tự chăm sóc", "Giấc ngủ", "Cân bằng cuộc sống", "Quan hệ & Giao tiếp"];
const SUGGESTED_TAGS = ["CBT", "thiền định", "lo âu", "trầm cảm", "mindfulness", "tự chăm sóc", "giấc ngủ", "stress"];

type Status = "draft" | "published" | "scheduled";

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const coverRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverName, setCoverName] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<Status>("draft");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [scheduleDate, setScheduleDate] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);

  const addTag = (t: string) => {
    const clean = t.trim().toLowerCase();
    if (clean && !tags.includes(clean)) setTags(prev => [...prev, clean]);
    setTagInput("");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toolbarActions = [
    { icon: FiBold, label: "Đậm", action: () => {} },
    { icon: FiItalic, label: "Nghiêng", action: () => {} },
    { icon: FiUnderline, label: "Gạch dưới", action: () => {} },
    { divider: true },
    { icon: FiAlignLeft, label: "Trái", action: () => {} },
    { icon: FiAlignCenter, label: "Giữa", action: () => {} },
    { divider: true },
    { icon: FiList, label: "Danh sách", action: () => {} },
    { icon: FiLink, label: "Liên kết", action: () => {} },
    { icon: FiImage, label: "Hình ảnh", action: () => {} },
    { icon: FiCode, label: "Code", action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222]">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/admin/articles")} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
              <FiX size={20} />
            </button>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-sm">Tạo bài viết mới</h1>
              {saved && <p className="text-xs text-emerald-500 flex items-center gap-1"><FiCheck size={11} /> Đã lưu nháp</p>}
              {!saved && <p className="text-xs text-slate-400">Bản nháp · Chưa lưu</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPreview(!preview)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${preview ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}>
              <FiEye size={16} /> {preview ? "Chỉnh sửa" : "Xem trước"}
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <FiSave size={15} /> Lưu nháp
            </button>
            <button
              onClick={() => setStatus("published")}
              disabled={!title.trim() || !content.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-slate-900 text-sm font-bold hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-primary/20"
            >
              <FiSend size={15} /> Xuất bản
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-5">
            {/* Cover Image */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
              {coverName ? (
                <div className="h-56 bg-gradient-to-br from-primary/20 to-violet-100 dark:from-primary/10 dark:to-violet-900/20 flex flex-col items-center justify-center gap-2">
                  <FiImage size={32} className="text-primary" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{coverName}</p>
                  <button onClick={() => setCoverName("")} className="text-xs text-rose-400 hover:text-rose-600 transition-colors">Xóa ảnh</button>
                </div>
              ) : (
                <button
                  onClick={() => coverRef.current?.click()}
                  className="w-full h-44 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl m-2"
                >
                  <FiUpload size={28} />
                  <p className="text-sm">Tải ảnh bìa lên</p>
                  <p className="text-xs text-slate-300">PNG, JPG · Tối đa 5MB</p>
                </button>
              )}
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={e => { if(e.target.files?.[0]) setCoverName(e.target.files[0].name); }} />
            </div>

            {/* Title */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Tiêu đề bài viết..."
                className="w-full text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 bg-transparent focus:outline-none border-b border-slate-100 dark:border-slate-700 pb-4 mb-4"
              />

              {/* Toolbar */}
              {!preview && (
                <div className="flex items-center gap-0.5 flex-wrap border border-slate-200 dark:border-slate-600 rounded-xl p-1.5 mb-4 bg-slate-50 dark:bg-slate-700/40">
                  {toolbarActions.map((action, i) => (
                    action.divider ? (
                      <div key={i} className="w-px h-5 bg-slate-200 dark:bg-slate-600 mx-1" />
                    ) : (
                      <button
                        key={i}
                        onClick={action.action}
                        title={action.label}
                        className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-all"
                      >
                        <action.icon size={16} />
                      </button>
                    )
                  ))}
                  <div className="ml-auto flex items-center gap-1">
                    <select className="text-xs text-slate-500 bg-transparent border-none focus:outline-none pr-1">
                      <option>Đoạn văn</option>
                      <option>Tiêu đề 1</option>
                      <option>Tiêu đề 2</option>
                      <option>Tiêu đề 3</option>
                    </select>
                  </div>
                </div>
              )}

              {preview ? (
                <div className="prose dark:prose-invert max-w-none min-h-[300px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {content || <span className="text-slate-300 dark:text-slate-600 italic">Chưa có nội dung...</span>}
                </div>
              ) : (
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={16}
                  placeholder="Bắt đầu viết nội dung bài viết của bạn...&#10;&#10;Chia sẻ kiến thức và kinh nghiệm chuyên môn để giúp đỡ cộng đồng."
                  className="w-full resize-none bg-transparent text-slate-700 dark:text-slate-200 text-sm leading-loose focus:outline-none placeholder-slate-300 dark:placeholder-slate-600"
                />
              )}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
                <span>{content.split(/\s+/).filter(Boolean).length} từ · {content.length} ký tự</span>
                <span>~{Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))} phút đọc</span>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FiGlobe size={18} className="text-primary" /> Cài đặt SEO
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Tiêu đề SEO</label>
                  <input
                    value={seoTitle}
                    onChange={e => setSeoTitle(e.target.value)}
                    placeholder={title || "Tiêu đề cho công cụ tìm kiếm..."}
                    className="w-full h-10 px-3 rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="text-xs text-slate-400 mt-1">{(seoTitle || title).length}/60 ký tự</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Mô tả SEO</label>
                  <textarea
                    value={seoDesc}
                    onChange={e => setSeoDesc(e.target.value)}
                    rows={3}
                    placeholder="Mô tả ngắn gọn về bài viết..."
                    className="w-full resize-none px-3 py-2 rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="text-xs text-slate-400 mt-1">{seoDesc.length}/160 ký tự</p>
                </div>
              </div>
              {/* Preview */}
              {(seoTitle || title) && (
                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs">
                  <p className="text-blue-600 font-medium text-sm truncate">{seoTitle || title}</p>
                  <p className="text-emerald-600 truncate">mindcare.vn/blog/{(seoTitle || title).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 40)}</p>
                  <p className="text-slate-500 mt-1 line-clamp-2">{seoDesc || "Không có mô tả SEO."}</p>
                </div>
              )}
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-5">
            {/* Publishing */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Xuất bản</h3>

              {/* Status */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Trạng thái</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["draft", "published", "scheduled"] as Status[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                        status === s
                          ? s === "published" ? "bg-emerald-500 border-emerald-500 text-white" : s === "draft" ? "bg-slate-500 border-slate-500 text-white" : "bg-amber-500 border-amber-500 text-white"
                          : "border-slate-200 dark:border-slate-600 text-slate-500 hover:border-primary/30"
                      }`}
                    >
                      {s === "draft" ? "Nháp" : s === "published" ? "Xuất bản" : "Hẹn giờ"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Hiển thị</label>
                <div className="flex gap-2">
                  {[{ val: "public" as const, label: "Công khai", icon: FiGlobe }, { val: "private" as const, label: "Riêng tư", icon: FiLock }].map(v => (
                    <button key={v.val} onClick={() => setVisibility(v.val)} className={`flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl text-xs font-medium border transition-all ${visibility === v.val ? "bg-primary/10 border-primary text-primary" : "border-slate-200 dark:border-slate-600 text-slate-500 hover:border-primary/30"}`}>
                      <v.icon size={13} /> {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              {status === "scheduled" && (
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Thời gian xuất bản</label>
                  <input type="datetime-local" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              )}

              <button
                disabled={!title.trim() || !content.trim()}
                className="w-full h-12 bg-primary text-slate-900 font-bold rounded-xl hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-primary/20 text-sm flex items-center justify-center gap-2"
              >
                <FiSend size={15} />
                {status === "draft" ? "Lưu nháp" : status === "scheduled" ? "Lên lịch" : "Xuất bản ngay"}
              </button>
            </div>

            {/* Category */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white">Danh mục</h3>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full h-11 rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 px-3 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
              >
                <option value="">-- Chọn danh mục --</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2"><FiTag size={16} className="text-primary" /> Thẻ</h3>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && tagInput && addTag(tagInput)}
                  placeholder="Nhập tag..."
                  className="flex-1 h-9 px-3 rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button onClick={() => tagInput && addTag(tagInput)} className="px-3 h-9 bg-primary text-slate-900 rounded-xl text-sm font-bold hover:brightness-105 transition-all">+</button>
              </div>
              {/* Current tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => (
                    <span key={t} className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      #{t}
                      <button onClick={() => setTags(prev => prev.filter(x => x !== t))} className="hover:text-rose-500 transition-colors ml-0.5"><FiX size={11} /></button>
                    </span>
                  ))}
                </div>
              )}
              {/* Suggestions */}
              <div>
                <p className="text-xs text-slate-400 mb-2">Gợi ý:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_TAGS.filter(t => !tags.includes(t)).map(t => (
                    <button key={t} onClick={() => addTag(t)} className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs hover:bg-primary/10 hover:text-primary transition-colors">+ {t}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}