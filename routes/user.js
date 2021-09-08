const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const userController = require('../controllers/user')
const isAuth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

router.get('/profile/:id', isAuth, isAdmin, userController.GetUser)

router.post('/profile/delete', isAuth, isAdmin, urlencodedParser, userController.Delete)

module.exports = router