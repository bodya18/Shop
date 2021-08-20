const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api')
const jsonParser = express.json()

router.post('/orders/done', jsonParser, apiController.DoneOrders)

module.exports = router