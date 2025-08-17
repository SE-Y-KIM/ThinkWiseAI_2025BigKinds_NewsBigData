const express = require('express')
const controller = require('../controllers/macroController')

const router = express.Router()

// ECOS/KOSIS/WB 공통 시계열 스켈레톤
router.get('/series', controller.getSeries)

// yfinance 기반 KPI 요약
router.get('/kpi', controller.getKpi)

module.exports = router


