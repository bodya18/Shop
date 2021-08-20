const Main = require('../services/main');
const main = new Main

exports.GetUser =async (req, res)=>{
    const user = await main.user.GetUser(req.params.id)
    let is = false
    if(!user)
        return res.render('noUser.hbs')
    if (req.params.id == req.session.user.id) {
        is = true
    }
    else{
        for (let i = 0; i < req.session.Perm.length; i++) {
            if ((req.session.Perm[i]==='GIVE')) {
                is = true
            }
        }
    }
    if(is){
        const RoleUser = await main.permission.GetRoleUser()
        const roles = await main.role.GetRoles()
        var SelectRoles = await main.role.GetUserRoles(req.params.id)
        var a = []
        for (let i = 0; i < SelectRoles.roles.length; i++) {
            for (let j = 0; j < SelectRoles.users.length; j++) {
                if (SelectRoles.roles[i].id === SelectRoles.users[j].roleId){
                    a.push(SelectRoles.roles[i])
                }
            }
        }
        for (let i = 0; i < SelectRoles.roles.length; i++) {
            for (let j = 0; j < a.length; j++) {
                if(a[j].id === SelectRoles.roles[i].id)
                    SelectRoles.roles.splice(i, 1)
            }
        }
        const orders = await main.product.GetOrdersByUserId(req.params.id)
        return res.render('profile.hbs', {
            users: user, 
            title: 'Профиль',
            SelectRoles: a,
            NonSelectRoles: SelectRoles.roles,
            RoleUser,
            orders,
            thisUserId: req.params.id,
            roles: roles.roles,
            isUsers: true
        })
    }
    else res.redirect('/profile/'+ req.session.user.id)
}