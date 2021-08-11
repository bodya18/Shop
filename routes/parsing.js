const {Router} =require('express')
const router = Router()
const parsingControllerr = require('../controllers/parsing')

router.post('/', parsingControllerr.ParseData)

module.exports = router