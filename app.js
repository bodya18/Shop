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
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views')
app.use(express.static(__dirname))

app.use('/parsing', parsingRouter)
app.use('/', indexRouter)


app.listen(3000)