exports.GetStartPage = async (req, res)=>{
    res.render('adminIndex.hbs', {
        title: 'Панель администрации'
    })
}