const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: true })

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String, trim: true }],
  votes: { type: Number, default: 0 },
  participants: { type: Number, default: 0 },
  comments: [commentSchema]
}, { timestamps: true })

postSchema.index({ createdAt: -1 })
postSchema.index({ votes: -1 })
postSchema.index({ 'comments.createdAt': -1 })

module.exports = mongoose.model('CommunityPost', postSchema)


