const express = require('express')
const controller = require('../controllers/analysisController')

const router = express.Router()

router.get('/stock', controller.stockAnalysis)

module.exports = router


