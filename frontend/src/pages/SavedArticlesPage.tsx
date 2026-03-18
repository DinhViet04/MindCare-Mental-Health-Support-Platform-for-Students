import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookmark, FiShare2, FiTrash2, FiClock, FiSearch, FiArrowRight, FiBookOpen, FiActivity, FiHeart } from "react-icons/fi";

const TABS = ["Tất cả", "Căng thẳng", "Giấc ngủ", "Mindfulness"];

const SAVED_ARTICLES = [
  { id: 1, title: "5 kỹ thuật thở giúp kiểm soát cơn lo âu ngay lập tức", category: "Lo âu", tab: "Căng thẳng", readTime: 6, author: "TS. Nguyễn Minh Châu", date: "Đã lưu 2 ngày trước", color: "from-violet-500 to-indigo-600", excerpt: "Những kỹ thuật thở đơn giản có thể giúp bạn lấy lại bình tĩnh trong vài phút." },
  { id: 3, title: "Tại sao giấc ngủ là nền tảng của sức khỏe tâm thần?", category: "Giấc ngủ", tab: "Giấc ngủ", readTime: 7, author: "TS. Lê Văn Đức", date: "Đã lưu 5 ngày trước", color: "from-blue-500 to-cyan-600", excerpt: "Thiếu ngủ ảnh hưởng trực tiếp đến khả năng xử lý cảm xúc và tư duy." },
  { id: 4, title: "Mindfulness cho người bận rộn: 5 phút mỗi ngày", category: "Tự chăm sóc", tab: "Mindfulness", readTime: 5, author: "ThS. Phạm Thu Trang", date: "Đã lưu 1 tuần trước", color: "from-emerald-400 to-teal-600", excerpt: "Bạn không cần 30 phút thiền định mỗi ngày. Đây là cách bắt đầu hiệu quả." },
  { id: 6, title: "Ranh giới lành mạnh: Nói không mà không cảm thấy tội lỗi", category: "Cân bằng cuộc sống", tab: "Căng thẳng", readTime: 8, author: "ThS. Trần Thị Hoa", date: "Đã lưu 2 tuần trước", color: "from-purple-400 to-violet-600", excerpt: "Thiết lập ranh giới không phải là ích kỷ — đó là hành động tự yêu thương bản thân." },
  { id: 8, title: "Thiền định và lo âu: Bằng chứng khoa học", category: "Lo âu", tab: "Mindfulness", readTime: 8, author: "ThS. Phạm Thu Trang", date: "Đã lưu 3 tuần trước", color: "from-teal-400 to-emerald-600", excerpt: "Hơn 200 nghiên cứu xác nhận thiền định giảm triệu chứng lo âu hiệu quả." },
];

const SIDEBAR_LINKS = [
  { icon: FiBookOpen, label: "Bài viết đã lưu", path: "/saved-articles", active: true },
  { icon: FiActivity, label: "Lịch sử tư vấn", path: "/consultations" },
  { icon: FiHeart, label: "Chuyên gia yêu thích", path: "/experts/favorites" },
];

export default function SavedArticlesPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(SAVED_ARTICLES.map(a => a.id));

  const unsave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => prev.filter(x => x !== id));
  };

  const filtered = SAVED_ARTICLES.filter(a => {
    const inSaved = saved.includes(a.id);
    const matchTab = tab === "Tất cả" || a.tab === tab;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return inSaved && matchTab && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-4 space-y-1 sticky top-24">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 pb-2">Thư viện của tôi</p>
              {SIDEBAR_LINKS.map(({ icon: Icon, label, path, active }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active ? "bg-primary/10 text-primary font-semibold" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Bài viết đã lưu</h1>
              <p className="text-slate-400 mt-0.5">{saved.length} bài viết trong thư viện của bạn</p>
            </div>

            {/* Search & Tabs */}
            <div className="space-y-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Tìm kiếm bài đã lưu..."
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-primary/20 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm shadow-sm"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t ? "bg-primary text-slate-900" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/30"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Article Cards */}
            {filtered.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-16 text-center">
                <FiBookmark size={40} className="text-slate-200 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Chưa có bài viết nào</h3>
                <p className="text-sm text-slate-400 mb-5">Lưu những bài viết thú vị để đọc lại sau</p>
                <button onClick={() => navigate("/blog")} className="px-5 py-2.5 bg-primary text-slate-900 font-semibold rounded-xl text-sm hover:brightness-105 transition-all flex items-center gap-2 mx-auto">
                  Khám phá bài viết <FiArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(article => (
                  <div
                    key={article.id}
                    onClick={() => navigate(`/blog/${article.id}`)}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-primary/20"
                  >
                    <div className="flex gap-0">
                      <div className={`w-28 sm:w-36 shrink-0 bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                        <span className="text-white/20 text-5xl font-black">{article.category[0]}</span>
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-primary">{article.category}</span>
                              <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
                              <span className="text-xs text-slate-400">{article.date}</span>
                            </div>
                            <h3 className="font-bold text-slate-800 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">{article.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">{article.excerpt}</p>
                            <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                              <span>{article.author}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1"><FiClock size={11} /> {article.readTime} phút</span>
                            </div>
                          </div>
                          {/* Actions */}
                          <div className="flex gap-1 shrink-0">
                            <button onClick={e => e.stopPropagation()} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors" title="Chia sẻ">
                              <FiShare2 size={16} />
                            </button>
                            <button onClick={e => unsave(article.id, e)} className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-400 hover:text-rose-500 transition-colors" title="Bỏ lưu">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length > 0 && (
              <p className="text-center text-sm text-slate-400">Hiển thị {filtered.length} / {saved.length} bài đã lưu</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}