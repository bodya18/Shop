const MainService = require('../services/main')

exports.ParseData = async (req, res)=>{
    const main = new MainService;
    let data = await main.product.ParseData()
    await main.product.SetDataInDB(data)
    
    res.render('index.hbs', {
        title: 'перезапись данных'
    })
}