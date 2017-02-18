const session = require('express-session')

const configuredSession = session({
  secret: 'this is secret ! for test purpose',
  resave: false,
  saveUninitialized: false,
})

module.exports = configuredSession
