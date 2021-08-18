const Main = require("../services/main")

exports.GetStartPage = async (req, res)=>{
    res.render('adminIndex.hbs', {
        title: 'Панель администрации',
        isAdmin: true
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

    const main = new Main
    const data = await main.role.CreateRole(req.body.role)
    
    if(data){
        req.flash('error', data)
        return res.redirect(`/admin/roles/create`)
    }
    return res.redirect(`/admin/roles`)
}

exports.GetRoles = async (req,res) => {
    const main = new Main
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
    const main = new Main
    const data = await main.permission.CreatePermission(req.body.permission)
    
    if(data){
        req.flash('error', data)
        return res.redirect(`/admin/permissions/create`)
    }
    return res.redirect(`/admin/permissions`)
}

exports.GetPermissions = async (req,res) => {
    const main = new Main
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
    const main = new Main
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
    const main = new Main
    const error = await main.permission.GivePermission(req.body.permissionId, req.body.roleId)
    if(error){
        req.flash('error', error)
        return res.redirect(`/admin/permissions/give`)
    }
    return res.redirect('/admin/permissions') 
}

exports.GetGiveRole = async (req, res) => {
    const main = new Main
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
    const main = new Main
    const error = await main.user.GiveRole(req.body.userId, req.body.roleId)
    if(error){
        req.flash('error', error)
        return res.redirect(`/admin/roles/give`)
    }
    return res.redirect('/admin/roles') 
}

exports.DeleteRole = async (req, res)=>{
    const main = new Main
    await main.role.DeleteRole(req.params.roleId)
    return res.redirect('/admin/roles')
}

exports.DeletePermission = async (req, res)=>{
    const main = new Main
    await main.permission.DeletePermission(req.params.permissionId)
    return res.redirect('/admin/permissions')
}

exports.GetSettings = async (req, res)=>{
    const main = new Main
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
    const main = new Main
    await main.product.EditSettings(req.body.percent)
    res.redirect('/admin/settings')
}