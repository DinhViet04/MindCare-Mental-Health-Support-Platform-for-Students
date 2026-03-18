import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiCheck } from "react-icons/fi";

const APPRECIATION_TAGS = [
  "Lắng nghe tốt", "Đồng cảm", "Giải thích rõ ràng",
  "Kiên nhẫn", "Chuyên nghiệp", "Tạo sự thoải mái",
  "Thực tế & hữu ích", "Không phán xét",
];

export default function SessionFeedbackPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(4);
  const [hovered, setHovered] = useState(0);
  const [tags, setTags] = useState<string[]>(["Đồng cảm", "Lắng nghe tốt"]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (t: string) => setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const ratingLabels = ["", "Kém", "Không tốt", "Bình thường", "Tốt", "Xuất sắc"];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222] flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <FiCheck size={36} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cảm ơn bạn!</h2>
          <p className="text-slate-500 dark:text-slate-400">Phản hồi của bạn giúp chúng tôi cải thiện chất lượng dịch vụ tư vấn.</p>
          <button onClick={() => navigate("/consultations/history")} className="w-full h-12 bg-primary text-slate-900 font-bold rounded-xl hover:brightness-105 transition-all">
            Về lịch sử phiên tư vấn
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222] py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm">
          <FiChevronLeft size={18} /> Quay lại
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Đánh giá buổi tư vấn</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Chia sẻ trải nghiệm của bạn về buổi tư vấn vừa rồi</p>
          </div>

          {/* Expert Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">NMC</div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">TS. Nguyễn Minh Châu</p>
              <p className="text-sm text-slate-400">12/02/2025 · 09:00 · 60 phút · Quản lý lo âu</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="space-y-3">
            <label className="block font-semibold text-slate-800 dark:text-white">Đánh giá tổng thể</label>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)}
                    className={`text-4xl transition-transform hover:scale-110 ${s <= (hovered || rating) ? "text-amber-400" : "text-slate-200 dark:text-slate-600"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {(hovered || rating) > 0 && (
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {ratingLabels[hovered || rating]}
                </span>
              )}
            </div>
          </div>

          {/* Appreciation Tags */}
          <div className="space-y-3">
            <label className="block font-semibold text-slate-800 dark:text-white">Bạn đặc biệt đánh giá cao điều gì?</label>
            <div className="flex flex-wrap gap-2">
              {APPRECIATION_TAGS.map(t => (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tags.includes(t)
                      ? "bg-primary text-slate-900 shadow-sm shadow-primary/20"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary"
                    }`}
                >
                  {tags.includes(t) && <span className="mr-1">✓</span>}
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-800 dark:text-white">Nhận xét thêm <span className="text-slate-400 font-normal">(tùy chọn)</span></label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={4}
              placeholder="Chia sẻ thêm về trải nghiệm của bạn, điều gì hữu ích nhất, hoặc đề xuất cải thiện..."
              className="w-full resize-none rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 p-4 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed"
            />
            <p className="text-xs text-slate-400 text-right">{comment.length}/500</p>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-primary/5 border border-primary/15 rounded-xl text-sm text-slate-600 dark:text-slate-300">
            🔒 Phản hồi của bạn được bảo mật. Chuyên gia sẽ nhận được bản tóm tắt ẩn danh để cải thiện dịch vụ.
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={() => navigate(-1)} className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Để sau
            </button>
            <button
              onClick={() => setSubmitted(true)}
              disabled={rating === 0}
              className="flex-1 h-12 bg-primary text-slate-900 font-bold rounded-xl hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}