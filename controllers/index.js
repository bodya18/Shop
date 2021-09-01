const MainService = require('../services/main')
const main = new MainService
exports.GetData = async (req, res)=>{
    let settings = await main.settings.getSettings()
    let slider_images, main_header, Main_3_top_products, main_bottom_banner, main_hot_product
    for (const i in settings) {
        if (settings[i]._key === 'Main_slider') {
            slider_images = settings[i].value.split(',')
            continue;
        }
        if(settings[i]._key === 'Main_header'){
            main_header = settings[i].value
            continue;
        }
        if (settings[i]._key === 'Main_3_top_products') {
            Main_3_top_products = settings[i].value.split(',')
            continue;
        }
        if (settings[i]._key === 'main_bottom_banner') {
            main_bottom_banner = settings[i].value
            continue;
        }
        if (settings[i]._key === 'main_hot_product') {
            console.log(settings[i]);
            main_hot_product = settings[i].value
            continue;
        }
    }
    main_hot_product = await main.product.GetProductById(main_hot_product)
    let top_product = []
    for (const i in Main_3_top_products)
        top_product[i] = await main.product.GetProductById(Main_3_top_products[i])

    res.render('santorini5/index.hbs',{
        title: 'Главная страница',
        slider_images,
        main_header,
        top_product,
        main_bottom_banner,
        main_hot_product,
    })
}