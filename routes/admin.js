const {Router} =require('express')
const router = Router()
const adminControllerr = require('../controllers/admin')
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/auth');
const urlencodedParser = require('../middleware/urlencodedParser');
const file = require('../middleware/file')

router.get('/', isAuth,   isAdmin, adminControllerr.GetStartPage)
router.get('/roles/create', isAuth,   isAdmin, adminControllerr.GetCreateRole)
router.get('/roles', isAuth,   isAdmin, adminControllerr.GetRoles)
router.get('/permissions', isAuth,   isAdmin, adminControllerr.GetPermissions)
router.get('/permissions/create', isAuth,   isAdmin, adminControllerr.GetCreatePermission)
router.get('/permissions/give', isAuth,   isAdmin, adminControllerr.GetGivePermission)
router.get('/roles/give', isAuth,   isAdmin, adminControllerr.GetGiveRole)
router.get('/settings', isAuth,   isAdmin, adminControllerr.GetSettings)
router.get('/users', isAuth,   isAdmin, adminControllerr.GetUsers)
router.get('/orders/getNew', isAuth,   isAdmin, adminControllerr.GetNewOrders)
router.get('/orders/getOld', isAuth,   isAdmin, adminControllerr.GetOldOrders)
router.get('/orders/getDone', isAuth,   isAdmin, adminControllerr.GetDoneOrders)

router.post('/orders/repeat/:id', isAuth,   isAdmin, adminControllerr.RepeatOrder)
router.post('/parse', isAuth,   isAdmin, urlencodedParser, file.upload.single("parsingFile"), adminControllerr.ParseData)
router.post('/orders/delete/:id', isAuth,   isAdmin, adminControllerr.DeleteOrder)
router.post('/orders/good/:id', isAuth,   isAdmin, adminControllerr.DoneOrder)
router.post('/orders/set/:id', isAuth,   isAdmin, adminControllerr.SetOrder)
router.post('/orders/create', isAuth,   isAdmin, adminControllerr.CreateOrder)
router.post('/settings/set', isAuth,   isAdmin, urlencodedParser, adminControllerr.EditSettings)
router.post('/roles/delete/:roleId', isAuth,   isAdmin, adminControllerr.DeleteRole)
router.post('/permissions/delete/:permissionId', isAuth,   isAdmin, adminControllerr.DeletePermission)
router.post('/roles/create', isAuth,   isAdmin, urlencodedParser, adminControllerr.CreateRole)
router.post('/permissions/create', isAuth,   isAdmin, urlencodedParser, adminControllerr.CreatePermission)
router.post('/permissions/give', isAuth,   isAdmin, urlencodedParser, adminControllerr.GivePermission)
router.post('/roles/give', isAuth,   isAdmin, urlencodedParser, adminControllerr.GiveRole)

module.exports = router