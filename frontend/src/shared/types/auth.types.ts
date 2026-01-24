export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: 'Student' | 'Psychologist' | 'Admin';
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOTPRequest {
  email: string;
  otpCode: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// NOTE: Auth endpoints response formats
// Direct responses (not wrapped in ApiResponse):
// - POST /auth/login -> AuthResponse { token, user }
// - POST /auth/google-login -> AuthResponse { token, user }
//
// Wrapped in ApiResponse:
// - POST /auth/register -> ApiResponse { success, message }
// - POST /auth/verify-email -> ApiResponse { success, message }
// - POST /auth/resend-otp -> ApiResponse { success, message }
// - POST /auth/forgot-password -> ApiResponse { success, message }
// - POST /auth/reset-password -> ApiResponse { success, message }
// - POST /auth/logout -> ApiResponse { success, message }

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}