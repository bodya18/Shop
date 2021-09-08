const {Router} =require('express')
const router = Router()
const adminControllerr = require('../controllers/admin')
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/auth');
const urlencodedParser = require('../middleware/urlencodedParser');
const file = require('../middleware/file')

router.get('/admin', isAuth,   isAdmin, adminControllerr.GetStartPage)

router.get('/admin/create/settings', isAuth,   isAdmin, adminControllerr.GetCreateSetting)
router.get('/admin/settings', isAuth,   isAdmin, adminControllerr.GetSettings)
router.get('/admin/settings/:id', isAuth, isAdmin, adminControllerr.GetThisSetting)

router.get('/admin/users', isAuth,   isAdmin, adminControllerr.GetUsers)

router.get('/admin/roles/create', isAuth,   isAdmin, adminControllerr.GetCreateRole)
router.get('/admin/roles', isAuth,   isAdmin, adminControllerr.GetRoles)
router.get('/admin/permissions', isAuth,   isAdmin, adminControllerr.GetPermissions)
router.get('/admin/permissions/create', isAuth,   isAdmin, adminControllerr.GetCreatePermission)
router.get('/admin/permissions/give', isAuth,   isAdmin, adminControllerr.GetGivePermission)
router.get('/admin/roles/give', isAuth,   isAdmin, adminControllerr.GetGiveRole)

router.get('/admin/orders/getNew', isAuth,   isAdmin, adminControllerr.GetNewOrders)
router.get('/admin/orders/getOld', isAuth,   isAdmin, adminControllerr.GetOldOrders)
router.get('/admin/orders/getDone', isAuth,   isAdmin, adminControllerr.GetDoneOrders)


router.post('/admin/parse', isAuth,   isAdmin, urlencodedParser, file.upload.single("parsingFile"), adminControllerr.ParseData)

router.post('/admin/orders/repeat/:id', isAuth,   isAdmin, adminControllerr.RepeatOrder)
router.post('/admin/orders/delete/:id', isAuth,   isAdmin, adminControllerr.DeleteOrder)
router.post('/admin/orders/good/:id', isAuth,   isAdmin, adminControllerr.DoneOrder)
router.post('/admin/orders/set/:id', isAuth,   isAdmin, adminControllerr.SetOrder)
router.post('/admin/orders/edit', isAuth,   isAdmin, urlencodedParser, adminControllerr.EditOrder)

router.post('/admin/settings/set', isAuth,   isAdmin, urlencodedParser, file.photo.array("value"), adminControllerr.EditSettings)
router.post('/admin/create/settings', isAuth,   isAdmin, urlencodedParser, adminControllerr.CreateSettings)

router.post('/admin/updateFromUser', isAuth,   isAdmin, urlencodedParser, adminControllerr.updateFromUser)
router.post('/admin/roles/delete/:roleId', isAuth,   isAdmin, adminControllerr.DeleteRole)
router.post('/admin/permissions/delete/:permissionId', isAuth,   isAdmin, adminControllerr.DeletePermission)
router.post('/admin/roles/create', isAuth,   isAdmin, urlencodedParser, adminControllerr.CreateRole)
router.post('/admin/permissions/create', isAuth,   isAdmin, urlencodedParser, adminControllerr.CreatePermission)
router.post('/admin/permissions/give', isAuth,   isAdmin, urlencodedParser, adminControllerr.GivePermission)
router.post('/admin/roles/give', isAuth,   isAdmin, urlencodedParser, adminControllerr.GiveRole)

module.exports = router