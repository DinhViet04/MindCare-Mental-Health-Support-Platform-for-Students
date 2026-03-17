import React, { useState } from 'react';
import { FiInfo, FiCreditCard, FiTerminal, FiShield, FiMessageCircle, FiSearch, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSection {
    id: string;
    label: string;
    icon: React.ReactNode;
    items: FAQItem[];
}

const faqSections: FAQSection[] = [
    {
        id: 'general',
        label: 'Câu hỏi chung',
        icon: <FiInfo className="w-5 h-5" />,
        items: [
            {
                question: 'MindCare là gì và lợi ích cho sinh viên như thế nào?',
                answer: 'MindCare là nền tảng chăm sóc sức khỏe tâm thần dành riêng cho sinh viên. Chúng tôi kết nối bạn với các chuyên gia tâm lý được chứng nhận, cung cấp tư vấn trực tuyến bảo mật, và các công cụ theo dõi sức khỏe tinh thần.',
            },
            {
                question: 'Làm thế nào để bắt đầu sử dụng MindCare?',
                answer: 'Bạn chỉ cần đăng ký tài khoản miễn phí bằng email sinh viên, hoàn thiện hồ sơ cá nhân, sau đó tìm kiếm và đặt lịch với chuyên gia phù hợp. Toàn bộ quy trình chỉ mất vài phút.',
            },
            {
                question: 'Tôi có thể chia sẻ hồ sơ với người khác không?',
                answer: 'Không. Thông tin của bạn được bảo mật tuyệt đối. Chỉ bạn và chuyên gia tư vấn được chỉ định mới có thể xem nội dung buổi tư vấn.',
            },
        ],
    },
    {
        id: 'billing',
        label: 'Thanh toán & Gói dịch vụ',
        icon: <FiCreditCard className="w-5 h-5" />,
        items: [
            {
                question: 'Các phương thức thanh toán được chấp nhận?',
                answer: 'Chúng tôi chấp nhận thẻ tín dụng/ghi nợ (Visa, Mastercard), chuyển khoản ngân hàng, ví điện tử MoMo, ZaloPay và VNPay.',
            },
            {
                question: 'Tôi có thể nâng cấp hoặc hủy gói dịch vụ không?',
                answer: 'Có. Bạn có thể thay đổi gói dịch vụ bất cứ lúc nào trong phần cài đặt tài khoản. Nâng cấp có hiệu lực ngay lập tức, còn hủy sẽ có hiệu lực vào cuối chu kỳ thanh toán hiện tại.',
            },
        ],
    },
    {
        id: 'technical',
        label: 'Hỗ trợ kỹ thuật',
        icon: <FiTerminal className="w-5 h-5" />,
        items: [
            {
                question: 'Buổi tư vấn video có yêu cầu gì về thiết bị?',
                answer: 'Bạn chỉ cần máy tính, điện thoại hoặc tablet có camera và microphone, kết nối internet ổn định. Chúng tôi hỗ trợ Chrome, Firefox và Safari phiên bản mới nhất.',
            },
            {
                question: 'Dữ liệu của tôi được lưu trữ như thế nào?',
                answer: 'Tất cả dữ liệu được mã hóa end-to-end và lưu trữ trên máy chủ đặt tại Việt Nam, tuân thủ đầy đủ các quy định về bảo mật thông tin cá nhân.',
            },
        ],
    },
    {
        id: 'security',
        label: 'Bảo mật & Quyền riêng tư',
        icon: <FiShield className="w-5 h-5" />,
        items: [
            {
                question: 'Thông tin buổi tư vấn của tôi có bị chia sẻ không?',
                answer: 'Tuyệt đối không. Nội dung tư vấn được bảo mật theo nguyên tắc đạo đức nghề nghiệp. Chúng tôi không bao giờ chia sẻ thông tin cá nhân hay nội dung buổi tư vấn với bên thứ ba.',
            },
        ],
    },
];

const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
            <button
                className="w-full flex items-center justify-between gap-6 p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => setOpen(!open)}
            >
                <span className="text-slate-900 dark:text-slate-100 text-base font-semibold">{item.question}</span>
                <FiChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-5 pb-5">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [search, setSearch] = useState('');

    const filteredSections = faqSections.map(section => ({
        ...section,
        items: section.items.filter(
            item =>
                item.question.toLowerCase().includes(search.toLowerCase()) ||
                item.answer.toLowerCase().includes(search.toLowerCase())
        ),
    })).filter(section => section.items.length > 0);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex flex-col max-w-[960px] mx-auto flex-1 w-full px-4 md:px-10 py-10">

                {/* Hero Search */}
                <section className="mb-12">
                    <div
                        className="flex min-h-[320px] flex-col gap-6 rounded-xl items-center justify-center p-8 relative overflow-hidden"
                        style={{
                            backgroundImage: `linear-gradient(rgba(16,34,34,0.8) 0%, rgba(16,34,34,0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8yz4wUPydTfkunM2Q-EIlcu7OcEPIxh6i8F1ErcIA2Y9lKfJr5Hmc_eyEU1zUEhZzMZuX7rgbr6-gPeqH_hADeAyBPkJdaf8ciYuaAauLKry5lS60UdT_3Hdf4gQ_FDh5Q_DVB-_t7A3jYSJFm6iLH4tr2tPDY03HWTWklX-smvVPiuM9apMW0ok_7lrABFTNcXXx_2AyL5GURyHwgznrZ7HoxhdcgTWzHWbsNv1n2_5aGsnNMYkDg3_nOOCBk47n7ye61b5Qwvx")`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                        }}
                    >
                        <div className="flex flex-col gap-2 text-center relative z-10 max-w-lg mx-auto">
                            <h1 className="text-white text-4xl font-black leading-tight">Chúng tôi có thể giúp gì?</h1>
                            <p className="text-slate-200 text-base font-normal">
                                Tìm kiếm trong kho kiến thức hoặc duyệt qua các danh mục bên dưới.
                            </p>
                        </div>
                        <div className="flex w-full max-w-[560px] rounded-lg shadow-xl overflow-hidden relative z-10">
                            <div className="flex bg-white dark:bg-slate-900 items-center justify-center pl-5">
                                <FiSearch className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                                className="flex-1 bg-white dark:bg-slate-900 border-none focus:ring-0 h-14 px-4 text-slate-900 dark:text-white text-base outline-none"
                                placeholder="Tìm kiếm câu hỏi..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <div className="flex items-center justify-center bg-white dark:bg-slate-900 pr-2">
                                <button className="min-w-[100px] h-10 px-5 bg-primary text-slate-900 text-sm font-bold rounded-lg">
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Tabs */}
                {!search && (
                    <div className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md mb-8">
                        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto">
                            {faqSections.map(section => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={() => setActiveTab(section.id)}
                                    className={`flex items-center gap-2 pb-3 pt-4 px-2 whitespace-nowrap text-sm font-bold border-b-2 transition-colors ${activeTab === section.id
                                        ? 'border-primary text-slate-900 dark:text-white'
                                        : 'border-transparent text-slate-500 hover:text-primary'
                                        }`}
                                >
                                    {section.icon}
                                    {section.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ Content */}
                <div className="flex flex-col gap-12">
                    {(search ? filteredSections : faqSections).map(section => (
                        <section key={section.id} id={section.id}>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-primary">{section.icon}</span>
                                <h2 className="text-2xl font-bold">{section.label}</h2>
                            </div>
                            <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                {section.items.map((item, i) => (
                                    <AccordionItem key={i} item={item} />
                                ))}
                            </div>
                        </section>
                    ))}

                    {search && filteredSections.length === 0 && (
                        <div className="text-center py-16 text-slate-500">
                            <FiSearch className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-semibold">Không tìm thấy kết quả cho "<span className="text-primary">{search}</span>"</p>
                        </div>
                    )}
                </div>

                {/* Still need help CTA */}
                <section className="mt-16 p-8 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center text-center gap-6">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-slate-900">
                        <FiMessageCircle className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Vẫn còn câu hỏi?</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng 24/7.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/contact"
                            className="min-w-[140px] h-12 px-6 bg-primary text-slate-900 text-sm font-bold rounded-lg shadow-md hover:opacity-90 transition-all flex items-center justify-center"
                        >
                            Liên hệ hỗ trợ
                        </Link>
                        <button className="min-w-[140px] h-12 px-6 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                            Chat trực tiếp
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FAQPage;