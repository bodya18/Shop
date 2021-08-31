const Main = require("../services/main")
const main = new Main;

exports.DoneOrders = async(req, res)=>{
    let orders = await main.product.GetOrdersByStatus(3)
    res.json(orders)
}

exports.Users = async(req, res)=>{
    let users = await main.user.GetUsers()
    const roleUser = await main.permission.GetRoleUser()
    let data = {roleUser, users}
    res.json(data)
}

exports.getSettings = async (req, res) =>{
    let settings = await main.settings.getSettings()
    res.json(settings)
}