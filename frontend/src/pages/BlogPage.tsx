import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiBookmark, FiShare2, FiSearch, FiArrowRight } from "react-icons/fi";

const CATEGORIES = ["Tất cả", "Lo âu", "Trầm cảm", "Tự chăm sóc", "Giấc ngủ", "Cân bằng cuộc sống"];

const ARTICLES = [
  { id: 1, title: "5 kỹ thuật thở giúp kiểm soát cơn lo âu ngay lập tức", category: "Lo âu", readTime: 6, author: "TS. Nguyễn Minh Châu", date: "08/03/2025", excerpt: "Khi lo âu ập đến, cơ thể bạn phản ứng như đang đối mặt với mối nguy hiểm thực sự. Những kỹ thuật thở đơn giản này có thể giúp bạn lấy lại bình tĩnh trong vài phút.", tags: ["lo âu", "kỹ thuật thở", "CBT"], featured: true, color: "from-violet-500 to-indigo-600" },
  { id: 2, title: "Dấu hiệu bạn đang bỏ qua sức khỏe tâm thần của mình", category: "Tự chăm sóc", readTime: 8, author: "ThS. Trần Thị Hoa", date: "05/03/2025", excerpt: "Chúng ta thường chú ý đến sức khỏe thể chất nhưng lại bỏ qua những tín hiệu quan trọng từ tâm trí.", tags: ["sức khỏe tâm thần", "tự chăm sóc"], featured: false, color: "from-rose-400 to-pink-600" },
  { id: 3, title: "Tại sao giấc ngủ là nền tảng của sức khỏe tâm thần?", category: "Giấc ngủ", readTime: 7, author: "TS. Lê Văn Đức", date: "02/03/2025", excerpt: "Thiếu ngủ không chỉ làm bạn mệt mỏi — nó ảnh hưởng trực tiếp đến khả năng xử lý cảm xúc và tư duy.", tags: ["giấc ngủ", "tâm lý học"], featured: false, color: "from-blue-500 to-cyan-600" },
  { id: 4, title: "Mindfulness cho người bận rộn: 5 phút mỗi ngày", category: "Tự chăm sóc", readTime: 5, author: "ThS. Phạm Thu Trang", date: "28/02/2025", excerpt: "Bạn không cần 30 phút thiền định mỗi ngày. Đây là cách thực hành chánh niệm hiệu quả ngay cả khi bạn cực kỳ bận.", tags: ["mindfulness", "thiền định"], featured: false, color: "from-emerald-400 to-teal-600" },
  { id: 5, title: "Nhận biết và vượt qua trầm cảm nhẹ tại nhà", category: "Trầm cảm", readTime: 10, author: "TS. Nguyễn Minh Châu", date: "25/02/2025", excerpt: "Trầm cảm nhẹ ảnh hưởng đến hàng triệu người nhưng thường không được nhận biết đúng. Tìm hiểu các dấu hiệu và bước hành động đầu tiên.", tags: ["trầm cảm", "tâm lý trị liệu"], featured: false, color: "from-amber-400 to-orange-500" },
  { id: 6, title: "Ranh giới lành mạnh: Nói không mà không cảm thấy tội lỗi", category: "Cân bằng cuộc sống", readTime: 8, author: "ThS. Trần Thị Hoa", date: "20/02/2025", excerpt: "Thiết lập ranh giới không phải là ích kỷ — đó là hành động tự yêu thương bản thân và tôn trọng người khác.", tags: ["ranh giới", "tự trọng"], featured: false, color: "from-purple-400 to-violet-600" },
  { id: 7, title: "Căng thẳng công việc: Khi nào cần gặp chuyên gia tâm lý?", category: "Cân bằng cuộc sống", readTime: 6, author: "TS. Lê Văn Đức", date: "15/02/2025", excerpt: "Stress công việc bình thường hay burnout nguy hiểm? Đây là những dấu hiệu cho thấy bạn cần hỗ trợ chuyên nghiệp.", tags: ["burnout", "stress", "công việc"], featured: false, color: "from-sky-400 to-blue-600" },
];

export default function BlogPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = ARTICLES.filter(a => {
    const matchCat = activeCategory === "Tất cả" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = ARTICLES[0];
  const rest = filtered.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222]">
      {/* Hero */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Thư viện sức khỏe tâm thần</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Bài viết & Kiến thức</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">Khám phá kiến thức chuyên sâu từ các chuyên gia tâm lý hàng đầu về sức khỏe tinh thần</p>
          {/* Search */}
          <div className="relative max-w-md mx-auto mt-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full h-14 pl-11 pr-5 rounded-2xl border border-primary/20 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === c ? "bg-primary text-slate-900 shadow-sm" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary/30 hover:text-primary"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {activeCategory === "Tất cả" && !search && (
          <div
            onClick={() => navigate(`/blog/${featured.id}`)}
            className="relative rounded-3xl overflow-hidden cursor-pointer group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${featured.color} opacity-90`} />
            <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row gap-6 items-end">
              <div className="flex-1 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">✨ Bài nổi bật</span>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 group-hover:underline decoration-white/50">{featured.title}</h2>
                <p className="text-white/80 text-sm leading-relaxed max-w-xl">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mt-5 text-white/70 text-sm">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><FiClock size={14} /> {featured.readTime} phút đọc</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shrink-0">
                Đọc ngay <FiArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {search ? `Kết quả tìm kiếm "${search}"` : activeCategory === "Tất cả" ? "Bài viết mới nhất" : `Chủ đề: ${activeCategory}`}
            <span className="text-sm font-normal text-slate-400 ml-2">({filtered.length} bài)</span>
          </h2>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">Không tìm thấy bài viết phù hợp</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(search || activeCategory !== "Tất cả" ? filtered : rest).map(article => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/blog/${article.id}`)}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-primary/20"
                >
                  <div className={`h-40 bg-gradient-to-br ${article.color} flex items-center justify-center relative`}>
                    <span className="text-white/30 text-6xl font-black">{article.category[0]}</span>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-black/20 text-white text-xs rounded-full font-medium">{article.category}</span>
                    </div>
                    <button onClick={e => toggleSave(article.id, e)} className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 transition-colors">
                      <FiBookmark size={14} className={savedIds.includes(article.id) ? "text-amber-300 fill-amber-300" : "text-white"} />
                    </button>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-800 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>{article.author.split(". ")[1]?.split(" ").slice(-2).join(" ")}</span>
                      <span className="flex items-center gap-1"><FiClock size={12} /> {article.readTime} phút</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-br from-[#102222] to-slate-800 rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Nhận kiến thức mỗi tuần</h3>
          <p className="text-slate-300 mb-7 max-w-md mx-auto">Đăng ký newsletter để nhận bài viết chuyên sâu về sức khỏe tâm thần từ các chuyên gia của MindCare.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input placeholder="Email của bạn" className="flex-1 h-14 rounded-xl px-5 bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="h-14 px-7 bg-primary text-slate-900 font-bold rounded-xl hover:brightness-105 transition-all whitespace-nowrap">Đăng ký</button>
          </div>
        </div>
      </div>
    </div>
  );
}