import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const CareersPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Cơ hội nghề nghiệp | MindCare</title>
                <meta name="description" content="Khám phá các cơ hội nghề nghiệp tại MindCare." />
            </Helmet>

            <div className="bg-white dark:bg-slate-900 min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Tham gia cùng chúng tôi
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Tại MindCare, chúng tôi luôn tìm kiếm những tài năng đam mê và nhiệt huyết để cùng nhau xây dựng
                            nền tảng chăm sóc sức khỏe tâm thần hàng đầu Việt Nam.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Tại sao chọn MindCare?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-primary text-xl">favorite</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Sứ mệnh ý nghĩa</h4>
                                        <p className="text-slate-600 dark:text-slate-400 font-light mt-1">Làm việc vì mục tiêu cải thiện sức khỏe tinh thần cho cộng đồng.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Phát triển bản thân</h4>
                                        <p className="text-slate-600 dark:text-slate-400 font-light mt-1">Môi trường làm việc năng động, luôn khuyến khích học hỏi và sáng tạo.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-primary text-xl">diversity_1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Văn hóa cởi mở</h4>
                                        <p className="text-slate-600 dark:text-slate-400 font-light mt-1">Đồng nghiệp thân thiện, tôn trọng sự khác biệt và tự do ngôn luận.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-9xl text-slate-300 dark:text-slate-600">work</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Vị trí đang tuyển dụng</h3>
                        <div className="space-y-4 max-w-4xl mx-auto">
                            {/* Job Item 1 */}
                            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary transition-colors">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Chuyên gia Tâm lý học (Part-time / Full-time)</h4>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> TP. Hồ Chí Minh / Online</span>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">work_history</span> Chuyên môn</span>
                                    </div>
                                </div>
                                <Link to="/contact" className="btn btn-primary px-6 py-2 rounded-lg bg-primary font-medium shrink-0 text-center text-slate-900 hover:opacity-90">
                                    Ứng tuyển ngay
                                </Link>
                            </div>

                            {/* Job Item 2 */}
                            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary transition-colors">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Chuyên viên Vận hành Cộng đồng</h4>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> TP. Hồ Chí Minh</span>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">work_history</span> Hành chính / Vận hành</span>
                                    </div>
                                </div>
                                <Link to="/contact" className="btn btn-primary px-6 py-2 rounded-lg bg-primary font-medium shrink-0 text-center text-slate-900 hover:opacity-90">
                                    Ứng tuyển ngay
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default CareersPage;
