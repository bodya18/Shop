const {Router} =require('express')
const router = Router()
const parsingControllerr = require('../controllers/parsing')

router.get('/', parsingControllerr.ParseData)

module.exports = router