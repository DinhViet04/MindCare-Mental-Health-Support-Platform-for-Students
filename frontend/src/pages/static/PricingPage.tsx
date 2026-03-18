import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

const plans = [
    {
        name: 'Cơ bản',
        price: 'Miễn phí',
        description: 'Dành cho người mới bắt đầu',
        features: ['3 buổi tư vấn/tháng', 'Trò chuyện nhóm', 'Bài kiểm tra tâm lý', 'Hỗ trợ email'],
        color: 'border-gray-200',
        buttonClass: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
    {
        name: 'Tiêu chuẩn',
        price: '299.000₫',
        period: '/tháng',
        description: 'Phù hợp cho cá nhân',
        features: ['10 buổi tư vấn/tháng', 'Video & Chat', 'Lịch sử tư vấn đầy đủ', 'Hỗ trợ 24/7', 'Bài tập tâm lý'],
        color: 'border-teal-500 ring-2 ring-teal-200',
        buttonClass: 'bg-teal-500 text-white hover:bg-teal-600',
        badge: 'Phổ biến nhất',
    },
    {
        name: 'Cao cấp',
        price: '599.000₫',
        period: '/tháng',
        description: 'Dành cho doanh nghiệp',
        features: ['Không giới hạn buổi tư vấn', 'Ưu tiên kết nối chuyên gia', 'Báo cáo tiến trình', 'Hỗ trợ riêng', 'API tích hợp'],
        color: 'border-purple-300',
        buttonClass: 'bg-purple-600 text-white hover:bg-purple-700',
    },
];

const PricingPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">Bảng giá dịch vụ</h1>
                <p className="text-gray-500">Chọn gói phù hợp với nhu cầu của bạn</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <div key={plan.name} className={`bg-white rounded-2xl border-2 p-6 flex flex-col relative ${plan.color}`}>
                        {plan.badge && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {plan.badge}
                            </span>
                        )}
                        <h3 className="font-bold text-gray-800 text-lg">{plan.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                            {plan.period && <span className="text-gray-400 text-sm">{plan.period}</span>}
                        </div>
                        <ul className="space-y-2 mb-6 flex-1">
                            {plan.features.map(f => (
                                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                    <FiCheck className="text-teal-500 flex-shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link to="/register">
                            <button className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${plan.buttonClass}`}>
                                Bắt đầu ngay
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default PricingPage;
