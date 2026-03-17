import React from 'react';

const TermsPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Điều khoản sử dụng</h1>
            <p className="text-gray-400 text-sm mb-8">Cập nhật lần cuối: 01/01/2025</p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-gray max-w-none">
                {['Chấp nhận điều khoản', 'Tài khoản người dùng', 'Điều khoản dịch vụ', 'Quyền riêng tư', 'Hạn chế trách nhiệm', 'Chính sách hoàn tiền', 'Thay đổi điều khoản', 'Liên hệ'].map((section, i) => (
                    <div key={i} className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{i + 1}. {section}</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Bằng cách sử dụng dịch vụ MindCare, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng này. Vui lòng đọc kỹ trước khi sử dụng nền tảng của chúng tôi.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default TermsPage;
