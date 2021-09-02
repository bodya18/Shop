const Main = require('../services/main')
const mail = require('../middleware/nodemailer')

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
        res.json(UserData)
        return
    }
    req.session.Perm = []
    req.session.user = UserData.user
    req.session.isAuthenticated = true
    req.session.userIden = UserData.id
    
    req.session.save(err =>{
        if(err){
            throw err
        }
        mail.acceptAcc(UserData.user.token, UserData.user.email)
    })
    res.json(UserData)
}