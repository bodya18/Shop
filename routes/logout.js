const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const logoutController = require('../controllers/logout')

router.get('/logout', auth, logoutController.GetLogout)

module.exports = router