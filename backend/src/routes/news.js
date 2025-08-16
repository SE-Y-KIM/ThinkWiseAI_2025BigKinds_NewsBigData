const express = require('express')
const newsController = require('../controllers/newsController')

const router = express.Router()

router.get('/search', newsController.search)
router.post('/enrich', newsController.enrich)

module.exports = router


