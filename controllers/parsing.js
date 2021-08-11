const MainService = require('../services/main')

exports.ParseData = async (req, res)=>{
    const main = new MainService;
    let data = await main.product.ParseData()
    await main.product.SetDataInDB(data)
    
    res.redirect('/')
}