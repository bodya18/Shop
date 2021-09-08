const express = require('express')
const router = express.Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const loginController = require('../controllers/login')
const jsonParser = express.json()

router.get('/login/accept/:token', loginController.Accept)
router.get('/login/recovery/:token', loginController.NewPass)

router.post('/login/newPass', urlencodedParser, loginController.SetNewPass)
router.post('/login/recovery', jsonParser, loginController.recoveryPass)
router.post('/login', jsonParser, loginController.loginLogic)

module.exports = router