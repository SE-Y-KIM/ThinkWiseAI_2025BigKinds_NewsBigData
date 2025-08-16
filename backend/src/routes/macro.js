const express = require('express')
const controller = require('../controllers/macroController')

const router = express.Router()

// ECOS/KOSIS/WB 공통 시계열 스켈레톤
router.get('/series', controller.getSeries)

module.exports = router


