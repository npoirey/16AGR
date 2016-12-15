var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var path = require('path');
var passport = require('passport');
require('./middlewares/passport');
var session = require('express-session');
const logger = require('./core/logger');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'this is secret !',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', require('./routes/auth'));
app.use('/events', require('./routes/events'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res, next) =>
  res.send({
    session: req.session,
    user: req.user,
    authenticated: req.isAuthenticated()
  }));


//passport.authenticate('local', {successRedirect: '/auth/account', failureRedirect: '/'}));
app.get('/logout', (req, res, next) =>
  req.session.destroy((err) => res.redirect('/')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    logger.error(err);
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  logger.info('Hello distributed log files!');
  res.status(err.status || 500);
  res.send({
    message: err.message
  });
});


module.exports = app;
