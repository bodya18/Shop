const {Router} =require('express')
const router = Router()
const indexControllerr = require('../controllers/index')

router.get('/', indexControllerr.GetData)

module.exports = router