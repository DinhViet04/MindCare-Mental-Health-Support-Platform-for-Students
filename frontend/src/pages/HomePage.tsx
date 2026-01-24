// frontend/src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#F0F7F4] to-[#FDF6F0]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-semibold text-gray-700">MindCare</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">Dịch vụ</a>
            <a href="#experts" className="text-gray-600 hover:text-teal-600 transition-colors">Chuyên gia</a>
            <a href="#testimonials" className="text-gray-600 hover:text-teal-600 transition-colors">Đánh giá</a>
            <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors">Liên hệ</a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 text-teal-600 font-medium hover:bg-teal-50 rounded-xl transition-all"
            >
              Đăng nhập
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 transition-all hover:-translate-y-0.5"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100/60 rounded-full">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              <span className="text-teal-700 text-sm font-medium">Hỗ trợ 24/7</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Chăm sóc
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500"> sức khỏe tinh thần </span>
              của bạn
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kết nối với các chuyên gia tâm lý hàng đầu. Đặt lịch tư vấn trực tuyến an toàn, 
              riêng tư và thuận tiện mọi lúc, mọi nơi.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/register')}
                className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-2xl shadow-xl shadow-teal-200 hover:shadow-2xl hover:shadow-teal-300 transition-all hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  Đặt lịch ngay
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                Tìm hiểu thêm
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">50+</p>
                <p className="text-gray-500 text-sm">Chuyên gia</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">10k+</p>
                <p className="text-gray-500 text-sm">Người dùng</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">4.9</p>
                <p className="text-gray-500 text-sm">Đánh giá</p>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* Neumorphic Card */}
            <div className="relative z-10 bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff]">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop" 
                alt="Wellness" 
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Bảo mật tuyệt đối</p>
                  <p className="text-sm text-gray-500">Thông tin được mã hóa</p>
                </div>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-teal-100/60 text-teal-700 rounded-full text-sm font-medium">Dịch vụ</span>
            <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-4">Chúng tôi cung cấp gì?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Các dịch vụ chăm sóc sức khỏe tinh thần toàn diện, được thiết kế riêng cho bạn</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Neumorphic Feature Card 1 */}
            <div className="group p-8 rounded-3xl bg-[#E8F4F8] shadow-[8px_8px_16px_#c8d4d8,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#c8d4d8,-12px_-12px_24px_#ffffff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tư vấn trực tuyến</h3>
              <p className="text-gray-600 leading-relaxed">Trò chuyện video 1-1 với chuyên gia tâm lý được chứng nhận, linh hoạt thời gian theo lịch của bạn.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="group p-8 rounded-3xl bg-[#F0F7F4] shadow-[8px_8px_16px_#d0e0d4,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d0e0d4,-12px_-12px_24px_#ffffff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Thiền & Thư giãn</h3>
              <p className="text-gray-600 leading-relaxed">Hàng trăm bài thiền có hướng dẫn, âm thanh thư giãn giúp bạn giảm stress và cải thiện giấc ngủ.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="group p-8 rounded-3xl bg-[#FDF6F0] shadow-[8px_8px_16px_#e0d8d0,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#e0d8d0,-12px_-12px_24px_#ffffff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Theo dõi tâm trạng</h3>
              <p className="text-gray-600 leading-relaxed">Ghi nhận và theo dõi cảm xúc hàng ngày, nhận insights về sức khỏe tinh thần của bạn.</p>
            </div>

            {/* Feature Card 4 */}
            <div className="group p-8 rounded-3xl bg-[#F5F0FA] shadow-[8px_8px_16px_#d8d0e0,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d8d0e0,-12px_-12px_24px_#ffffff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Bài viết & Tài liệu</h3>
              <p className="text-gray-600 leading-relaxed">Thư viện kiến thức phong phú về tâm lý học, self-help và phát triển bản thân.</p>
            </div>

            {/* Feature Card 5 */}
            <div className="group p-8 rounded-3xl bg-[#F0F4F8] shadow-[8px_8px_16px_#d0d4d8,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d0d4d8,-12px_-12px_24px_#ffffff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Nhóm hỗ trợ</h3>
              <p className="text-gray-600 leading-relaxed">Tham gia các nhóm cộng đồng, chia sẻ và nhận sự hỗ trợ từ những người có cùng trải nghiệm.</p>
            </div>

            {/* Feature Card 6 */}
            <div className="group p-8 rounded-3xl bg-[#FFF5F5] shadow-[8px_8px_16px_#e0d8d8,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#e0d8d8,-12px_-12px_24px_#ffffff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ trợ khẩn cấp</h3>
              <p className="text-gray-600 leading-relaxed">Đường dây nóng 24/7 cho các trường hợp khủng hoảng, luôn có chuyên gia sẵn sàng hỗ trợ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section id="experts" className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-emerald-100/60 text-emerald-700 rounded-full text-sm font-medium">Đội ngũ</span>
            <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-4">Chuyên gia tâm lý hàng đầu</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Được đào tạo bài bản, giàu kinh nghiệm và tận tâm với công việc</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'TS. Nguyễn Minh Anh', spec: 'Tâm lý trị liệu', exp: '15 năm', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop' },
              { name: 'ThS. Trần Văn Hùng', spec: 'Stress & Lo âu', exp: '10 năm', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop' },
              { name: 'TS. Lê Thị Hương', spec: 'Tâm lý gia đình', exp: '12 năm', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop' },
              { name: 'ThS. Phạm Đức Minh', spec: 'Trầm cảm', exp: '8 năm', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop' },
            ].map((expert, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative mb-6 mx-auto w-48 h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform"></div>
                  <img 
                    src={expert.img} 
                    alt={expert.name}
                    className="relative w-full h-full object-cover rounded-3xl shadow-xl"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{expert.name}</h3>
                <p className="text-teal-600 font-medium">{expert.spec}</p>
                <p className="text-gray-500 text-sm">{expert.exp} kinh nghiệm</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all border border-teal-100 hover:-translate-y-1"
            >
              Xem tất cả chuyên gia →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-purple-100/60 text-purple-700 rounded-full text-sm font-medium">Đánh giá</span>
            <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-4">Khách hàng nói gì về chúng tôi?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Ngọc Trinh', role: 'Nhân viên văn phòng', text: 'MindCare đã giúp tôi vượt qua giai đoạn stress công việc. Các chuyên gia rất tận tâm và thấu hiểu.', rating: 5 },
              { name: 'Minh Tuấn', role: 'Sinh viên', text: 'App rất dễ sử dụng, tôi có thể đặt lịch tư vấn bất cứ lúc nào. Cảm ơn MindCare!', rating: 5 },
              { name: 'Thu Hà', role: 'Giáo viên', text: 'Những bài thiền và âm thanh thư giãn giúp tôi ngủ ngon hơn rất nhiều. Highly recommend!', rating: 5 },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white shadow-[8px_8px_24px_#d1d9e6,-8px_-8px_24px_#ffffff] hover:shadow-[12px_12px_32px_#d1d9e6,-12px_-12px_32px_#ffffff] transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-500 p-12 text-center shadow-2xl shadow-teal-200">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">Sẵn sàng bắt đầu hành trình?</h2>
              <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
                Đăng ký ngay hôm nay và nhận ưu đãi 30% cho buổi tư vấn đầu tiên. 
                Hãy để chúng tôi đồng hành cùng bạn.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-white text-teal-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  Đăng ký miễn phí
                </button>
                <button 
                  onClick={() => alert('Tính năng tải app sẽ có sớm!')}
                  className="px-8 py-4 bg-transparent text-white font-bold rounded-2xl border-2 border-white/50 hover:bg-white/10 transition-all"
                >
                  Tải ứng dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-semibold">MindCare</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Nền tảng chăm sóc sức khỏe tinh thần trực tuyến hàng đầu Việt Nam.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Tư vấn trực tuyến</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Thiền định</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Theo dõi tâm trạng</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Cộng đồng</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 contact@mindcare.vn</li>
              <li>📞 1900 xxxx xx</li>
              <li>📍 Hà Nội, Việt Nam</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© 2026 MindCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;