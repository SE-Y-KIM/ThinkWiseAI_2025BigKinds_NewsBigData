const express = require('express');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const chatRoutes = require('./routes/chat');
const reportRoutes = require('./routes/report');
const settingsRoutes = require('./routes/settings');

const app = express();

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/settings', settingsRoutes);

// API Documentation route
app.get('/api', (req, res) => {
  res.json({
    message: 'ThinkiWise API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      chat: '/api/chat',
      report: '/api/report',
      settings: '/api/settings'
    },
    documentation: '/api/docs'
  });
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

module.exports = app;

