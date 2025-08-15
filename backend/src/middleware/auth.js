const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies (if using cookies)
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: '인증 토큰이 필요합니다.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user still exists
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: '토큰에 해당하는 사용자가 존재하지 않습니다.'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: '비활성화된 계정입니다.'
        });
      }

      // Add user to request object
      req.user = decoded;
      next();

    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: '유효하지 않은 토큰입니다.'
        });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: '토큰이 만료되었습니다.'
        });
      }

      throw error;
    }

  } catch (error) {
    logger.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
};

// Optional auth middleware (doesn't require token but adds user if present)
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies (if using cookies)
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user still exists and is active
        const user = await User.findById(decoded.userId);
        if (user && user.isActive) {
          req.user = decoded;
        }
      } catch (error) {
        // Token is invalid, but we don't throw an error
        logger.warn('Invalid token in optional auth:', error.message);
      }
    }

    next();

  } catch (error) {
    logger.error('Optional auth middleware error:', error);
    next();
  }
};

// Admin auth middleware
const adminAuth = async (req, res, next) => {
  try {
    // First check if user is authenticated
    await auth(req, res, async (err) => {
      if (err) return next(err);

      // Check if user is admin
      const user = await User.findById(req.user.userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: '관리자 권한이 필요합니다.'
        });
      }

      next();
    });

  } catch (error) {
    logger.error('Admin auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
};

module.exports = {
  auth,
  optionalAuth,
  adminAuth
};

