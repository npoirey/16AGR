const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const serveStatic = require('serve-static')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
require('./middlewares/passport')
const session = require('./middlewares/session')
const logger = require('./core/logger')

const app = express()

app.use(serveStatic(`${__dirname}/public`))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', require('./routes/auth'))
app.use('/events', require('./routes/events'))
app.use('/users', require('./routes/users'))

app.get('/', (req, res) =>
  res.send({
    session: req.session,
    user: req.user,
    authenticated: req.isAuthenticated(),
  }))

app.get('/user.js', (req, res) =>
  res.send(
    `window.user=${JSON.stringify(req.user)};`
  ))

// passport.authenticate('local', {successRedirect: '/auth/account', failureRedirect: '/'}));
app.get('/logout', (req, res) =>
  req.session.destroy(() => res.redirect('/')))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
// Json schemas error handler
app.use((err, req, res, next) => {
  if (err.status && err.status === 400 && !err.message) {
    return next(
      {
        ...err,
        message: err.reason[0].message,
      })
  }
  // pass error to next error middleware handler
  return next(err)
})

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || 500)
  res.send({
    ...err,
    message: app.get('env') !== 'production' ? err.message : null,
  })
})


module.exports = app
