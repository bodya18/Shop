const MainService = require('../services/main')
const main = new MainService

exports.MainPage = async (req, res)=>{
    let settings = await main.settings.getSettings()
    let slider_images, Main_3_top_products, main_bottom_banner, main_hot_product
    for (const i in settings) {
        if (settings[i]._key === 'Main_slider') {
            slider_images = settings[i].value.split(',')
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
        top_product,
        main_bottom_banner,
        main_hot_product,
    })
}

exports.SinglePage = async (req, res) => {
    let product = await main.product.GetProductById(req.params.id)
    if(!product)
        return res.render('404.hbs',{title: 'Ошибка'})
    let settings = await main.settings.getSettingsByKey('main_hot_product')
    let hot_product = await main.product.GetProductById(settings.value)
    let dimension = await main.product.GetDimensionProductByProductId(req.params.id)
    res.render('santorini5/single.hbs', {
        title: product.title,
        hot_product,
        product,
        dimension,
        error: req.flash('error')
    })
}