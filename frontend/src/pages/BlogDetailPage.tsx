import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft, FiClock, FiBookmark, FiShare2, FiArrowRight, FiCheck } from "react-icons/fi";
import { FiTwitter, FiFacebook, FiLink } from "react-icons/fi";

const ARTICLE = {
  id: 1,
  title: "5 kỹ thuật thở giúp kiểm soát cơn lo âu ngay lập tức",
  category: "Lo âu",
  readTime: 6,
  author: "TS. Nguyễn Minh Châu",
  authorRole: "Chuyên gia Trị liệu Tâm lý · 15 năm kinh nghiệm",
  date: "08/03/2025",
  tags: ["lo âu", "kỹ thuật thở", "CBT", "thiền định"],
  excerpt: "Khi lo âu ập đến, cơ thể bạn phản ứng như đang đối mặt với mối nguy hiểm thực sự. Những kỹ thuật thở đơn giản này có thể giúp bạn lấy lại bình tĩnh trong vài phút.",
  content: [
    { type: "lead", text: "Lo âu là một trong những vấn đề sức khỏe tâm thần phổ biến nhất hiện nay. Khi cơn lo âu ập đến, hệ thần kinh giao cảm kích hoạt phản ứng \"chiến đấu hoặc bỏ chạy\", khiến nhịp tim tăng nhanh, hơi thở nông và ngắn." },
    { type: "h2", text: "Tại sao kỹ thuật thở lại hiệu quả?" },
    { type: "p", text: "Hơi thở là cầu nối duy nhất giữa hệ thần kinh tự chủ (không thể kiểm soát chủ động) và ý thức của chúng ta. Khi thở chậm lại, bạn kích hoạt hệ thần kinh phó giao cảm — hệ thống \"nghỉ ngơi và tiêu hóa\" — giúp cơ thể bình tĩnh trở lại." },
    { type: "h2", text: "5 kỹ thuật thở bạn nên thử" },
    { type: "h3", text: "1. Thở 4-7-8 (Kỹ thuật thở thư giãn)" },
    { type: "p", text: "Hít vào trong 4 giây, giữ hơi 7 giây, thở ra từ từ trong 8 giây. Lặp lại 4 lần. Kỹ thuật này được phát triển bởi Dr. Andrew Weil và được chứng minh giảm lo âu nhanh chóng." },
    { type: "h3", text: "2. Thở hộp (Box Breathing)" },
    { type: "p", text: "Hít vào 4 giây → Giữ 4 giây → Thở ra 4 giây → Giữ 4 giây. Kỹ thuật này được Navy SEALs sử dụng để duy trì bình tĩnh trong áp lực cao." },
    { type: "h3", text: "3. Thở bụng (Diaphragmatic Breathing)" },
    { type: "p", text: "Đặt tay lên bụng, hít vào để bụng phồng lên (không phải ngực). Thở ra chậm, để bụng xẹp xuống. Thở bụng kích hoạt dây thần kinh phế vị, trực tiếp giảm lo âu." },
    { type: "h3", text: "4. Thở luân phiên mũi (Nadi Shodhana)" },
    { type: "p", text: "Dùng ngón tay bịt một bên mũi, hít qua bên còn lại, sau đó đổi bên khi thở ra. Kỹ thuật yoga này cân bằng hai bán cầu não và làm dịu tâm trí." },
    { type: "h3", text: "5. Thở 5-5 (Coherent Breathing)" },
    { type: "p", text: "Hít vào 5 giây, thở ra 5 giây — liên tục trong 5-10 phút. Nghiên cứu cho thấy nhịp thở 6 lần/phút này tối ưu hóa Heart Rate Variability (HRV), chỉ số quan trọng của sức khỏe thần kinh." },
    { type: "h2", text: "Khi nào nên thực hành?" },
    { type: "p", text: "Đừng chờ đến khi lo âu cực điểm mới thực hành. Hãy thực hành 5-10 phút mỗi sáng để xây dựng thói quen. Khi đã quen, cơ thể sẽ phản ứng nhanh hơn khi cần." },
    { type: "callout", text: "💡 Mẹo chuyên gia: Kết hợp kỹ thuật thở với nhắc nhở trên điện thoại 3 lần/ngày để xây dựng thói quen bền vững trong 21 ngày đầu." },
  ],
};

const RELATED = [
  { id: 2, title: "Dấu hiệu bạn đang bỏ qua sức khỏe tâm thần", category: "Tự chăm sóc", readTime: 8, color: "from-rose-400 to-pink-600" },
  { id: 3, title: "Tại sao giấc ngủ là nền tảng của sức khỏe tâm thần?", category: "Giấc ngủ", readTime: 7, color: "from-blue-500 to-cyan-600" },
  { id: 4, title: "Mindfulness cho người bận rộn: 5 phút mỗi ngày", category: "Tự chăm sóc", readTime: 5, color: "from-emerald-400 to-teal-600" },
];

export default function BlogDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <button onClick={() => navigate("/blog")} className="hover:text-white transition-colors">Blog</button>
            <span>/</span>
            <span className="text-white/90">{ARTICLE.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">{ARTICLE.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-6 leading-relaxed">{ARTICLE.excerpt}</p>
          <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">NMC</div>
              <div>
                <p className="text-white font-medium">{ARTICLE.author}</p>
                <p className="text-white/60 text-xs">{ARTICLE.authorRole}</p>
              </div>
            </div>
            <span>·</span>
            <span>{ARTICLE.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><FiClock size={14} /> {ARTICLE.readTime} phút đọc</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8">
              {ARTICLE.content.map((block, i) => {
                if (block.type === "lead") return <p key={i} className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{block.text}</p>;
                if (block.type === "h2") return <h2 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">{block.text}</h2>;
                if (block.type === "h3") return <h3 key={i} className="text-base font-bold text-slate-800 dark:text-white mt-5 mb-2">{block.text}</h3>;
                if (block.type === "p") return <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed">{block.text}</p>;
                if (block.type === "callout") return (
                  <div key={i} className="p-5 bg-primary/5 border-l-4 border-primary rounded-r-xl my-6">
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{block.text}</p>
                  </div>
                );
                return null;
              })}
            </div>

            {/* Tags & Share */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {ARTICLE.tags.map(t => (
                  <span key={t} onClick={() => navigate(`/blog/category/${t}`)} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">#{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Chia sẻ:</span>
                <button className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition-colors"><FiFacebook size={18} /></button>
                <button className="p-2 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 text-sky-500 transition-colors"><FiTwitter size={18} /></button>
                <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                  {copied ? <FiCheck size={18} className="text-emerald-500" /> : <FiLink size={18} />}
                </button>
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 flex gap-5 items-start">
              <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 font-bold text-lg shrink-0">NMC</div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 dark:text-white">{ARTICLE.author}</p>
                <p className="text-sm text-slate-400 mb-2">{ARTICLE.authorRole}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Tiến sĩ Tâm lý học tại Đại học Quốc gia TP.HCM, chuyên gia về Liệu pháp Nhận thức Hành vi (CBT) và Mindfulness-Based Cognitive Therapy (MBCT).</p>
                <button onClick={() => navigate("/experts/1")} className="mt-3 text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                  Xem trang chuyên gia <FiArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Related Articles */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Bài viết liên quan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {RELATED.map(r => (
                  <div key={r.id} onClick={() => navigate(`/blog/${r.id}`)} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className={`h-28 bg-gradient-to-br ${r.color} relative`}>
                      <span className="absolute inset-0 flex items-center justify-center text-white/20 text-5xl font-black">{r.category[0]}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-primary font-semibold mb-1">{r.category}</p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">{r.title}</p>
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><FiClock size={11} /> {r.readTime} phút</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:col-span-1">
            {/* Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5 space-y-3">
              <button onClick={() => setSaved(!saved)} className={`w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all ${saved ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-600"}`}>
                <FiBookmark size={16} className={saved ? "fill-amber-500" : ""} />
                {saved ? "Đã lưu" : "Lưu bài viết"}
              </button>
              <button onClick={() => navigate("/experts/1")} className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-slate-900 text-sm font-bold hover:brightness-105 transition-all">
                Đặt lịch tư vấn <FiArrowRight size={14} />
              </button>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-primary/10 to-violet-50 dark:from-primary/5 dark:to-violet-900/10 border border-primary/20 rounded-2xl p-5">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2">📧 Nhận bài mới nhất</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Mỗi tuần một bài về sức khỏe tâm thần</p>
              <input placeholder="Email của bạn" className="w-full h-10 px-3 rounded-xl text-sm border border-primary/20 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2" />
              <button className="w-full h-10 bg-primary text-slate-900 text-sm font-bold rounded-xl hover:brightness-105 transition-all">Đăng ký</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}