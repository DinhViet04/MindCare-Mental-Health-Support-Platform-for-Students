const Story = require('../models/Story');

// GET tất cả stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json({ success: true, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── MỚI: GET stories theo userId ──
exports.getStoriesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await Story.find({ authorId: userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST tạo story mới
exports.createStory = async (req, res) => {
  try {
    const { author, authorId, authorType, category, title, content, tags } = req.body;
    const story = await Story.create({
      author,
      authorId: authorId || null,  // ← lưu đúng authorId
      authorType,
      category,
      title,
      content,
      tags,
    });
    res.status(201).json({ success: true, data: story });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PATCH like / unlike
exports.toggleLike = async (req, res) => {
  try {
    const { userId } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: 'Không tìm thấy' });

    const alreadyLiked = story.likedBy.includes(userId);
    if (alreadyLiked) {
      story.likedBy.pull(userId);
      story.likes = Math.max(0, story.likes - 1);
    } else {
      story.likedBy.push(userId);
      story.likes += 1;
    }
    await story.save();
    res.json({ success: true, data: story });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST thêm comment
exports.addComment = async (req, res) => {
  try {
    const { author, authorId, content } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: 'Không tìm thấy' });

    story.comments.push({ author, authorId: authorId || null, content });
    await story.save();
    res.status(201).json({ success: true, data: story });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};