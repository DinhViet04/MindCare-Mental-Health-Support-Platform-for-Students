const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/storyController');

router.get('/',                   ctrl.getStories);
router.get('/user/:userId',       ctrl.getStoriesByUser);  // ← MỚI
router.post('/',                  ctrl.createStory);
router.patch('/:id/like',         ctrl.toggleLike);
router.post('/:id/comments',      ctrl.addComment);

module.exports = router;