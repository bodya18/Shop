const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const loginController = require('../controllers/login')

router.get('/', loginController.GetLogin)
router.get('/accept/:token', loginController.Accept)
router.get('/recoveryPass', loginController.recovery)
router.get('/recovery/:token', loginController.NewPass)

router.post('/newPass', urlencodedParser, loginController.SetNewPass)
router.post('/recovery', urlencodedParser, loginController.recoveryPass)
router.post('/', urlencodedParser, loginController.loginLogic)

module.exports = router