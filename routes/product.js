const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const urlencodedParser = require('../middleware/urlencodedParser')
const jsonParser = express.json()

router.post('/create/orders', jsonParser, productController.p_createOrder)
// router.get('/create/orders', productController.g_createOrder)

module.exports = router