const express = require('express');
const { body } = require('express-validator');
const chatController = require('../controllers/chatController');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// All chat routes require authentication
router.use(auth);

// Validation rules
const sendMessageValidation = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('메시지를 입력해주세요.')
    .isLength({ max: 1000 })
    .withMessage('메시지는 1000자를 초과할 수 없습니다.'),
  body('context')
    .optional()
    .isObject()
    .withMessage('컨텍스트는 객체 형태여야 합니다.')
];

// Send message to AI
router.post('/send', sendMessageValidation, validate, chatController.sendMessage);

// Get chat history
router.get('/history', chatController.getChatHistory);

// Clear chat history
router.delete('/history', chatController.clearChatHistory);

// Get chat suggestions
router.get('/suggestions', chatController.getSuggestions);

// Export chat conversation
router.get('/export', chatController.exportChat);

module.exports = router;

