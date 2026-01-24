import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

// GET /api/v1/users/me - Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user is set by authMiddleware
    res.json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;