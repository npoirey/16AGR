'use strict';

const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const logger = require('../core/logger');

router.get('/', (req, res) => {
  res.send(req.user)
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  return res.json({success: true, message: 'Logged in', payload: req.user});
});

router.get('/logout', (req, res, next) =>
  req.session.destroy((err) => res.redirect('/')));

module.exports = router;
