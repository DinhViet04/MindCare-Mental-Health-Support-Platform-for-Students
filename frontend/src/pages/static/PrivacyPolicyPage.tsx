import React from 'react';

const PrivacyPolicyPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Chính sách bảo mật</h1>
            <p className="text-gray-400 text-sm mb-8">Cập nhật lần cuối: 01/01/2025</p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {['Thu thập thông tin', 'Sử dụng thông tin', 'Chia sẻ thông tin', 'Bảo mật dữ liệu', 'Cookie', 'Quyền của bạn', 'Liên hệ chúng tôi'].map((section, i) => (
                    <div key={i} className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{i + 1}. {section}</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            MindCare cam kết bảo vệ quyền riêng tư của bạn. Chúng tôi chỉ thu thập thông tin cần thiết để cung cấp dịch vụ và không bán thông tin cá nhân cho bên thứ ba.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default PrivacyPolicyPage;
