const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api')
const jsonParser = express.json()

router.post('/orders/done', jsonParser, apiController.DoneOrders)
router.post('/users', jsonParser, apiController.Users)
router.post('/settings', jsonParser, apiController.getSettings)

module.exports = router