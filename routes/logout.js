const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const logoutController = require('../controllers/logout')

router.get('/', auth, logoutController.GetLogout)

module.exports = router