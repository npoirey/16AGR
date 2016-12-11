const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel');
const logger = require('../core/logger');
bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(authenticate));

function authenticate(email, password, done) {
  UserModel.where('email', email).fetch({require: true})
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.get('password'))) {
        logger.info(`user ${email} authenticated`);
        let json = user.toJSON();
        delete json.password;
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

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  UserModel.where('id', id).fetch({require: true})
    .then((user) => done(null, user))
    .catch((err) => done(err))
});

module.exports = passport;
