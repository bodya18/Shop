const express = require('express')
const router = express.Router()
const registrController = require('../controllers/register')
const jsonParser = express.json()

router.post('/register', jsonParser, registrController.registerLogic)

module.exports = router