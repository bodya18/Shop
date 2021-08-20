const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const userController = require('../controllers/user')
const auth = require('../middleware/auth')

router.get('/:id', auth, userController.GetUser)


module.exports = router