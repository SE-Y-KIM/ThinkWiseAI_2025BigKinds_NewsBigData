const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All dashboard routes require authentication
router.use(auth);

// Get dashboard overview
router.get('/', dashboardController.getOverview);

// Get KPI data
router.get('/kpi', dashboardController.getKpiData);

// Get trending topics
router.get('/trending', dashboardController.getTrendingTopics);

// Get category distribution
router.get('/categories', dashboardController.getCategoryDistribution);

// Get industry distribution
router.get('/industries', dashboardController.getIndustryDistribution);

// Get recent reports
router.get('/recent-reports', dashboardController.getRecentReports);

// Get user activity
router.get('/activity', dashboardController.getUserActivity);

module.exports = router;

