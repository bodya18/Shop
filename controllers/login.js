const Main = require('../services/main')
const main = new Main
const mail = require('../middleware/nodemailer');

exports.loginLogic = async(req,res) => {
    if(!req.body) return res.sendStatus(400)
    const UserData = await main.user.loginLogic(req.body.email, req.body.password)
    if (!UserData.isAuth) {
        res.json(UserData)
        return
    }
    
    req.session.user = UserData.user
    req.session.isAuthenticated = UserData.isAuthenticated
    req.session.Perm = UserData.Perm
    req.session.Admin = false
    for (const i in UserData.Perm) {
        if(UserData.Perm[i] === 'GIVE')
            req.session.Admin = true
    }
    req.session.save(err =>{
        if(err){
            throw err
        }
    })
    res.json(UserData)
}

exports.Accept = async (req,res) => {
    await main.user.SetStatus(req.params.token, 2)
    return res.redirect('/')
}

exports.recovery = async (req, res) => {
    if(req.session.isAuthenticated)
        return res.redirect('/')
    return res.render(process.env.dirname+'/views/recovery.hbs',{
        title: 'Забыли пароль?'
    })
}

exports.recoveryPass = async (req, res) =>{
    const token = await main.user.recovery(req.body.email)
    mail.recoveryPass(req.body.email, token)
}

exports.NewPass = async (req, res) =>{
    if(req.session.isAuthenticated)
        return res.redirect('/')
    const error = await main.user.NewPass(req.params.token)
    res.render(process.env.dirname+'/views/NewPass',{
        title: 'Восстановления пароля',
        error,
        token: req.params.token
    })
}

exports.SetNewPass = async (req, res) =>{
    const data = await main.user.setPass(req.body.token, req.body.password)
    if (data) {
        const user = await main.user.getByToken(req.body.token)
        await main.user.delPassToken(req.body.token)
        res.redirect(`/`)
        mail.NewPass(user.email)
    }
    else
        return res.redirect(`/`)
}