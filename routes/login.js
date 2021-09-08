const express = require('express')
const router = express.Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const loginController = require('../controllers/login')
const jsonParser = express.json()

router.get('/accept/:token', loginController.Accept)
router.get('/recovery/:token', loginController.NewPass)

router.post('/newPass', urlencodedParser, loginController.SetNewPass)
router.post('/recovery', jsonParser, loginController.recoveryPass)
router.post('/', jsonParser, loginController.loginLogic)

module.exports = router