const Main = require("../services/main");
const main = new Main

exports.p_createOrder = async (req, res)=>{
    let userId
    if(req.session.isAuthenticated)
        userId = req.session.user.id
    const error = await main.product.CreateOrder(req.body.number, req.body.address, req.body.DimensionProductId, userId)
    if(error)
        req.flash('error', error)
    res.redirect(req.headers.referer)
}
exports.g_createOrder = async (req, res)=>{
    res.render('CreateOrder.hbs', {
        isAdmin:true,
        isCreateOrder: true,
        title: 'Создание заказа',
        error: req.flash('error')
    })
}