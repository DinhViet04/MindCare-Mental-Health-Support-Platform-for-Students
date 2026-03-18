import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiClock, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CATEGORIES_LIST = [
  { slug: "lo-au", label: "Lo âu", count: 12, icon: "😰", color: "text-violet-500" },
  { slug: "tram-cam", label: "Trầm cảm", count: 9, icon: "😔", color: "text-blue-500" },
  { slug: "tu-cham-soc", label: "Tự chăm sóc", count: 15, icon: "🌿", color: "text-emerald-500" },
  { slug: "giac-ngu", label: "Giấc ngủ", count: 7, icon: "💤", color: "text-indigo-500" },
  { slug: "can-bang", label: "Cân bằng cuộc sống", count: 11, icon: "⚖️", color: "text-amber-500" },
  { slug: "quan-he", label: "Quan hệ & Giao tiếp", count: 8, icon: "💬", color: "text-rose-500" },
];

const ARTICLES_BY_CATEGORY: Record<string, any[]> = {
  "lo-au": [
    { id: 1, title: "5 kỹ thuật thở giúp kiểm soát cơn lo âu ngay lập tức", author: "TS. Nguyễn Minh Châu", date: "08/03/2025", readTime: 6, excerpt: "Những kỹ thuật thở đơn giản có thể giúp bạn lấy lại bình tĩnh trong vài phút.", color: "from-violet-500 to-indigo-600", featured: true },
    { id: 5, title: "Lo âu xã hội: Khi nỗi sợ phán xét kiểm soát cuộc sống bạn", author: "ThS. Trần Thị Hoa", date: "01/03/2025", readTime: 9, excerpt: "Lo âu xã hội khác hoàn toàn với sự nhút nhát bình thường. Tìm hiểu cách nhận biết và vượt qua.", color: "from-purple-500 to-violet-600", featured: false },
    { id: 6, title: "Liệu pháp CBT trong điều trị rối loạn lo âu", author: "TS. Nguyễn Minh Châu", date: "22/02/2025", readTime: 12, excerpt: "Liệu pháp Nhận thức Hành vi được chứng minh là phương pháp hiệu quả nhất để điều trị lo âu.", color: "from-indigo-500 to-blue-600", featured: false },
    { id: 7, title: "Phân biệt lo lắng bình thường và rối loạn lo âu", author: "TS. Lê Văn Đức", date: "15/02/2025", readTime: 7, excerpt: "Khi nào lo lắng trở thành vấn đề cần điều trị? Đây là những dấu hiệu bạn cần biết.", color: "from-violet-400 to-purple-600", featured: false },
    { id: 8, title: "Thiền định và lo âu: Bằng chứng khoa học", author: "ThS. Phạm Thu Trang", date: "08/02/2025", readTime: 8, excerpt: "Hơn 200 nghiên cứu xác nhận thiền định giảm triệu chứng lo âu. Đây là cách bắt đầu đúng.", color: "from-teal-400 to-emerald-600", featured: false },
  ],
  default: [
    { id: 2, title: "Dấu hiệu bạn đang bỏ qua sức khỏe tâm thần của mình", author: "ThS. Trần Thị Hoa", date: "05/03/2025", readTime: 8, excerpt: "Chúng ta thường bỏ qua những tín hiệu quan trọng từ tâm trí.", color: "from-rose-400 to-pink-600", featured: true },
    { id: 3, title: "Tại sao giấc ngủ là nền tảng của sức khỏe tâm thần?", author: "TS. Lê Văn Đức", date: "02/03/2025", readTime: 7, excerpt: "Thiếu ngủ ảnh hưởng trực tiếp đến khả năng xử lý cảm xúc.", color: "from-blue-500 to-cyan-600", featured: false },
    { id: 4, title: "Mindfulness cho người bận rộn: 5 phút mỗi ngày", author: "ThS. Phạm Thu Trang", date: "28/02/2025", readTime: 5, excerpt: "Bạn không cần 30 phút thiền định mỗi ngày.", color: "from-emerald-400 to-teal-600", featured: false },
  ]
};

const ITEMS_PER_PAGE = 4;

export default function BlogCategoryPage() {
  const navigate = useNavigate();
  const { slug = "lo-au" } = useParams();
  const [page, setPage] = useState(1);

  const articles = ARTICLES_BY_CATEGORY[slug] || ARTICLES_BY_CATEGORY.default;
  const currentCategory = CATEGORIES_LIST.find(c => c.slug === slug) || CATEGORIES_LIST[0];
  const featured = articles[0];
  const rest = articles.slice(1);
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
  const paginated = rest.slice((page-1)*ITEMS_PER_PAGE, page*ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222]">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <button onClick={() => navigate("/blog")} className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors text-sm mb-5">
            <FiChevronLeft size={16} /> Tất cả chủ đề
          </button>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{currentCategory.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{currentCategory.label}</h1>
              <p className="text-slate-400 mt-0.5">{currentCategory.count} bài viết</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured */}
            {featured && (
              <div>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Bài nổi bật</h2>
                <div
                  onClick={() => navigate(`/blog/${featured.id}`)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-all"
                >
                  <div className={`h-64 bg-gradient-to-br ${featured.color} flex items-end`}>
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:underline decoration-white/50">{featured.title}</h3>
                      <p className="text-white/80 text-sm mb-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-3 text-white/60 text-xs">
                        <span>{featured.author}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><FiClock size={11} /> {featured.readTime} phút đọc</span>
                        <span>·</span>
                        <span>{featured.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid 2 col */}
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Tất cả bài viết</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {paginated.map(a => (
                  <div
                    key={a.id}
                    onClick={() => navigate(`/blog/${a.id}`)}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-primary/20"
                  >
                    <div className={`h-36 bg-gradient-to-br ${a.color} relative flex items-center justify-center`}>
                      <span className="text-white/20 text-6xl font-black">{currentCategory.label[0]}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-800 dark:text-white leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">{a.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">{a.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{a.author.split(". ")[1]?.split(" ").slice(-2).join(" ")}</span>
                        <span className="flex items-center gap-1"><FiClock size={11} /> {a.readTime} phút</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 py-4">
                <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} className="p-2 rounded-xl border border-slate-200 dark:border-slate-600 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><FiChevronLeft size={16}/></button>
                {Array.from({length: totalPages}, (_,i) => (
                  <button key={i} onClick={() => setPage(i+1)} className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${page===i+1 ? "bg-primary text-slate-900" : "border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"}`}>{i+1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages} className="p-2 rounded-xl border border-slate-200 dark:border-slate-600 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><FiChevronRight size={16}/></button>
              </div>
            )}
          </div>

          {/* Sidebar Categories */}
          <aside className="lg:col-span-1 space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4">Tất cả chủ đề</h3>
              <div className="space-y-1">
                {CATEGORIES_LIST.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => { navigate(`/blog/category/${cat.slug}`); setPage(1); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                      cat.slug === slug
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.label}
                    </span>
                    <span className={`text-xs ${cat.slug === slug ? "text-primary" : "text-slate-400"}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-violet-50 dark:from-primary/5 dark:to-violet-900/10 border border-primary/20 rounded-2xl p-5">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2">Cần tư vấn chuyên sâu?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Đặt lịch với chuyên gia tâm lý hàng đầu của MindCare</p>
              <button onClick={() => navigate("/experts")} className="w-full flex items-center justify-center gap-2 h-10 bg-primary text-slate-900 text-sm font-bold rounded-xl hover:brightness-105 transition-all">
                Tìm chuyên gia <FiArrowRight size={14} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}