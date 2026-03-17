import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiCalendar, FiClock, FiUser, FiVideo, FiMessageCircle, FiMic, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

interface Booking {
    id: string;
    expertName: string;
    expertAvatar: string;
    date: string;
    startTime: string;
    endTime: string;
    type: 'video' | 'chat' | 'voice';
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    reason: string;
    meetingLink?: string;
}

const BookingsPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('upcoming');

    // Mock data - sẽ thay bằng API call
    const bookings: Booking[] = [
        {
            id: '1',
            expertName: 'TS. Nguyễn Thị Lan',
            expertAvatar: 'https://via.placeholder.com/150',
            date: '2024-03-20',
            startTime: '09:00',
            endTime: '10:00',
            type: 'video',
            status: 'confirmed',
            reason: 'Lo lắng về áp lực học tập',
            meetingLink: 'https://meet.google.com/abc-xyz'
        },
        {
            id: '2',
            expertName: 'ThS. Trần Văn Minh',
            expertAvatar: 'https://via.placeholder.com/150',
            date: '2024-03-18',
            startTime: '14:00',
            endTime: '15:00',
            type: 'chat',
            status: 'completed',
            reason: 'Khó ngủ và mất tập trung'
        },
        {
            id: '3',
            expertName: 'TS. Lê Thị Hương',
            expertAvatar: 'https://via.placeholder.com/150',
            date: '2024-03-15',
            startTime: '10:00',
            endTime: '11:00',
            type: 'voice',
            status: 'cancelled',
            reason: 'Vấn đề về mối quan hệ'
        }
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium flex items-center"><FiCheckCircle className="mr-1" /> Đã xác nhận</span>;
            case 'pending':
                return <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium flex items-center"><FiAlertCircle className="mr-1" /> Chờ xác nhận</span>;
            case 'completed':
                return <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium flex items-center"><FiCheckCircle className="mr-1" /> Hoàn thành</span>;
            case 'cancelled':
                return <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium flex items-center"><FiXCircle className="mr-1" /> Đã hủy</span>;
            default:
                return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <FiVideo className="h-4 w-4" />;
            case 'chat':
                return <FiMessageCircle className="h-4 w-4" />;
            case 'voice':
                return <FiMic className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const filteredBookings = bookings.filter(booking => {
        if (filter === 'all') return true;
        if (filter === 'upcoming') return ['pending', 'confirmed'].includes(booking.status);
        return booking.status === filter;
    });

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Lịch hẹn của tôi</h1>
                <Link
                    to="/experts"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                    <FiCalendar className="mr-2" />
                    Đặt lịch mới
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setFilter('upcoming')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'upcoming'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Sắp tới
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'all'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'completed'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Đã hoàn thành
                    </button>
                    <button
                        onClick={() => setFilter('cancelled')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'cancelled'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Đã hủy
                    </button>
                </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch hẹn</h3>
                        <p className="text-gray-600 mb-4">
                            {filter === 'upcoming'
                                ? 'Bạn chưa có lịch hẹn nào sắp tới.'
                                : 'Không tìm thấy lịch hẹn nào.'}
                        </p>
                        <Link
                            to="/experts"
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Tìm chuyên gia và đặt lịch ngay
                        </Link>
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={booking.expertAvatar}
                                        alt={booking.expertName}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{booking.expertName}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{booking.reason}</p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <FiCalendar className="mr-1 h-4 w-4" />
                                                {new Date(booking.date).toLocaleDateString('vi-VN')}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <FiClock className="mr-1 h-4 w-4" />
                                                {booking.startTime} - {booking.endTime}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                {getTypeIcon(booking.type)}
                                                <span className="ml-1 capitalize">{booking.type === 'video' ? 'Video' : booking.type === 'chat' ? 'Chat' : 'Gọi thoại'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                                    {getStatusBadge(booking.status)}

                                    {booking.status === 'confirmed' && booking.meetingLink && (
                                        <a
                                            href={booking.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                        >
                                            Tham gia
                                        </a>
                                    )}

                                    {booking.status === 'pending' && (
                                        <button
                                            onClick={() => navigate(`/bookings/${booking.id}/cancel`)}
                                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                                        >
                                            Hủy lịch
                                        </button>
                                    )}

                                    {booking.status === 'completed' && (
                                        <button
                                            onClick={() => navigate(`/consultations/${booking.id}/feedback`)}
                                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                        >
                                            Đánh giá
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookingsPage;