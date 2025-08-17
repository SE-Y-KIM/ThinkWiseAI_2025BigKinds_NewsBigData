const CommunityPost = require('../models/CommunityPost')
const CommunityVote = require('../models/CommunityVote')

// GET /api/community?sort=latest|popular|active&tag=AI&tags=AI,금리&page=1&limit=10
async function list(req, res) {
  const { sort: sortParam = 'latest', tag, tags, page = 1, limit = 10 } = req.query
  const pageNum = Math.max(parseInt(page, 10) || 1, 1)
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50)

  const query = {}
  const tagsFilter = (tags ? String(tags).split(',') : []).concat(tag ? [tag] : [])
  if (tagsFilter.length) {
    query.tags = { $in: tagsFilter }
  }

  let sort = { createdAt: -1 }
  if (sortParam === 'popular') sort = { votes: -1, createdAt: -1 }
  if (sortParam === 'active') sort = { 'comments.createdAt': -1, createdAt: -1 }

  const total = await CommunityPost.countDocuments(query)
  const posts = await CommunityPost.find(query)
    .sort(sort)
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .lean()

  res.json({ success: true, data: { posts, page: pageNum, limit: limitNum, total, hasNext: pageNum * limitNum < total } })
}

// POST /api/community
async function create(req, res) {
  const { title, content, tags } = req.body
  const post = await CommunityPost.create({ title, content, tags, author: req.user.userId })
  res.status(201).json({ success: true, data: { post } })
}

// GET /api/community/:id
async function detail(req, res) {
  const { id } = req.params
  const post = await CommunityPost.findById(id).lean()
  if (!post) return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' })
  res.json({ success: true, data: { post } })
}

// POST /api/community/:id/comments
async function addComment(req, res) {
  const { id } = req.params
  const { content } = req.body
  const post = await CommunityPost.findById(id)
  if (!post) return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' })
  post.comments.push({ content, author: req.user.userId })
  post.participants = Math.max(post.participants || 0, post.comments.length)
  await post.save()
  res.status(201).json({ success: true, data: { comments: post.comments } })
}

// GET /api/community/:id/comments?page=1&limit=20
async function listComments(req, res) {
  const { id } = req.params
  const { page = 1, limit = 20 } = req.query
  const pageNum = Math.max(parseInt(page, 10) || 1, 1)
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100)
  const post = await CommunityPost.findById(id).lean()
  if (!post) return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' })
  const total = (post.comments || []).length
  const start = (pageNum - 1) * limitNum
  const end = start + limitNum
  const slice = (post.comments || []).slice().reverse().slice(start, end)
  res.json({ success: true, data: { comments: slice, page: pageNum, limit: limitNum, total, hasNext: end < total } })
}

// POST /api/community/:id/vote { delta: 1|-1 }
async function vote(req, res) {
  const { id } = req.params
  const { delta } = req.body
  const inc = Number(delta) === -1 ? -1 : 1
  const post = await CommunityPost.findById(id)
  if (!post) return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' })
  // upsert vote record
  const existing = await CommunityVote.findOne({ user: req.user.userId, post: id })
  if (existing) {
    // if same vote, ignore; if different, adjust by +/-2 (remove old and add new)
    if (existing.value === inc) return res.json({ success: true, data: { votes: post.votes || 0 } })
    existing.value = inc
    await existing.save()
    post.votes = Math.max(0, (post.votes || 0) + (inc === 1 ? 2 : -2))
  } else {
    await CommunityVote.create({ user: req.user.userId, post: id, value: inc })
    post.votes = Math.max(0, (post.votes || 0) + inc)
  }
  await post.save()
  res.json({ success: true, data: { votes: post.votes } })
}

module.exports = { list, create, detail, addComment, listComments, vote }


