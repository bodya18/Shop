const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const urlencodedParser = require('../middleware/urlencodedParser')


router.post('/create/orders', urlencodedParser, productController.p_createOrder)
router.get('/create/orders', urlencodedParser, productController.g_createOrder)

module.exports = router