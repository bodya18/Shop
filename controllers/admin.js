const Main = require("../services/main")
const main = new Main;

exports.GetStartPage = async (req, res)=>{
    res.render(process.env.dirname+'/views/adminIndex.hbs', {
        title: 'Панель администрации',
        isAdmin: true,
        error: req.flash('error'),
        goodSet: req.flash('goodSet'),
        isParseData: true
    })
}

exports.GetCreateRole = async (req, res) =>{
    res.render(process.env.dirname+'/views/CreateRole.hbs', {
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
    res.render(process.env.dirname+'/views/roles.hbs', {
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
    res.render(process.env.dirname+'/views/permissions.hbs', {
        permissions,
        title: 'Список разрешений',
        isAdmin: true,
        isPermission: true
    })
}

exports.GetCreatePermission = async (req, res) =>{
    res.render(process.env.dirname+'/views/CreatePermission.hbs', {
        title: 'Создание разрешений',
        isAdmin: true,
        isPermissionCreate: true,
        error: req.flash('error')
    })
}

exports.GetGivePermission = async (req, res) => {
    const permissions = await main.permission.GetPermissions()
    const roles = await main.role.GetRoles()
    res.render(process.env.dirname+'/views/GivePermission.hbs', {
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
    res.render(process.env.dirname+'/views/GiveRole.hbs', {
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
    const settings = await main.settings.getSettings()
    res.render(process.env.dirname+'/views/settings.hbs', {
        settings,
        title: 'Настройки',
        isAdmin: true,
        isSetting: true,
        error: req.flash('error')
    })
}

exports.GetThisSetting = async (req, res)=>{
    const settings = await main.settings.getSettingById(req.params.id)
    let isText, isNum, isSingleFile, isMultiFile, isProduct
    if (settings._key === 'SEO') {
        var isSeo = true
        var value = JSON.parse(settings.value)
        var og_title = value.og_title
        var og_description = value.og_description
    }
    else{
        switch (settings.type_value) {
            case 1:
                isText = true
                break;
            case 2:
                isNum = true
                break;
            case 3:
                isSingleFile = true
                break;
            case 4:
                isMultiFile = true
                break;
            case 5:
                var products = await main.product.GetAllProduct()
                isProduct = true
                break;
            default:
                break;
        }
    }
    return res.render(process.env.dirname+'/views/ThisSettings.hbs', {
        isText, isNum, isSingleFile, isMultiFile, isProduct,
        products,
        og_title,
        og_description,
        settings,
        isSeo,
        title: 'Настройки',
        isAdmin: true,
        isSetting: true,
        error: req.flash('error')
    })
}
exports.GetCreateSetting = async (req, res)=>{
    res.render(process.env.dirname+'/views/CreateSettings.hbs', {
        title: 'Создание настроек',
        isAdmin: true,
        isCreateSetting: true,
        error: req.flash('error'),
        good: req.flash('good')
    })
}
exports.CreateSettings = async(req, res)=>{
    let err = await main.settings.create(req.body.title, req.body._key, req.body.Type_settings)
    if(err)
        req.flash('error', err)
    else
        req.flash('good', 'Настройка успешно создана')
    return res.redirect(req.headers.referer)
}
exports.EditSettings = async(req, res)=>{
    if ('og_title' in req.body) {
        await main.settings.EditSettings(JSON.stringify({og_title: req.body.og_title, og_description: req.body.og_description}), req.body.id)
        return res.redirect('/admin/settings')
    }
    let data = ''
    if(req.files.length && (req.body.type_value == 3 || req.body.type_value == 4)){
        for (const i in req.files) {
            if(req.files[i].mimetype === 'image/png' || req.files[i].mimetype === 'image/jpeg' || req.files[i].mimetype === 'image/jpg'){
                if((req.files.length-1) == i)
                    data += req.files[i].filename
                else
                    data += req.files[i].filename + ','
            }
            else{
                console.log('Файлы должны быть формата JPG, JPEG, PNG');
                req.flash('error', 'Файлы должны быть формата JPG, JPEG, PNG')
                return res.redirect(req.headers.referer)
            }
        }
        await main.settings.EditSettings(data, req.body.id)
        return res.redirect('/admin/settings')
    }
    if(req.body.type_value == 5){
        if(typeof req.body.value == 'string'){
            await main.settings.EditSettings(req.body.value, req.body.id)
            return res.redirect('/admin/settings')
        }
        let tmp = ''
        for (const i in req.body.value) {
            if(i == req.body.value.length -1)
                tmp +=req.body.value[i]    
            else
                tmp +=req.body.value[i]+','
        }
        await main.settings.EditSettings(tmp, req.body.id)
        return res.redirect('/admin/settings')
    }
    await main.settings.EditSettings(req.body.value, req.body.id)
    return res.redirect('/admin/settings')
}

exports.GetUsers = async (req, res)=>{
    let users = await main.user.GetUsers()
    const roleUser = await main.permission.GetRoleUser()
    let isMore = false
    if(users.length > 100){
        users = users.splice(0, 100)
        isMore = true
    }
        
    res.render(process.env.dirname+'/views/listUsers.hbs', {
        users,
        roleUser,
        isMore,
        title: 'Список пользователей',
        isAdmin: true,
        isUsers: true
    })
}

exports.GetNewOrders = async(req, res)=>{
    const orders = await main.product.GetOrdersByStatus(1)
    res.render(process.env.dirname+'/views/listOrders.hbs', {
        isNewOrder: true,
        title: 'Не обработанные заказы',
        orders,
        isAdmin:true
    })
}

exports.GetOldOrders = async(req, res)=>{
    const orders = await main.product.GetOrdersByStatus(2)
    res.render(process.env.dirname+'/views/listOrders.hbs', {
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
    res.render(process.env.dirname+'/views/listOrders.hbs', {
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
exports.EditOrder = async(req, res)=>{
    await main.product.EditOrder(req.body.number, req.body.address, req.body.orderId)
    res.redirect(req.headers.referer)
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
