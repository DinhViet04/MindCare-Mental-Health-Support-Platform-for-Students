import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar, FiClock, FiUser, FiFileText, FiDownload,
  FiRefreshCw, FiSearch, FiChevronLeft, FiChevronRight, FiVideo
} from "react-icons/fi";

const SESSIONS = [
  { id: "S-001", expert: "TS. Nguyễn Minh Châu", specialty: "Trị liệu tâm lý", date: "12/02/2025", time: "09:00", duration: 60, topic: "Quản lý lo âu", status: "completed", rating: 5, avatar: "NMC" },
  { id: "S-002", expert: "ThS. Trần Thị Hoa", specialty: "Tư vấn hôn nhân", date: "05/02/2025", time: "14:00", duration: 45, topic: "Giao tiếp trong gia đình", status: "completed", rating: 4, avatar: "TTH" },
  { id: "S-003", expert: "TS. Lê Văn Đức", specialty: "Tâm lý học trẻ em", date: "28/01/2025", time: "10:30", duration: 60, topic: "Căng thẳng học tập", status: "completed", rating: 5, avatar: "LVD" },
  { id: "S-004", expert: "TS. Nguyễn Minh Châu", specialty: "Trị liệu tâm lý", date: "20/01/2025", time: "09:00", duration: 60, topic: "Kỹ thuật thư giãn", status: "completed", rating: 4, avatar: "NMC" },
  { id: "S-005", expert: "ThS. Phạm Thu Trang", specialty: "Tư vấn nghề nghiệp", date: "10/01/2025", time: "16:00", duration: 45, topic: "Định hướng sự nghiệp", status: "cancelled", rating: 0, avatar: "PTT" },
  { id: "S-006", expert: "TS. Nguyễn Minh Châu", specialty: "Trị liệu tâm lý", date: "03/01/2025", time: "09:00", duration: 60, topic: "CBT — Buổi 1", status: "completed", rating: 5, avatar: "NMC" },
];

const TABS = ["Tất cả", "Đã hoàn thành", "Đã hủy"];
const ITEMS_PER_PAGE = 4;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={s <= rating ? "text-amber-400" : "text-slate-200"}>★</span>
      ))}
    </div>
  );
}

export default function ConsultationHistoryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = SESSIONS.filter(s => {
    const matchTab = tab === "Tất cả" || (tab === "Đã hoàn thành" && s.status === "completed") || (tab === "Đã hủy" && s.status === "cancelled");
    const matchSearch = s.expert.toLowerCase().includes(search.toLowerCase()) || s.topic.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const stats = [
    { label: "Tổng buổi tư vấn", value: "24", icon: FiVideo, color: "text-primary" },
    { label: "Tổng thời gian", value: "18.5h", icon: FiClock, color: "text-violet-500" },
    { label: "Chuyên gia đã gặp", value: "3", icon: FiUser, color: "text-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8f8] dark:bg-[#102222] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Lịch sử tư vấn</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Xem lại tất cả các buổi tư vấn của bạn</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Tìm theo chuyên gia, chủ đề..."
                className="w-full pl-10 pr-4 h-11 rounded-xl border border-primary/20 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>
            {/* Tabs */}
            <div className="flex gap-2">
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === t ? "bg-primary text-slate-900" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary/10"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left py-3 px-2 font-medium">Chuyên gia</th>
                  <th className="text-left py-3 px-2 font-medium">Chủ đề</th>
                  <th className="text-left py-3 px-2 font-medium">Ngày</th>
                  <th className="text-left py-3 px-2 font-medium">Thời lượng</th>
                  <th className="text-left py-3 px-2 font-medium">Đánh giá</th>
                  <th className="text-left py-3 px-2 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-10 text-slate-400">Không có buổi tư vấn nào</td></tr>
                )}
                {paginated.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{s.avatar}</div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{s.expert}</p>
                          <p className="text-xs text-slate-400">{s.specialty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-slate-600 dark:text-slate-300">{s.topic}</td>
                    <td className="py-4 px-2">
                      <div className="text-slate-600 dark:text-slate-300">{s.date}</div>
                      <div className="text-xs text-slate-400">{s.time}</div>
                    </td>
                    <td className="py-4 px-2 text-slate-600 dark:text-slate-300">{s.duration} phút</td>
                    <td className="py-4 px-2">
                      {s.status === "completed" ? <StarRating rating={s.rating} /> : (
                        <span className="text-xs text-rose-400 font-medium">Đã hủy</span>
                      )}
                    </td>
                    <td className="py-4 px-2">
                      {s.status === "completed" ? (
                        <div className="flex gap-2">
                          <button onClick={() => navigate(`/bookings/${s.id}/notes`)} className="p-2 rounded-lg hover:bg-primary/10 text-primary" title="Ghi chú"><FiFileText size={16} /></button>
                          <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" title="Tải hóa đơn"><FiDownload size={16} /></button>
                          <button onClick={() => navigate(`/experts/1`)} className="p-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 text-violet-500" title="Đặt lại"><FiRefreshCw size={16} /></button>
                        </div>
                      ) : (
                        <button onClick={() => navigate(`/experts`)} className="text-xs text-primary hover:underline font-medium">Đặt lịch mới</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-slate-400">Hiển thị {(page-1)*ITEMS_PER_PAGE+1}–{Math.min(page*ITEMS_PER_PAGE, filtered.length)} / {filtered.length} buổi</p>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700"><FiChevronLeft size={16} /></button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i+1)} className={`w-9 h-9 rounded-lg text-sm font-medium ${page === i+1 ? "bg-primary text-slate-900" : "border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"}`}>{i+1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700"><FiChevronRight size={16} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}