import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data
  const stats = {
    sessionsCompleted: 12,
    currentStreak: 5,
    moodAverage: 7.2,
    nextAppointment: '2 ngày nữa'
  };

  const upcomingAppointments = [
    {
      id: 1,
      date: '2026-01-25',
      time: '14:00',
      psychologist: 'TS. Nguyễn Minh Anh',
      type: 'Tư vấn cá nhân',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2026-01-27',
      time: '10:30',
      psychologist: 'ThS. Trần Văn Hùng',
      type: 'Trị liệu nhóm',
      status: 'confirmed'
    }
  ];

  const recommendedExperts = [
    {
      id: 1,
      name: 'TS. Lê Thị Hương',
      specialty: 'Tâm lý gia đình',
      rating: 4.9,
      experience: '12 năm',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'ThS. Phạm Đức Minh',
      specialty: 'Trầm cảm',
      rating: 4.8,
      experience: '8 năm',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'TS. Hoàng Mai Lan',
      specialty: 'Stress & Lo âu',
      rating: 4.9,
      experience: '15 năm',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop'
    }
  ];

  const moodData = [
    { date: '17/01', mood: 7 },
    { date: '18/01', mood: 6 },
    { date: '19/01', mood: 8 },
    { date: '20/01', mood: 7 },
    { date: '21/01', mood: 6 },
    { date: '22/01', mood: 8 },
    { date: '23/01', mood: 7 }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const maxMood = 10;
  const chartHeight = 150;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#F0F7F4] to-[#FDF6F0]">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-semibold text-gray-700">MindCare</span>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{user?.fullName}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Student'}</p>
              </div>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50">
                <button
                  onClick={() => navigate('/')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  🏠 Trang chủ
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  👤 Hồ sơ
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  ⚙️ Cài đặt
                </button>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600"
                >
                  🚪 Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Xin chào, {user?.fullName?.split(' ').pop()}! 👋
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
              📅
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Đặt lịch tư vấn</h3>
            <p className="text-sm text-gray-600">Tìm chuyên gia phù hợp</p>
          </button>

          <button className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
              📝
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Theo dõi tâm trạng</h3>
            <p className="text-sm text-gray-600">Ghi nhận cảm xúc hôm nay</p>
          </button>

          <button className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Trò chuyện ngay</h3>
            <p className="text-sm text-gray-600">Chat với chuyên gia</p>
          </button>

          <button className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
              📚
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Tài liệu</h3>
            <p className="text-sm text-gray-600">Bài viết hữu ích</p>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Buổi tư vấn</span>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.sessionsCompleted}</p>
            <p className="text-sm text-green-600">Hoàn thành</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Chuỗi ngày</span>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.currentStreak}</p>
            <p className="text-sm text-orange-600">Ngày liên tục</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Tâm trạng TB</span>
              <span className="text-2xl">😊</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.moodAverage}/10</p>
            <p className="text-sm text-teal-600">Tốt</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Lịch hẹn tiếp</span>
              <span className="text-2xl">⏰</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.nextAppointment}</p>
            <p className="text-sm text-purple-600">Sắp tới</p>
          </div>
        </div>

        {/* Grid: Appointments & Experts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Lịch hẹn sắp tới</h2>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">Xem tất cả →</button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-4 border border-gray-200 rounded-xl hover:border-teal-300 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{apt.psychologist}</p>
                      <p className="text-sm text-gray-600">{apt.type}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Đã xác nhận
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📅 {new Date(apt.date).toLocaleDateString('vi-VN')}</span>
                    <span>⏰ {apt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Chuyên gia đề xuất</h2>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">Xem thêm →</button>
            </div>
            <div className="space-y-4">
              {recommendedExperts.map((expert) => (
                <div key={expert.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-teal-300 transition-all">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{expert.name}</p>
                    <p className="text-sm text-gray-600">{expert.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-amber-500">⭐</span>
                      <span className="text-sm text-gray-600">{expert.rating} • {expert.experience}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all text-sm font-medium">
                    Đặt lịch
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mood History Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Lịch sử tâm trạng (7 ngày qua)</h2>
          <div className="flex items-end justify-between gap-4 h-48">
            {moodData.map((data, index) => {
              const barHeight = (data.mood / maxMood) * chartHeight;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center" style={{ height: chartHeight }}>
                    <div
                      className="w-full bg-gradient-to-t from-teal-500 to-emerald-400 rounded-t-lg hover:from-teal-600 hover:to-emerald-500 transition-all cursor-pointer"
                      style={{ height: `${barHeight}px` }}
                      title={`Mood: ${data.mood}/10`}
                    />
                    <span className="absolute -top-6 text-sm font-semibold text-gray-700">{data.mood}</span>
                  </div>
                  <span className="text-xs text-gray-600">{data.date}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-teal-50 rounded-xl">
            <p className="text-sm text-gray-700">
              💡 <span className="font-semibold">Nhận xét:</span> Tâm trạng của bạn tương đối ổn định trong tuần qua. 
              Hãy tiếp tục duy trì các hoạt động tích cực!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
