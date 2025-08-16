const express = require('express')
const controller = require('../controllers/marketController')

const router = express.Router()

// 코스콤 REST 폴링 스켈레톤
router.get('/quote', controller.getQuote)

module.exports = router


