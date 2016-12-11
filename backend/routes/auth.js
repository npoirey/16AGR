'use strict';

const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const logger = require('../core/logger');

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return res.status(400).json({success: false, message: "an error occured on the server"});
    } else if (!user) {
      return res.status(400).json({success: false, message: "Invalid credentials"});
    } else {
      return res.json({success: true, message: 'Logged in', payload: user});
    }

  })(req, res, next);
});

router.get('/logout', (req, res, next) =>
  req.session.destroy((err) => res.redirect('/')));

module.exports = router;
