const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const SessionStore = require('express-mysql-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const path = require('path');
var glob = require("glob")
require('dotenv').config()
const varMiddleware = require('./middleware/variables')
const errorHandler = require('./middleware/error')
process.env.dirname = __dirname

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
console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
var options = {
    host: process.env.host,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}
app.use(session({
    secret: process.env.sessionSecretKey,
    resave: false,
    saveUninitialized: false,
    store: new SessionStore(options)
}))
app.use(cookieParser(process.env.cookieSecret))
app.use(flash())
app.use(varMiddleware)

glob(process.env.dirname + "/routes/*.js", options, function (err, files) {
    for (const i in files)
        app.use('/', require(files[i]))
    app.use(errorHandler)
})

app.listen(process.env.port)