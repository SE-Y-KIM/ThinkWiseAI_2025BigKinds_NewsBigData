const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    if (process.env.SKIP_DB === 'true') {
      logger.warn('Skipping MongoDB connection due to SKIP_DB=true')
      return
    }
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thinkiwise';
    
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    };

    const conn = await mongoose.connect(mongoURI, options);
    
    logger.info(`📦 MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    if (process.env.ALLOW_START_WITHOUT_DB === 'true') {
      logger.warn('Continuing without DB because ALLOW_START_WITHOUT_DB=true')
      return
    }
    process.exit(1);
  }
};

module.exports = connectDB;

