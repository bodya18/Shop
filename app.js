const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const SessionStore = require('express-mysql-session')
const flash = require('connect-flash')
const path = require('path');

const varMiddleware = require('./middleware/variables')
const errorHandler = require('./middleware/error')
const config = require('./middleware/config');
config.dirname = __dirname

const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const logoutRouter = require('./routes/logout')
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api')

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

app.use(flash())
app.use(varMiddleware)

app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/admin', adminRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/register', registerRouter)

app.use(errorHandler)

app.listen(config.port)