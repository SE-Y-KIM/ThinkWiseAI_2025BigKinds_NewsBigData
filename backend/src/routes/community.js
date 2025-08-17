const express = require('express')
const { auth, optionalAuth } = require('../middleware/auth')
const ctrl = require('../controllers/communityController')

const router = express.Router()

router.get('/', optionalAuth, ctrl.list)
router.post('/', auth, ctrl.create)
router.get('/:id', optionalAuth, ctrl.detail)
router.post('/:id/comments', auth, ctrl.addComment)
router.get('/:id/comments', optionalAuth, ctrl.listComments)
router.post('/:id/vote', auth, ctrl.vote)

module.exports = router


