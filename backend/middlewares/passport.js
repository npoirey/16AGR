const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const logger = require('../core/logger');
const bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(authenticate));

function authenticate(email, password, done) {
  User.where('email', email).fetch({withRelated: 'preferences'})
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.get('password'))) {
        logger.info(`user ${email} authenticated`);
        let json = user.toJSON();
        delete json.password;
        logger.info(json);
        return done(null, json)
      } else {
        logger.info(`login failed for user ${email}`);
        return done(null, false)
      }
    })
    .catch((err) => {
      logger.error(err);
      done(err)
    })
}

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.where('id', id).fetch({require: true, withRelated: ['preferences']})
    .then((user) => done(null, user))
    .catch((err) => done(err))
});

module.exports = passport;
