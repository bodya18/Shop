const {Router} =require('express')
const router = Router()
const indexControllerr = require('../controllers/index')

router.get('/', indexControllerr.MainPage)
router.get('/single/:id', indexControllerr.SinglePage)

module.exports = router