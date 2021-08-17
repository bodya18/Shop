module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated
    res.locals.permissionsList = req.session.Perm
    res.locals.ThisUser = req.session.user
    next()
}