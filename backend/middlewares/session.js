const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const configuredSession = session({
  secret: process.env.SESSION_SECRET || 'this is secret !',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    host: process.env.REDIS_HOST || 'redis',
  }),
})

module.exports = configuredSession
