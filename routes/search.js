const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const searchController = require('../controllers/search')

router.get('/search/:page/:search', searchController.g_search)
router.get('/category/:page/:categoryId', searchController.g_search)

router.post('/search', urlencodedParser, searchController.p_search)

module.exports = router