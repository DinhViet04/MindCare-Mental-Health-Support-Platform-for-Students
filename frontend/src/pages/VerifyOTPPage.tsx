import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../modules/auth/services/auth.service';

const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get('email') || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Redirect nếu không có email
  useEffect(() => {
    if (!emailFromUrl) {
      navigate('/forgot-password');
    }
  }, [emailFromUrl, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Chỉ cho phép số

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Backspace: focus previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Vui lòng nhập đủ 6 số');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Gọi API xác minh OTP bằng cách gọi API reset password với mật khẩu tạm thời
      // để kiểm tra xem OTP có hợp lệ hay không
      // Tuy nhiên, vì đây là quy trình quên mật khẩu nên chúng ta sẽ chuyển sang trang đặt lại mật khẩu
      // mà không thực sự đặt lại mật khẩu
      navigate('/reset-password', { state: { email: emailFromUrl, otpCode } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Mã OTP không hợp lệ');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    try {
      await authService.forgotPassword(emailFromUrl);
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gửi lại OTP thất bại');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#F0F7F4] to-[#FDF6F0] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg mb-4">
            <span className="text-white font-bold text-3xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Xác thực OTP</h1>
          <p className="text-gray-500 mt-2">
            Chúng tôi đã gửi mã OTP đến<br />
            <span className="font-medium text-gray-700">{emailFromUrl}</span>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* OTP Input */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'Xác thực OTP'}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Không nhận được mã?{' '}
            {countdown > 0 ? (
              <span className="text-gray-500">Gửi lại sau {countdown}s</span>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-teal-600 font-medium hover:text-teal-700"
              >
                {resendLoading ? 'Đang gửi...' : 'Gửi lại'}
              </button>
            )}
          </p>
        </div>

        {/* Back to Forgot Password */}
        <p className="mt-4 text-center text-sm text-gray-600">
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-teal-600 font-medium hover:text-teal-700"
          >
            ← Quay lại quên mật khẩu
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTPPage;