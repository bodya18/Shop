const {Router} =require('express')
const router = Router()
const adminControllerr = require('../controllers/admin')

router.get('/', adminControllerr.GetStartPage)

module.exports = router