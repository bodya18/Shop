const Main = require('../services/main')
// const mail = require('../middleware/nodemailer')

exports.GetRegister = (req,res) => {
    if(req.session.isAuthenticated)
        return res.redirect('/')
    else{
        res.render('register.hbs', {
            title: 'Регистрация',
            error: req.flash('error'),
            isRegister: true
        })
    }
    
}

exports.registerLogic = async (req,res) => {
    if(!req.body) return res.sendStatus(400)
    const main = new Main
    const UserData = await main.user.registerLogic(req.body.email, req.body.name, req.body.password, req.body.repeat)

    if (!UserData.isAuth) {
        req.flash('error', UserData.error)
        return res.redirect(`/register`)
    }
    req.session.Perm = []
    req.session.user = UserData.user
    req.session.isAuthenticated = true
    req.session.userIden = UserData.id
    
    req.session.save(err =>{
        if(err){
            throw err
        }
        res.redirect(`/`)
        // mail.acceptAcc(UserData.user.token, UserData.user.email)
    })

}