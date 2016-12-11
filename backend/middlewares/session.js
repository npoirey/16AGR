const session = require('express-session')({
  secret: process.env.SESSION_SECRET || 'this is secret !',
  resave: false,
  saveUninitialized: false
});

module.exports = session;
