const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityPost', required: true },
  value: { type: Number, enum: [-1, 1], required: true }
}, { timestamps: true })

voteSchema.index({ user: 1, post: 1 }, { unique: true })

module.exports = mongoose.model('CommunityVote', voteSchema)


