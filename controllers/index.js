const pool = require('../model/tables');
const MainService = require('../services/main')

exports.GetData = async (req, res)=>{
    const main = new MainService;
    let Product = await main.product.GetAllProduct()
    res.render('view.hbs', {
        title: 'вывод данных',
        Product
    })
}