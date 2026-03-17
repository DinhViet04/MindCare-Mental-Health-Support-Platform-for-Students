const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/email');
const { validationResult } = require('express-validator');

// Generate JWT Token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Create and send token response
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        success: true,
        token,
        data: {
            user
        }
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password, fullName } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được đăng ký. Vui lòng sử dụng email khác.'
            });
        }

        // Create user
        const user = await User.create({
            email,
            password,
            fullName,
            authMethods: ['local']
        });

        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.emailVerificationToken = crypto
            .createHash('sha256')
            .update(verificationToken)
            .digest('hex');
        user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        await user.save({ validateBeforeSave: false });

        try {
            // Send verification email
            const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

            await sendEmail({
                email: user.email,
                subject: 'Xác thực email tài khoản MindCare',
                html: `
            <h1>Chào mừng bạn đến với MindCare!</h1>
            <p>Vui lòng click vào link dưới đây để xác thực email của bạn:</p>
            <a href="${verificationUrl}">Xác thực email</a>
            <p>Link có hiệu lực trong 24 giờ.</p>
          `
            });
        } catch (emailError) {
            console.error('Email sending failed, but user was created:', emailError);
        }

        createSendToken(user, 201, res);
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.'
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp email và mật khẩu.'
            });
        }

        // Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không chính xác.'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin.'
            });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save({ validateBeforeSave: false });

        createSendToken(user, 200, res);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra trong quá trình đăng nhập.'
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công'
    });
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tài khoản với email này.'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save({ validateBeforeSave: false });

        // Send email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Yêu cầu đặt lại mật khẩu MindCare',
                html: `
          <h1>Yêu cầu đặt lại mật khẩu</h1>
          <p>Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu.</p>
          <p>Vui lòng click vào link dưới đây để đặt lại mật khẩu:</p>
          <a href="${resetUrl}">Đặt lại mật khẩu</a>
          <p>Link có hiệu lực trong 10 phút.</p>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        `
            });

            res.status(200).json({
                success: true,
                message: 'Link đặt lại mật khẩu đã được gửi đến email của bạn.'
            });
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                success: false,
                message: 'Có lỗi khi gửi email. Vui lòng thử lại sau.'
            });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
        });
    }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res) => {
    try {
        // Get user based on token
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Token không hợp lệ hoặc đã hết hạn.'
            });
        }

        // Set new password
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        createSendToken(user, 200, res);
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
        });
    }
};

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        // Check current password
        if (!(await user.comparePassword(req.body.currentPassword))) {
            return res.status(401).json({
                success: false,
                message: 'Mật khẩu hiện tại không chính xác.'
            });
        }

        // Set new password
        user.password = req.body.newPassword;
        await user.save();

        createSendToken(user, 200, res);
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
        });
    }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token  (Đổi từ POST sang GET)
// @access  Public
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        console.log('Verifying token:', token);

        // Hash token trước khi tìm (vì DB lưu hash của token)
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            // 🟢 TRẢ VỀ JSON, KHÔNG REDIRECT
            return res.status(400).json({
                success: false,
                message: 'Token không hợp lệ hoặc đã hết hạn',
                status: 'invalid'
            });
        }

        // Cập nhật user
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save({ validateBeforeSave: false });

        // 🟢 TRẢ VỀ JSON THÀNH CÔNG
        res.status(200).json({
            success: true,
            message: 'Xác thực email thành công!',
            status: 'success'
        });

    } catch (error) {
        console.error('Verify email error:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra',
            status: 'error'
        });
    }
};