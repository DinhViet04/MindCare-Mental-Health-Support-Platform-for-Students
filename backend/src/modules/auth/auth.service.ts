import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async sendResetPasswordEmail(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error('User not found');

    const token = crypto.randomBytes(32).toString('hex');
    const expire = Date.now() + 3600000; // 1h

    await this.userService.saveResetToken(user.id, token, expire);

    const resetLink = `http://yourdomain.com/reset-password/${token}`;

    // Gửi email (dùng nodemailer)
    const transporter = nodemailer.createTransport({/* cấu hình SMTP */});
    await transporter.sendMail({
      to: email,
      subject: 'Reset your password',
      text: `Click here to reset your password: ${resetLink}`,
    });

    return { message: 'Reset email sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userService.findByResetToken(token);
    if (!user || user.resetTokenExpire < Date.now()) throw new Error('Invalid or expired token');

    await this.userService.updatePassword(user.id, newPassword);
    await this.userService.clearResetToken(user.id);

    return { message: 'Password updated' };
  }
}