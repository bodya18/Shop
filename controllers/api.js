const Main = require("../services/main")
const main = new Main;

exports.DoneOrders = async(req, res)=>{
    let orders = await main.product.GetOrdersByStatus(3)
    res.json(orders)
}