const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
require('./middlewares/passport');
const session = require('./middlewares/session');
const logger = require('./core/logger');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session);
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

app.get('/user.js', (req, res, next) =>
  res.send(
    `window.user=${JSON.stringify(req.user)};`
  ));


//passport.authenticate('local', {successRedirect: '/auth/account', failureRedirect: '/'}));
app.get('/logout', (req, res, next) =>
  req.session.destroy((err) => res.redirect('/')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
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
app.use(function (err, req, res) {
  logger.info('Hello distributed log files!');
  res.status(err.status || 500);
  res.send({
    message: err.message
  });
});


module.exports = app;
