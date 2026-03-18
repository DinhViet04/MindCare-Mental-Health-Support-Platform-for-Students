import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
    id: string;
    sender: 'doctor' | 'me';
    senderName?: string;
    content: string;
    time: string;
    type: 'text' | 'file';
    fileName?: string;
    fileSize?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
    { id: '1', sender: 'doctor', senderName: 'TS. Lan', content: 'Xin chào bạn, tôi vừa chia sẻ hướng dẫn bài tập thở. Hãy xem qua nhé.', time: '14:05', type: 'text' },
    { id: '2', sender: 'doctor', senderName: 'TS. Lan', content: '', time: '14:07', type: 'file', fileName: 'Bai_tap_tho_bung.pdf', fileSize: '1.2 MB' },
    { id: '3', sender: 'me', content: 'Cảm ơn bác sĩ, tài liệu này rất hữu ích. Em sẽ bắt đầu với bước đầu tiên.', time: '14:12', type: 'text' },
    { id: '4', sender: 'doctor', senderName: 'TS. Lan', content: 'Bạn đang cảm thấy như thế nào khi bắt đầu buổi hôm nay?', time: '14:15', type: 'text' },
];

type SidebarTab = 'chat' | 'notes' | 'resources';

const ConsultationRoomPage: React.FC = () => {
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState(42 * 60 + 15);
    const [voiceOnly, setVoiceOnly] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [camOn, setCamOn] = useState(true);
    const [activeTab, setActiveTab] = useState<SidebarTab>('chat');
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [notes, setNotes] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(t => Math.max(0, t - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const formatTime = (s: number) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;
        const now = new Date();
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', content: inputText, time, type: 'text' }]);
        setInputText('');
    };

    return (
        <div className="h-screen flex flex-col bg-[#f6f8f8] font-sans overflow-hidden">
            {/* Header */}
            <header className="h-16 flex items-center justify-between border-b border-[#13ecec]/20 bg-white/80 backdrop-blur-md px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#13ecec] flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-900 text-2xl">psychology</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none tracking-tight text-slate-900">Phòng MindCare</h1>
                        <p className="text-xs text-slate-500">Phiên được mã hóa AES-256</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-sm font-semibold text-slate-900">Phiên: #MC-9402</span>
                        <span className="text-xs text-[#13ecec] font-medium">{formatTime(timeRemaining)} còn lại</span>
                    </div>
                    <div className="h-8 w-px bg-slate-200 mx-2" />
                    <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#13ecec]/20 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <button onClick={() => navigate('/consultations/1/feedback')} className="h-10 flex items-center gap-2 rounded-lg bg-red-500 px-4 text-sm font-bold text-white hover:bg-red-600 transition-colors">
                        <span className="material-symbols-outlined text-sm">call_end</span>
                        Kết thúc
                    </button>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                {/* Video Area */}
                <div className="relative flex flex-1 flex-col p-4">
                    <div className="relative flex flex-1 overflow-hidden rounded-xl bg-slate-900 shadow-inner group">
                        {/* Remote video */}
                        {!voiceOnly && (
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.pravatar.cc/800?img=47')" }} />
                        )}
                        {voiceOnly && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800">
                                <div className="w-24 h-24 rounded-full bg-[#13ecec]/20 flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-[#13ecec] text-5xl">person</span>
                                </div>
                                <p className="text-white font-semibold">TS. Nguyễn Thị Lan</p>
                                <p className="text-slate-400 text-sm">Chế độ chỉ âm thanh</p>
                            </div>
                        )}

                        {/* Connection Status */}
                        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-medium text-white">TS. Nguyễn Thị Lan (Ổn định)</span>
                        </div>

                        {/* Self PiP */}
                        <div className="absolute bottom-6 right-6 w-48 h-32 md:w-60 md:h-40 overflow-hidden rounded-lg border-2 border-white/20 bg-slate-800 shadow-xl">
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://i.pravatar.cc/240?img=12')" }} />
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                                {!micOn && <span className="material-symbols-outlined text-[12px]">mic_off</span>}
                                Bạn
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-2xl bg-slate-900/80 px-6 py-4 backdrop-blur-xl">
                            {[
                                { icon: micOn ? 'mic' : 'mic_off', action: () => setMicOn(v => !v), active: micOn },
                                { icon: camOn ? 'videocam' : 'videocam_off', action: () => setCamOn(v => !v), active: camOn },
                                { icon: 'present_to_all', action: () => { }, active: false },
                            ].map((btn, i) => (
                                <button key={i} onClick={btn.action} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${btn.active ? 'bg-[#13ecec] text-slate-900' : 'bg-slate-700 text-white hover:bg-[#13ecec] hover:text-slate-900'}`}>
                                    <span className="material-symbols-outlined">{btn.icon}</span>
                                </button>
                            ))}
                            <div className="h-8 w-px bg-slate-600" />
                            {['front_hand', 'emoji_emotions'].map(icon => (
                                <button key={icon} className="w-12 h-12 rounded-full bg-slate-700 text-white hover:bg-[#13ecec] hover:text-slate-900 flex items-center justify-center transition-all">
                                    <span className="material-symbols-outlined">{icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Voice Only Toggle */}
                    <div className="mt-4 flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#13ecec]">record_voice_over</span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Chế độ chỉ âm thanh</p>
                                <p className="text-xs text-slate-500">Tắt video để tiết kiệm băng thông</p>
                            </div>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" checked={voiceOnly} onChange={e => setVoiceOnly(e.target.checked)} className="sr-only peer" />
                            <div className="w-11 h-6 rounded-full bg-slate-200 peer-checked:bg-[#13ecec] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="w-96 flex flex-col border-l border-[#13ecec]/20 bg-white flex-shrink-0">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-100">
                        {([['chat', 'Chat'], ['notes', 'Ghi chú'], ['resources', 'Tài nguyên']] as [SidebarTab, string][]).map(([id, label]) => (
                            <button key={id} onClick={() => setActiveTab(id)} className={`flex-1 py-4 text-sm transition-colors ${activeTab === id ? 'border-b-2 border-[#13ecec] font-bold text-slate-900' : 'font-medium text-slate-400 hover:text-slate-600'}`}>
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Chat Tab */}
                    {activeTab === 'chat' && (
                        <>
                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                                <div className="relative flex items-center py-2">
                                    <div className="flex-grow border-t border-slate-100" />
                                    <span className="mx-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Hôm nay</span>
                                    <div className="flex-grow border-t border-slate-100" />
                                </div>
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex flex-col gap-2 ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                        {msg.sender === 'doctor' && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-[#13ecec]/20 flex items-center justify-center">
                                                    <span className="text-[10px] font-bold text-slate-900">TL</span>
                                                </div>
                                                <span className="text-xs font-semibold text-slate-500">{msg.senderName} • {msg.time}</span>
                                            </div>
                                        )}
                                        {msg.sender === 'me' && (
                                            <span className="text-xs font-semibold text-slate-500">Bạn • {msg.time}</span>
                                        )}
                                        {msg.type === 'text' && (
                                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${msg.sender === 'me' ? 'bg-[#13ecec] text-slate-900 rounded-tr-none font-medium' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                                                {msg.content}
                                            </div>
                                        )}
                                        {msg.type === 'file' && (
                                            <div className="flex items-center gap-3 rounded-xl border border-[#13ecec]/30 bg-[#13ecec]/5 p-3 w-full max-w-[85%]">
                                                <div className="w-10 h-10 rounded-lg bg-[#13ecec] text-slate-900 flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined">description</span>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold truncate">{msg.fileName}</p>
                                                    <p className="text-[10px] text-slate-500">{msg.fileSize} • PDF</p>
                                                </div>
                                                <button className="ml-auto text-[#13ecec] hover:text-slate-900 transition-colors">
                                                    <span className="material-symbols-outlined">download</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                            {/* Input */}
                            <div className="border-t border-slate-100 p-4">
                                <div className="relative flex items-center">
                                    <button className="absolute left-3 text-slate-400 hover:text-[#13ecec] transition-colors">
                                        <span className="material-symbols-outlined text-xl">add_circle</span>
                                    </button>
                                    <input
                                        value={inputText}
                                        onChange={e => setInputText(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                        className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm focus:border-[#13ecec] focus:ring-1 focus:ring-[#13ecec] outline-none"
                                        placeholder="Nhập tin nhắn..."
                                    />
                                    <button onClick={sendMessage} className="absolute right-2 w-8 h-8 rounded-full bg-[#13ecec] text-slate-900 flex items-center justify-center hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined text-lg">send</span>
                                    </button>
                                </div>
                                <div className="mt-2 flex justify-center">
                                    <p className="flex items-center gap-1 text-[10px] text-slate-400 uppercase tracking-tighter">
                                        <span className="material-symbols-outlined text-[12px]">lock</span>
                                        Mã hóa đầu cuối
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Notes Tab */}
                    {activeTab === 'notes' && (
                        <div className="flex-1 p-4 flex flex-col gap-3">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ghi chú buổi hẹn</p>
                            <textarea
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                className="flex-1 rounded-xl border border-[#13ecec]/20 bg-slate-50 p-3 text-sm text-slate-700 resize-none focus:border-[#13ecec] focus:ring-1 focus:ring-[#13ecec] outline-none"
                                placeholder="Ghi lại suy nghĩ, bài tập, hoặc điểm quan trọng từ buổi hẹn..."
                            />
                            <button className="flex items-center justify-center gap-2 py-2 bg-[#13ecec]/10 text-[#13ecec] font-bold rounded-lg text-sm hover:bg-[#13ecec]/20 transition-colors">
                                <span className="material-symbols-outlined text-sm">save</span> Đã lưu tự động
                            </button>
                        </div>
                    )}

                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tài liệu chia sẻ</p>
                            {[
                                { name: 'Bai_tap_tho_bung.pdf', size: '1.2 MB', icon: 'picture_as_pdf', color: 'text-red-500' },
                                { name: 'Ke_hoach_theo_doi.xlsx', size: '245 KB', icon: 'table_chart', color: 'text-green-600' },
                            ].map(doc => (
                                <div key={doc.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group">
                                    <span className={`material-symbols-outlined ${doc.color}`}>{doc.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{doc.name}</p>
                                        <p className="text-xs text-slate-400">{doc.size}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#13ecec] transition-colors">download</span>
                                </div>
                            ))}
                        </div>
                    )}
                </aside>
            </main>

            {/* Footer */}
            <footer className="h-8 flex items-center justify-center bg-slate-50 px-6 text-[10px] font-medium text-slate-400 border-t border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-6">
                    {[['verified_user', 'Tuân thủ HIPAA'], ['wifi', 'Ping: 24ms'], ['shield', 'Phòng tư vấn riêng tư']].map(([icon, label]) => (
                        <span key={label} className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">{icon}</span> {label}
                        </span>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default ConsultationRoomPage;