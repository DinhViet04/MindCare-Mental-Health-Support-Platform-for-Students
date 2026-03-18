import React from 'react';
import { Helmet } from 'react-helmet-async';

const ServicesPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Dịch vụ | MindCare</title>
                <meta name="description" content="Các dịch vụ chăm sóc sức khỏe tâm thần tại MindCare." />
            </Helmet>

            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Dịch vụ của chúng tôi
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Tại MindCare, chúng tôi cung cấp đa dạng các dịch vụ chăm sóc sức khỏe tâm thần chất lượng cao,
                            đáp ứng nhu cầu đa dạng của từng cá nhân.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Tư vấn tâm lý 1:1</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 font-light">
                                Các buổi tư vấn cá nhân với chuyên gia tâm lý giàu kinh nghiệm, không gian riêng tư và bảo mật tuyệt đối.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Chẩn đoán và đánh giá
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Lên lộ trình trị liệu
                                </li>
                            </ul>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">diversity_3</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Trị liệu nhóm</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 font-light">
                                Học hỏi và phát triển cùng những người có chung vấn đề dưới sự dẫn dắt của chuyên gia tâm lý.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Kỹ năng kiểm soát cảm xúc
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Vượt qua áp lực học tập
                                </li>
                            </ul>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">school</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Đào tạo & Workshop</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 font-light">
                                Kiến thức về sức khỏe tâm thần, phát triển bản thân và kỹ năng mềm dành cho cộng đồng và doanh nghiệp.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Giáo dục tâm lý
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    Huấn luyện kỹ năng
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesPage;
