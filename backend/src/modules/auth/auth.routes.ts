import express from 'express';
import * as authController from './auth.controller';
import { authMiddleware } from '../../shared/middleware/auth';
const router = express.Router();

router.post('/register', authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-otp', authController.resendOTP);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin); // Added Google login route
router.post('/logout', authMiddleware, authController.logout);

export default router;