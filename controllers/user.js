const Main = require('../services/main');
const main = new Main

exports.GetUser =async (req, res)=>{
    const user = await main.user.GetUser(req.params.id)
    if(!user)
        return res.render('noUser.hbs')
    // if (req.params.id === req.session.userIden) {

        // const netw = await rbac.user.GetSocialNetw(req.params.id)

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
    // }
    // else{
    //     for (let i = 0; i < req.session.Perm.length; i++) {
    //         if ((req.session.Perm[i]==='GIVE')) {

    //             const netw = await rbac.user.GetSocialNetw(req.params.id)

    //             const perm = await rbac.permission.GetAllConnection()
    //             const rules = await rbac.role.GetRoles()

    //             var SelectRoles = await rbac.role.GetUserRoles(req.params.id)
    //             var a = []
    //             for (let i = 0; i < SelectRoles.rules.length; i++) {
    //                 for (let j = 0; j < SelectRoles.users.length; j++) {
    //                     if (SelectRoles.rules[i].id === SelectRoles.users[j].ruleId){
    //                         a.push(SelectRoles.rules[i])
    //                     }
    //                 }
    //             }
    //             for (let i = 0; i < SelectRoles.rules.length; i++) {
    //                 for (let j = 0; j < a.length; j++) {
    //                     if(a[j].id === SelectRoles.rules[i].id)
    //                         SelectRoles.rules.splice(i, 1)
    //                 }
    //             }
    //             return res.render('profile.hbs', {
    //                 users: UserData, 
    //                 title: 'Профиль',
    //                 SelectRules: a,
    //                 netw,
    //                 NonSelectRules: SelectRoles.rules,
    //                 rules_users: perm.rule_user,
    //                 rules: rules.rules,
    //                 thisUserId: req.params.id,
    //                 isUsers: true
    //             })
    //         }
    //     }
    //     return res.redirect('/news')
    // } 
}