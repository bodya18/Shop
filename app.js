const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const SessionStore = require('express-mysql-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const path = require('path');
var glob = require("glob")

const varMiddleware = require('./middleware/variables')
const errorHandler = require('./middleware/error')
const config = require('./middleware/config');
config.dirname = __dirname

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views/layouts"),
    extname: 'hbs',
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: require('./utils/hbs-helper')
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.engine('html', require('ejs').renderFile);

app.set('views', 'views')
app.use(express.static(__dirname))
var options = {
    host: config.host,
    user: 'root',
    password: 'ZAQwsxz1.',
    database: 'shop'
}

app.use(session({
    secret: config.sessionSecretKey,
    resave: false,
    saveUninitialized: false,
    store: new SessionStore(options)
}))
app.use(cookieParser(config.cookieSecret))
app.use(flash())
app.use(varMiddleware)

glob(config.dirname + "/routes/*.js", options, function (er, files) {
    for (const i in files)
        app.use('/', require(files[i]))
    app.use(errorHandler)
})

app.listen(config.port)