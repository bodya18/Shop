const nodemailer = require('nodemailer')
const config = require('config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'bodya18xx@gmail.com',
    pass: 'zaqwsxz1.',
    },
})

exports.acceptAcc = async (token, email) => {
    let result = await transporter.sendMail({
    to: email,
    subject: 'Детская одежда',
    html:
        `<p>Подтвержение аккаунта</p> 
        <p>Если вы не регистрировали аккаунт просто проигнорируйте данное сообщение</p>
        <p>Иначе для потверждения перейдите по <a href="${config.site}/login/accept/${token}">ссылке</a></p>`
    })    
}

exports.recoveryPass = async (email, token) =>{
    let result = await transporter.sendMail({
    to: email,
    subject: 'Детская одежда',
    html:
        `<p>Восстановление пароля</p> 
        <p>Если вы не запрашивали восстановления пароля просто проигнорируйте данное сообщение</p>
        <p>Иначе для восстановления перейдите по <a href="${config.site}/login/recovery/${token}">ссылке</a></p>`
    })    
}

exports.NewPass = async (email) =>{
    let result = await transporter.sendMail({
    to: email,
    subject: 'Детская одежда',
    html:
        `<p>Пароль успешно восстановлен</p> 
        <p>Переходите по <a href="${config.site}">ссылке</a> на наш интернет магазин!`
    })    
}