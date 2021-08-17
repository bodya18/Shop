const Main = require('../services/main')

exports.GetLogin = (req,res) => {
    if(req.session.isAuthenticated)
        return res.redirect('/')
    else{
        res.render('login.hbs', {
            title: 'Вход',
            error: req.flash('error'),
            isLogin: true
        })
    }
    
}

exports.loginLogic = async(req,res) => {
    if(!req.body) return res.sendStatus(400)
    const main = new Main
    const UserData = await main.user.loginLogic(req.body.email, req.body.password)
    if (!UserData.isAuth) {
        req.flash('error', UserData.error)
        return res.redirect(`/login`)
    }
    
    req.session.user = UserData.user
    req.session.isAuthenticated = UserData.isAuthenticated
    // req.session.Perm = UserData.Perm
    
    req.session.save(err =>{
        if(err){
            throw err
        }
        res.redirect(`/`)
    })
}