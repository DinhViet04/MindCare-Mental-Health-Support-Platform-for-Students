import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Resource {
    id: string;
    title: string;
    description: string;
    icon: string;
    tag: string;
}

const RESOURCES: Resource[] = [
    { id: '1', title: 'Hướng dẫn kỹ thuật 5-4-3-2-1', description: 'Bài tập âm thanh 5 phút để bình tĩnh ngay lập tức.', icon: 'play_circle', tag: 'Bài tập âm thanh • 5 phút' },
    { id: '2', title: 'Hiểu về cảm xúc kích hoạt', description: 'Bài viết ngắn về cách nhận biết cảm xúc kích hoạt sớm.', icon: 'menu_book', tag: 'Đọc • 8 phút' },
    { id: '3', title: 'Bài tập thở buổi sáng', description: 'Thói quen khởi đầu ngày mới với sự tập trung và rõ ràng.', icon: 'self_improvement', tag: 'Hoạt động • Hàng ngày' },
    { id: '4', title: 'Nhật ký phản chiếu', description: 'Danh sách câu hỏi gợi ý suy ngẫm sau buổi hẹn.', icon: 'forum', tag: 'Mẫu • PDF' },
];

const SessionNotesPage: React.FC = () => {
    const [personalNotes, setPersonalNotes] = useState(
        'Tôi cảm thấy thoải mái hơn sau bài tập thở. Tôi nhận thấy tác nhân chính tuần này là deadline vào thứ Tư. TS. Lan đề nghị tôi thử kỹ thuật tiếp đất khi tim đập nhanh trong các cuộc họp. Tôi muốn thử viết nhật ký về ẩn dụ "đám mây" tối nay.'
    );

    return (
        <div className="min-h-screen bg-[#f6f8f8] font-sans">
            {/* Header */}
            <header className="border-b border-[#13ecec]/20 bg-[#f6f8f8] px-10 py-3 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#13ecec] text-3xl">psychology</span>
                    <span className="text-lg font-bold text-slate-900">MindCare</span>
                </div>
                <div className="flex items-center gap-8">
                    <nav className="flex items-center gap-9">
                        <Link to="/consultations/history" className="text-sm text-slate-700 hover:text-[#13ecec] transition-colors">Buổi hẹn</Link>
                        <Link to="/consultations/1/notes" className="text-sm font-bold text-[#13ecec] border-b-2 border-[#13ecec]">Ghi chú</Link>
                        <Link to="/consultations/1/room" className="text-sm text-slate-700 hover:text-[#13ecec] transition-colors">Tài nguyên</Link>
                    </nav>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-lg bg-[#13ecec]/10 hover:bg-[#13ecec]/20 transition-all flex items-center justify-center" title="In">
                            <span className="material-symbols-outlined">print</span>
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-[#13ecec]/10 hover:bg-[#13ecec]/20 transition-all flex items-center justify-center" title="Tải xuống">
                            <span className="material-symbols-outlined">download</span>
                        </button>
                    </div>
                    <img src="https://i.pravatar.cc/40?img=12" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#13ecec]/30" />
                </div>
            </header>

            <main className="flex justify-center py-5">
                <div className="w-full max-w-[960px] px-4 md:px-10">
                    {/* Breadcrumb */}
                    <div className="flex gap-2 py-4 text-base">
                        <Link to="/consultations/history" className="text-[#13ecec]/80 hover:underline">Buổi hẹn</Link>
                        <span className="text-[#13ecec]/80">/</span>
                        <span className="text-slate-600">Ghi chú buổi hẹn - 12/10</span>
                    </div>

                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-end gap-3 py-4">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-slate-900">Tóm tắt buổi tư vấn</h1>
                            <p className="text-slate-500 mt-1">Buổi hẹn với TS. Lan • 12 tháng 10, 2023 • 50 phút</p>
                        </div>
                        <button className="flex items-center gap-2 h-10 px-4 bg-[#13ecec] text-slate-900 rounded-lg text-sm font-bold hover:brightness-110 transition-all">
                            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                            Xuất PDF
                        </button>
                    </div>

                    {/* Expert Summary Card */}
                    <section className="mt-8">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-[#13ecec]">verified_user</span>
                            <h2 className="text-[22px] font-bold text-slate-900">Tóm tắt từ chuyên gia</h2>
                        </div>
                        <div className="rounded-xl border border-[#13ecec]/20 shadow-sm bg-white overflow-hidden flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('https://i.pravatar.cc/400?img=47')" }} />
                            <div className="flex-1 p-6 flex flex-col gap-4">
                                <p className="text-lg font-bold text-slate-900">Nhận xét chính từ TS. Nguyễn Thị Lan</p>
                                <div className="flex flex-col gap-3">
                                    <p className="text-slate-600 leading-relaxed">
                                        Hôm nay chúng ta tập trung vào kỹ thuật tiếp đất và nhận diện các yếu tố gây lo lắng. Bạn đã thể hiện tiến bộ rõ rệt trong bài tập thở có ý thức so với buổi trước.
                                    </p>
                                    <div className="bg-[#13ecec]/5 border-l-4 border-[#13ecec] p-3 rounded-r-lg">
                                        <p className="text-slate-800 text-sm font-semibold italic">
                                            "Hãy nhớ: Suy nghĩ của bạn như những đám mây trôi qua bầu trời. Bạn là bầu trời, không phải đám mây."
                                        </p>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">
                                        TS. Lan khuyến nghị thực hành kỹ thuật 5-4-3-2-1 hai lần mỗi ngày, đặc biệt trong lúc di chuyển buổi sáng và trước khi ngủ.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Personal Notes */}
                    <section className="mt-10">
                        <div className="flex items-center justify-between mb-4 px-4">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#13ecec]">edit_note</span>
                                <h2 className="text-[22px] font-bold text-slate-900">Ghi chú cá nhân</h2>
                            </div>
                            <button className="text-[#13ecec] text-sm font-bold flex items-center gap-1 hover:underline">
                                <span className="material-symbols-outlined text-sm">save</span> Đã lưu tự động
                            </button>
                        </div>
                        <div className="px-4">
                            <textarea
                                value={personalNotes}
                                onChange={e => setPersonalNotes(e.target.value)}
                                className="w-full min-h-[200px] rounded-xl border border-[#13ecec]/20 bg-white p-4 text-slate-700 focus:ring-2 focus:ring-[#13ecec] focus:border-transparent outline-none resize-none transition-all"
                                placeholder="Ghi lại suy nghĩ, cảm nhận của bạn từ buổi hẹn..."
                            />
                        </div>
                    </section>

                    {/* Resources */}
                    <section className="mt-10 mb-20 px-4">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-[#13ecec]">auto_awesome</span>
                            <h2 className="text-[22px] font-bold text-slate-900">Tài nguyên được khuyến nghị</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {RESOURCES.map(res => (
                                <div key={res.id} className="flex items-start gap-4 p-4 rounded-xl border border-[#13ecec]/10 bg-white hover:border-[#13ecec]/40 transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-lg bg-[#13ecec]/20 flex items-center justify-center text-[#13ecec] group-hover:bg-[#13ecec] group-hover:text-slate-900 transition-colors flex-shrink-0">
                                        <span className="material-symbols-outlined text-2xl">{res.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{res.title}</h3>
                                        <p className="text-slate-500 text-sm mt-1">{res.description}</p>
                                        <div className="mt-2 inline-flex items-center text-xs font-bold text-[#13ecec] tracking-wider uppercase">{res.tag}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Footer Action */}
                    <div className="border-t border-[#13ecec]/20 py-10 flex flex-col items-center text-center gap-4">
                        <p className="text-slate-500 max-w-md">Buổi hẹn tiếp theo vào <strong>19 tháng 10, 2023 lúc 10:00 SA</strong>. Muốn đặt lại lịch?</p>
                        <div className="flex gap-4">
                            <Link to="/bookings/1/reschedule" className="bg-[#13ecec]/10 text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-[#13ecec]/20 transition-all">Đặt lại lịch</Link>
                            <button className="bg-[#13ecec] text-slate-900 px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all">Nhắn TS. Lan</button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-slate-100 border-t border-[#13ecec]/10 py-6 text-center text-slate-500 text-sm">
                <p>© 2024 MindCare Health. Tất cả dữ liệu buổi hẹn được mã hóa và bảo mật.</p>
            </footer>
        </div>
    );
};

export default SessionNotesPage;