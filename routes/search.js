const {Router} = require('express')
const router = Router()
const urlencodedParser = require('../middleware/urlencodedParser')
const searchController = require('../controllers/search')

router.get('/:search', searchController.g_search)

router.post('/', urlencodedParser, searchController.p_search)

module.exports = router