const Main = require("../services/main")
const main = new Main

exports.p_search = async (req, res) =>{
    if(req.body.categoryId != -1){
        return res.redirect(`/category/${req.body.page}/${req.body.categoryId}`)
    }
    if (req.body.search === '') {
        return res.redirect(req.header(`Referer`))
    }
    res.redirect(`/search/${req.body.page}/${req.body.search}`)
}

exports.g_search = async (req, res) =>{
    
    if('categoryId' in req.params){
        var products = await main.product.searchCategory(req.params.categoryId)
        var isCategorySearch = true
        var categoryId = req.params.categoryId
    }else{
        var products = await main.product.search(req.params.search)
    }
    if(products.length===0){
        return res.render(process.env.dirname+'/views/santorini5/listing-4col.hbs',{
            title: req.params.search,
            search: "Ничего не найдено",
            noneProduct:true,
            categoryId
        })
    }
    let countPages = Math.ceil(products.length/16)
    let page = parseInt(req.params.page)
    if(page <= countPages && page>0){
        products = products.slice(16*(page-1),16*(page))
        return res.render(process.env.dirname+'/views/santorini5/listing-4col.hbs',{
            title: req.params.search,
            search: req.params.search,
            products,
            countPages,
            page,
            isCategorySearch,
            categoryId
        })
    }else{
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
    
}