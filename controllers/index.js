const MainService = require('../services/main')

exports.GetData = async (req, res)=>{
    const main = new MainService;
    let Product = await main.product.GetAllProduct()
    let DimensionProducts = await main.product.GetAllDimensionProducts()
    let categories = await main.product.GetAllCategories()
    res.render('view.hbs', {
        title: 'вывод данных',
        Product,
        DimensionProducts,
        categories
    })
}