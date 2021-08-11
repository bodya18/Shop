const MainService = require('../services/main')

exports.GetData = async (req, res)=>{
    const main = new MainService;
    let Product = await main.product.GetAllProduct()
    let DimensionProducts = await main.product.GetAllDimensionProducts()
    let category = await main.product.GetAllCategories()
    let categories = []
    for (let i = 0; i < category.length; i++) {
        let data = await main.product.GetProductByCategoryId(category[i].id)
        if(data.length)
            categories.push(category[i])
    }
    res.render('view.hbs', {
        title: 'вывод данных',
        Product,
        DimensionProducts,
        categories
    })
}