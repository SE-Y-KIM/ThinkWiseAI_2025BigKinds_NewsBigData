const express = require('express')
const controller = require('../controllers/financeController')

const router = express.Router()

// 기업 기본 재무 요약 (FnGuide 우선, 없으면 DART 대체)
router.get('/summary', controller.getCompanySummary)

// 전자공시 최근 보고서 (DART)
router.get('/filings', controller.getRecentFilings)

// 분기 시계열
router.get('/quarterly', controller.getQuarterly)

module.exports = router


