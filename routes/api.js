const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api')
const jsonParser = express.json()

router.post('/api/orders/done', jsonParser, apiController.DoneOrders)
router.post('/api/users', jsonParser, apiController.Users)
router.post('/api/settings', jsonParser, apiController.getSettings)
router.post('/api/cookies/get', apiController.getCookies)
router.post('/api/cookies/set', apiController.setCookies)

module.exports = router