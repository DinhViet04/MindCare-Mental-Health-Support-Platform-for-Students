import api from '../../../shared/services/api';
import type {
  LoginRequest,
  RegisterRequest,
  VerifyOTPRequest,
  AuthResponse,
  ApiResponse,
} from '../../../shared/types/auth.types';

export const authService = {
  // Đăng ký
  register: async (data: RegisterRequest): Promise<ApiResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Xác thực OTP
  verifyOTP: async (data: VerifyOTPRequest): Promise<ApiResponse> => {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  },

  // Gửi lại OTP
  resendOTP: async (email: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
  },

  // Đăng nhập
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Đăng xuất
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Quên mật khẩu
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset mật khẩu
  resetPassword: async (data: {
    email: string;
    otpCode: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse> => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  // Google login
  googleLogin: async (tokenId: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/google-login', { tokenId });
    return response.data;
  },
};