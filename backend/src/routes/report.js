const express = require('express');
const { body } = require('express-validator');
const reportController = require('../controllers/reportController');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// All report routes require authentication
router.use(auth);

// Validation rules
const createReportValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('리포트 제목은 필수입니다.')
    .isLength({ max: 200 })
    .withMessage('제목은 200자를 초과할 수 없습니다.'),
  body('type')
    .isIn(['keyword', 'trend', 'competitor', 'market', 'custom'])
    .withMessage('유효한 리포트 타입을 선택해주세요.'),
  body('data.keywords')
    .optional()
    .isArray()
    .withMessage('키워드는 배열 형태여야 합니다.'),
  body('data.sources')
    .optional()
    .isArray()
    .withMessage('소스는 배열 형태여야 합니다.')
];

const updateReportValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('제목은 200자를 초과할 수 없습니다.'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('설명은 1000자를 초과할 수 없습니다.')
];

// Create new report
router.post('/', createReportValidation, validate, reportController.createReport);

// Get all reports for user
router.get('/', reportController.getReports);

// Get single report
router.get('/:id', reportController.getReport);

// Update report
router.put('/:id', updateReportValidation, validate, reportController.updateReport);

// Delete report
router.delete('/:id', reportController.deleteReport);

// Generate report
router.post('/:id/generate', reportController.generateReport);

// Get report status
router.get('/:id/status', reportController.getReportStatus);

// Export report
router.get('/:id/export', reportController.exportReport);

// Share report
router.post('/:id/share', reportController.shareReport);

// Get public reports
router.get('/public/list', reportController.getPublicReports);

module.exports = router;

