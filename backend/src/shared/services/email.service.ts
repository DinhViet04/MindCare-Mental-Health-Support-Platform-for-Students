import nodemailer from 'nodemailer';

// Tạo transporter bên trong function để đảm bảo env đã load
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export const sendVerificationOTP = async (email: string, otpCode: string): Promise<void> => {
  // Skip nếu chưa config email
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.log(`📧 [DEV] OTP for ${email}: ${otpCode}`);
    return;
  }

  const transporter = createTransporter();
  const mailOptions = {
    from: `"MindCare" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: 'Xác thực tài khoản MindCare',
    html: `
      <h2>Xác thực tài khoản MindCare</h2>
      <p>Mã OTP của bạn là: <strong>${otpCode}</strong></p>
      <p>Mã có hiệu lực trong 10 phút.</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetOTP = async (email: string, otpCode: string): Promise<void> => {
  // Skip nếu chưa config email
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.log(`📧 [DEV] Reset OTP for ${email}: ${otpCode}`);
    return;
  }

  const transporter = createTransporter();
  const mailOptions = {
    from: `"MindCare" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: 'Đặt lại mật khẩu MindCare',
    html: `
      <h2>Đặt lại mật khẩu</h2>
      <p>Mã OTP của bạn là: <strong>${otpCode}</strong></p>
      <p>Mã có hiệu lực trong 10 phút.</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};