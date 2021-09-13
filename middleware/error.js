const Main = require("../services/main")
const main = new Main

module.exports = async function (req, res, next) {
    let settings = await main.settings.getSettings()
    let Main_3_top_products, main_bottom_banner, main_hot_product
    for (const i in settings) {
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
    res.status(404).render(process.env.dirname+'/views/404.hbs',{
        title: "Ошибка, страница не найдена!",
        top_product,
        main_bottom_banner,
        main_hot_product,
    })
}