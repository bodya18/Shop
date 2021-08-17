const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path');
const config = require('./middleware/config');
config.dirname = __dirname

const parsingRouter = require('./routes/parsing');
const indexRouter = require('./routes/index');

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views/layouts"),
    extname: 'hbs',
    helpers: require('./utils/hbs-helper')
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views')
app.use(express.static(__dirname))

app.use('/parsing', parsingRouter)
app.use('/', indexRouter)

app.get('/admin', (req, res)=>{
    res.render('AdminLTE-3.1.0/index.hbs')
})


app.listen(3000)