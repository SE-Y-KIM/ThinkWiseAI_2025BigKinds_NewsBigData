const express = require('express');
const { body } = require('express-validator');
const settingsController = require('../controllers/settingsController');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// All settings routes require authentication
router.use(auth);

// Validation rules
const updatePreferencesValidation = [
  body('preferences.language')
    .optional()
    .isIn(['ko', 'en', 'ja'])
    .withMessage('지원되는 언어를 선택해주세요.'),
  body('preferences.timezone')
    .optional()
    .isString()
    .withMessage('유효한 시간대를 입력해주세요.'),
  body('preferences.notifications.email')
    .optional()
    .isBoolean()
    .withMessage('이메일 알림 설정은 boolean 값이어야 합니다.'),
  body('preferences.notifications.push')
    .optional()
    .isBoolean()
    .withMessage('푸시 알림 설정은 boolean 값이어야 합니다.')
];

const updatePlanValidation = [
  body('plan')
    .isIn(['free', 'basic', 'pro', 'enterprise'])
    .withMessage('유효한 플랜을 선택해주세요.')
];

// Get user settings
router.get('/', settingsController.getSettings);

// Update user preferences
router.put('/preferences', updatePreferencesValidation, validate, settingsController.updatePreferences);

// Update user plan
router.put('/plan', updatePlanValidation, validate, settingsController.updatePlan);

// Get usage statistics
router.get('/usage', settingsController.getUsage);

// Get billing information
router.get('/billing', settingsController.getBilling);

// Update billing information
router.put('/billing', settingsController.updateBilling);

// Get notification settings
router.get('/notifications', settingsController.getNotifications);

// Update notification settings
router.put('/notifications', settingsController.updateNotifications);

// Delete account
router.delete('/account', settingsController.deleteAccount);

module.exports = router;

