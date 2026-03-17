import React from 'react';
import { Helmet } from 'react-helmet-async';

const RefundPolicyPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Quy định hoàn tiền | MindCare</title>
                <meta name="description" content="Chính sách và quy định hoàn tiền tại MindCare." />
            </Helmet>

            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-100 dark:border-slate-700">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
                            Quy định hoàn tiền
                        </h1>

                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
                            <p>
                                MindCare luôn mong muốn mang đến trải nghiệm tốt nhất cho người dùng. Chúng tôi cam kết chất lượng dịch vụ và có những chính sách rõ ràng về việc hoàn tiền nhằm đảm bảo quyền lợi của bạn.
                            </p>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Các trường hợp được hoàn tiền</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Chuyên gia hủy cuộc hẹn và người dùng không muốn sắp xếp lại lịch.</li>
                                <li>Lỗi kỹ thuật từ hệ thống MindCare khiến cuộc gọi hoặc quá trình tư vấn không thể diễn ra (sau khi đã được đội ngũ hỗ trợ kỹ thuật xác nhận).</li>
                                <li>Người dùng hủy cuộc hẹn hợp lệ theo quy định thời gian cho phép (thông thường trước ít nhất 24 giờ so với giờ hẹn).</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Các trường hợp KHÔNG được hoàn tiền</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Người dùng tự ý không tham gia buổi tư vấn mà không có thông báo hủy hợp lệ trước đó.</li>
                                <li>Người dùng tham gia muộn và tự ý rời khỏi buổi tư vấn sớm (số tiền tương ứng với thời gian tham gia vẫn được tính đầy đủ).</li>
                                <li>Người dùng không hài lòng với kết quả tư vấn mang tính cá nhân, do bản chất của dịch vụ tâm lý phụ thuộc nhiều vào sự phối hợp từ hai phía.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Quy trình xử lý yêu cầu hoàn tiền</h3>
                            <p>
                                Để yêu cầu hoàn tiền, vui lòng thực hiện các bước sau:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>Gửi yêu cầu hoàn tiền tới trung tâm hỗ trợ của MindCare thông qua mục <strong>Báo cáo sự cố</strong> trong lịch sử lịch hẹn hoặc gửi email đến <strong>support@mindcare.vn</strong>.</li>
                                <li>Hệ thống và chuyên gia chăm sóc khách hàng sẽ xem xét lý do và phản hồi trong vòng 1-3 ngày làm việc.</li>
                                <li>Nếu yêu cầu được chấp thuận, số tiền sẽ được hoàn trả vào Ví MindCare hoặc phương thức thanh toán ban đầu (thời gian nhận tiền phục thuộc vào cổng thanh toán và ngân hàng của bạn, thường từ 5-14 ngày làm việc).</li>
                            </ol>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Thay đổi chính sách</h3>
                            <p>
                                MindCare bảo lưu quyền sửa đổi Quy định hoàn tiền bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được cập nhật và thông báo trên website.
                            </p>

                            <div className="mt-12 p-6 bg-primary/10 rounded-xl border border-primary/20">
                                <p className="text-slate-800 dark:text-slate-200 m-0">
                                    Nếu bạn có bất kỳ câu hỏi nào về quy định hoàn tiền, vui lòng liên hệ với chúng tôi qua <a href="/contact" className="text-primary hover:underline font-medium">Trung tâm hỗ trợ</a> hoặc email: <strong>hello@mindcare.vn</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RefundPolicyPage;
