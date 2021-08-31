const MainService = require('../services/main')
const main = new MainService
const config = require('config');
exports.GetData = async (req, res)=>{
    // const main = new MainService;
    // let Product = await main.product.GetAllProduct()
    // let DimensionProducts = await main.product.GetAllDimensionProducts()
    // let category = await main.product.GetAllCategories()
    // let categories = []
    // for (let i = 0; i < category.length; i++) {
    //     let data = await main.product.GetProductByCategoryId(category[i].id)
    //     if(data.length)
    //         categories.push(category[i])
    // }
    let settings = await main.settings.getSettings()
    let slider_images, main_header
    for (const i in settings) {
        if (settings[i]._key === 'Main_slider') {
            slider_images = settings[i].value
            continue;
        }
        if(settings[i]._key === 'Main_header'){
            main_header = settings[i].value
            continue;
        }
    }
    slider_images = slider_images.split(',')
    res.render('santorini5/index.hbs',{
        title: 'Главная страница',
        slider_images,
        main_header
    })
}