const Main = require("../services/main")
const main = new Main

exports.p_search = async (req, res) =>{
    if (req.body.search === '') {
        return res.redirect(req.header(`Referer`))
    }
    res.redirect(`/search/${req.body.search}`)
}

exports.g_search = async (req, res) =>{
    let products = await main.product.search(req.params.search)
    console.log(products);
    // news = news.slice(0,10)
    // let isMore = false
    // if(news.length === 10)
    //     isMore = true
    res.render('search.hbs',{
        title: req.params.search,
        // isMore
    })
}