import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiCamera } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ProfileForm {
    fullName: string;
    phone: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    address: string;
}

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        defaultValues: {
            fullName: user?.fullName || '',
            phone: user?.phone || '',
            dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
            gender: user?.gender || 'male',
            address: user?.address || ''
        }
    });

    const onSubmit = async (data: ProfileForm) => {
        try {
            setIsLoading(true);
            // Call API to update profile
            // await userApi.updateProfile(data);
            toast.success('Cập nhật thông tin thành công!');
            setIsEditing(false);
        } catch (error) {
            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Ảnh không được vượt quá 5MB');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            // await userApi.updateAvatar(formData);
            toast.success('Cập nhật ảnh đại diện thành công!');
        } catch (error) {
            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Cover Photo */}
                <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600"></div>

                {/* Profile Header */}
                <div className="px-8 pb-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
                        <div className="relative">
                            <img
                                src={user?.avatar || '/default-avatar.png'}
                                alt={user?.fullName}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors"
                            >
                                <FiCamera className="h-4 w-4" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                        <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
                            <p className="text-gray-600 capitalize">{user?.role === 'student' ? 'Sinh viên' : user?.role}</p>
                        </div>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-4 sm:mt-0 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Chỉnh sửa hồ sơ
                            </button>
                        ) : (
                            <div className="mt-4 sm:mt-0 space-x-2">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={isLoading}
                                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h2>

                            {!isEditing ? (
                                // View Mode
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <FiMail className="h-5 w-5 mr-3" />
                                        <span>{user?.email}</span>
                                        {user?.isEmailVerified ? (
                                            <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                                Đã xác thực
                                            </span>
                                        ) : (
                                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                                                Chưa xác thực
                                            </span>
                                        )}
                                    </div>

                                    {user?.phone && (
                                        <div className="flex items-center text-gray-600">
                                            <FiPhone className="h-5 w-5 mr-3" />
                                            <span>{user.phone}</span>
                                        </div>
                                    )}

                                    {user?.dateOfBirth && (
                                        <div className="flex items-center text-gray-600">
                                            <FiCalendar className="h-5 w-5 mr-3" />
                                            <span>{new Date(user.dateOfBirth).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                    )}

                                    {user?.gender && (
                                        <div className="flex items-center text-gray-600">
                                            <FiUser className="h-5 w-5 mr-3" />
                                            <span>
                                                {user.gender === 'male' ? 'Nam' :
                                                    user.gender === 'female' ? 'Nữ' : 'Khác'}
                                            </span>
                                        </div>
                                    )}

                                    {user?.address && (
                                        <div className="flex items-center text-gray-600">
                                            <FiMapPin className="h-5 w-5 mr-3" />
                                            <span>{user.address}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Edit Mode
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Họ và tên
                                        </label>
                                        <input
                                            {...register('fullName', { required: 'Họ tên là bắt buộc' })}
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                        {errors.fullName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại
                                        </label>
                                        <input
                                            {...register('phone')}
                                            type="tel"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ngày sinh
                                        </label>
                                        <input
                                            {...register('dateOfBirth')}
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Giới tính
                                        </label>
                                        <select
                                            {...register('gender')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="male">Nam</option>
                                            <option value="female">Nữ</option>
                                            <option value="other">Khác</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Địa chỉ
                                        </label>
                                        <textarea
                                            {...register('address')}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </form>
                            )}
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê</h2>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary-600">0</div>
                                        <div className="text-sm text-gray-600">Buổi tư vấn</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary-600">0</div>
                                        <div className="text-sm text-gray-600">Bài test</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary-600">0</div>
                                        <div className="text-sm text-gray-600">Bài viết</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary-600">0</div>
                                        <div className="text-sm text-gray-600">Ngày tham gia</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Email Verification Banner */}
                    {!user?.isEmailVerified && (
                        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-yellow-800">Xác thực email</h3>
                                    <p className="text-sm text-yellow-700">
                                        Vui lòng xác thực email để sử dụng đầy đủ tính năng của MindCare.
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        // Resend verification email
                                        toast.success('Email xác thực đã được gửi lại!');
                                    }}
                                    className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                                >
                                    Gửi lại email
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;