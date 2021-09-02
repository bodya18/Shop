const Main = require("../services/main");
const main = new Main

exports.p_createOrder = async (req, res)=>{
    let userId
    if(req.session.isAuthenticated)
        userId = req.session.user.id
    await main.product.CreateOrder(req.body.number, req.body.address, req.body.DimensionProductId, userId)
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