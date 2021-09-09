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
exports.getCookies = async (req, res) =>{
    if('data' in req.cookies){
        return res.json(true)
    }
    return res.json(false)
}    
exports.setCookies = async (req, res) =>{
    let settings = await main.settings.getSettings()
    for (const i in settings) {
        if(settings[i]._key === 'Main_header'){
            var main_header = settings[i].value
            break;
        }
    }
    res.cookie('data', {main_header},{
        maxAge: 1000*60*60*24*3
    })
    return res.json()
} 