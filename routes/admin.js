const {Router} =require('express')
const router = Router()
const adminControllerr = require('../controllers/admin')
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/auth');
const urlencodedParser = require('../middleware/urlencodedParser');

router.get('/', isAuth,  /*isAdmin,*/ adminControllerr.GetStartPage)
router.get('/roles/create', isAuth,  /*isAdmin,*/ adminControllerr.GetCreateRole)
router.get('/roles', isAuth,  /*isAdmin,*/ adminControllerr.GetRoles)
router.get('/permissions', isAuth,  /*isAdmin,*/ adminControllerr.GetPermissions)
router.get('/permissions/create', isAuth,  /*isAdmin,*/ adminControllerr.GetCreatePermission)

router.post('/roles/create', isAuth,  /*isAdmin,*/ urlencodedParser, adminControllerr.CreateRole)
router.post('/permissions/create', isAuth,  /*isAdmin,*/ urlencodedParser, adminControllerr.CreatePermission)

module.exports = router