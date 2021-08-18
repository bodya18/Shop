const Main = require("../services/main")

exports.GetStartPage = async (req, res)=>{
    res.render('adminIndex.hbs', {
        title: 'Панель администрации'
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