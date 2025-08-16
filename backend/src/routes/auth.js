const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('이름은 2-50자 사이여야 합니다.'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효한 이메일 주소를 입력해주세요.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('비밀번호는 최소 8자 이상이어야 합니다.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('비밀번호는 영문 대소문자와 숫자를 포함해야 합니다.'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('회사명은 100자를 초과할 수 없습니다.')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효한 이메일 주소를 입력해주세요.'),
  body('password')
    .notEmpty()
    .withMessage('비밀번호를 입력해주세요.')
];

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('이름은 2-50자 사이여야 합니다.'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('회사명은 100자를 초과할 수 없습니다.')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('현재 비밀번호를 입력해주세요.'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('새 비밀번호는 최소 8자 이상이어야 합니다.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('새 비밀번호는 영문 대소문자와 숫자를 포함해야 합니다.')
];

// Routes
router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.get('/me', auth, authController.getMe);
router.put('/profile', auth, updateProfileValidation, validate, authController.updateProfile);
router.put('/password', auth, changePasswordValidation, validate, authController.changePassword);
router.post('/logout', auth, authController.logout);

module.exports = router;

