const Main = require("../services/main")
const main = new Main;

exports.GetStartPage = async (req, res)=>{
    res.render('adminIndex.hbs', {
        title: 'Панель администрации',
        isAdmin: true,
        error: req.flash('error'),
        goodSet: req.flash('goodSet'),
        isParseData: true
    })
}

exports.GetCreateRole = async (req, res) =>{
    res.render('CreateRole.hbs', {
        title: 'Создание роли',
        isAdmin: true,
        isRoleCreate: true,
        error: req.flash('error')
    })
}

exports.CreateRole = async (req, res) => {
    if(!req.body) return res.sendStatus(400)

    const data = await main.role.CreateRole(req.body.role)
    
    if(data){
        req.flash('error', data)
        return res.redirect(`/admin/roles/create`)
    }
    return res.redirect(`/admin/roles`)
}

exports.GetRoles = async (req,res) => {
    const roles = await main.role.GetRoles()
    res.render('roles.hbs', {
        roles,
        title: 'Список ролей',
        isAdmin: true,
        isRole: true
    })
}

exports.CreatePermission = async (req, res) => {
    if(!req.body) return res.sendStatus(400)
    const data = await main.permission.CreatePermission(req.body.permission)
    
    if(data){
        req.flash('error', data)
        return res.redirect(`/admin/permissions/create`)
    }
    return res.redirect(`/admin/permissions`)
}

exports.GetPermissions = async (req,res) => {
    const permissions = await main.permission.GetPermissions()
    res.render('permissions.hbs', {
        permissions,
        title: 'Список разрешений',
        isAdmin: true,
        isPermission: true
    })
}

exports.GetCreatePermission = async (req, res) =>{
    res.render('CreatePermission.hbs', {
        title: 'Создание разрешений',
        isAdmin: true,
        isPermissionCreate: true,
        error: req.flash('error')
    })
}

exports.GetGivePermission = async (req, res) => {
    const permissions = await main.permission.GetPermissions()
    const roles = await main.role.GetRoles()
    res.render('GivePermission.hbs', {
        roles, 
        permissions, 
        title: 'Выдача разрешения',
        isAdmin: true,
        isGivePermission: true,
        error: req.flash('error')
    })
}

exports.GivePermission = async (req, res) =>{
    const error = await main.permission.GivePermission(req.body.permissionId, req.body.roleId)
    if(error){
        req.flash('error', error)
        return res.redirect(`/admin/permissions/give`)
    }
    return res.redirect('/admin/permissions') 
}

exports.GetGiveRole = async (req, res) => {
    const users = await main.user.GetUsers()
    const roles = await main.role.GetRoles()
    res.render('GiveRole.hbs', {
        roles, 
        users, 
        title: 'Выдача ролей',
        isAdmin: true,
        isGiveRole: true,
        error: req.flash('error')
    })
}

exports.GiveRole = async (req, res) =>{
    const error = await main.user.GiveRole(req.body.userId, req.body.roleId)
    if(error){
        req.flash('error', error)
        return res.redirect(`/admin/roles/give`)
    }
    return res.redirect('/admin/roles') 
}

exports.DeleteRole = async (req, res)=>{
    await main.role.DeleteRole(req.params.roleId)
    return res.redirect('/admin/roles')
}

exports.DeletePermission = async (req, res)=>{
    await main.permission.DeletePermission(req.params.permissionId)
    return res.redirect('/admin/permissions')
}

exports.GetSettings = async (req, res)=>{
    const data = await main.product.getSettings()
    res.render('settings.hbs', {
        percent: data.percent,
        title: 'Настройки',
        isAdmin: true,
        isSetting: true,
        error: req.flash('error')
    })
}

exports.EditSettings = async(req, res)=>{
    await main.product.EditSettings(req.body.percent)
    res.redirect('/admin/settings')
}

exports.GetUsers = async (req, res)=>{
    const users = await main.user.GetUsers()
    const roleUser = await main.permission.GetRoleUser()
    res.render('listUsers.hbs', {
        users,
        roleUser,
        title: 'Список пользователей',
        isAdmin: true,
        isUsers: true
    })
}

exports.GetNewOrders = async(req, res)=>{
    const orders = await main.product.GetOrdersByStatus(1)
    res.render('listOrders.hbs', {
        isNewOrder: true,
        title: 'Не обработанные заказы',
        orders,
        isAdmin:true
    })
}

exports.GetOldOrders = async(req, res)=>{
    const orders = await main.product.GetOrdersByStatus(2)
    res.render('listOrders.hbs', {
        isOldOrder: true,
        title: 'Заказы, ожидающие доставку',
        orders,
        isAdmin:true
    })
}

exports.GetDoneOrders = async(req, res)=>{
    let orders = await main.product.GetOrdersByStatus(3)
    orders = orders.reverse();
    let isMore = false
    if(orders.length > 100){
        orders = orders.splice(0, 100)
        isMore = true
    }
    res.render('listOrders.hbs', {
        isDoneOrder: true,
        title: 'Доставленные заказы',
        orders,
        isMore,
        isAdmin:true
    })
}

exports.DeleteOrder = async(req, res)=>{
    await main.product.DeleteOrder(req.params.id)
    res.redirect(req.headers.referer)
}

exports.DoneOrder = async(req, res)=>{
    await main.product.UpdateOrderStatus(3, req.params.id)
    res.redirect(req.headers.referer)
}

exports.SetOrder = async(req, res)=>{
    await main.product.UpdateOrderStatus(2, req.params.id)
    res.redirect(req.headers.referer)
}
exports.RepeatOrder = async(req, res)=>{
    await main.product.UpdateOrderStatus(1, req.params.id)
    res.redirect(req.headers.referer)
}
exports.CreateOrder = async(req, res)=>{
    await main.product.CreateOrder(req.body.number, req.body.address, req.body.DimensionProductId)
    res.redirect('/')
}

exports.ParseData = async (req, res)=>{
    let data = await main.product.ParseData(req.file)
    if (!data.perm) {
        req.flash('error', data.error)
        return res.redirect(`/admin`)
    }
    let count = await main.product.SetDataInDB(data.data)
    req.flash('goodSet', count)
    res.redirect('/admin')
}

exports.updateFromUser = async (req, res)=>{
    await main.role.UpdateRoleFromUser(req.body.userId, req.body.roleId)
    const data = await main.permission.ShowAllPermissions(req.body.userId)
    if(req.session.userIden === req.body.userId)
        req.session.Perm = data
    return res.redirect('/profile/' + req.body.userId) 
}