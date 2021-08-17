const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path');

const errorHandler = require('./middleware/error')
const config = require('./middleware/config');
config.dirname = __dirname

const parsingRouter = require('./routes/parsing');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

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


app.use('/', indexRouter)
app.use('/admin', adminRouter)
app.use('/parsing', parsingRouter)

app.get('/admin', (req, res)=>{
    
})

app.use(errorHandler)

app.listen(3000)