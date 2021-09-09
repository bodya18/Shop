const MainService = require('../services/main')
const main = new MainService

module.exports = async function(req, res, next) {


    res.locals.isAuth = req.session.isAuthenticated
    res.locals.permissionsList = req.session.Perm
    res.locals.ThisUser = req.session.user
    res.locals.isAdministrator = req.session.Admin


    if('data' in req.cookies){
        res.locals.main_header = req.cookies.data.main_header
    }else{            
        let settings = await main.settings.getSettings()
        for (const i in settings) {
            if(settings[i]._key === 'Main_header'){
                res.locals.main_header = settings[i].value
                break;
            }
        }
    }
    res.locals.categories = await main.product.GetAllCategories()

    next()
}