const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author:   { type: String, default: 'Khách' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  content:  { type: String, required: true },
}, { timestamps: true });

const storySchema = new mongoose.Schema({
  author:     { type: String, required: true },
  authorId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  authorType: { type: String, enum: ['anonymous', 'user'], default: 'user' },
  category:   { type: String, default: '#General' },
  title:      { type: String, required: true },
  content:    { type: String, required: true },
  tags:       [{ type: String }],
  likes:      { type: Number, default: 0 },
  likedBy:    [{ type: String }],
  comments:   [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);