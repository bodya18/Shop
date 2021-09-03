const Main = require("../services/main")
const main = new Main

exports.p_search = async (req, res) =>{
    if (req.body.search === '') {
        return res.redirect(req.header(`Referer`))
    }
    res.redirect(`/search/${req.body.page}/${req.body.search}`)
}

exports.g_search = async (req, res) =>{
    let products = await main.product.search(req.params.search)
    let countPages = Math.ceil(products.length/16)
    let page = req.params.page
    products = products.slice(16*(page-1),16*(page))
    res.render('santorini5/listing-4col.hbs',{
        title: req.params.search,
        search: req.params.search,
        products,
        countPages,
        page
    })
}