const express = require('express')
const router = express.Router()
const registrController = require('../controllers/register')
const jsonParser = express.json()

// router.get('/', registrController.GetRegister)

router.post('/', jsonParser, registrController.registerLogic)

module.exports = router