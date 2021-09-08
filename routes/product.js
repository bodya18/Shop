const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const jsonParser = express.json()

router.post('/product/create/orders', jsonParser, productController.p_createOrder)
router.get('/product/list/:page', productController.g_all_prod)

module.exports = router