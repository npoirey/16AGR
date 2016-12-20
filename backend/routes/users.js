'use strict';

const express = require('express');
const router = express.Router();
const UserPreference = require('../models/UserPreference.js');
const authorisations = require('../middlewares/authorisations');

router.post('/preferences', authorisations.loginRequired, (req, res, next) => {
  const userId = req.user.id;
  delete req.body.userId;
  new UserPreference({userId: userId}).save(req.body, {method: 'update'})
    .then(() => {
      res.send({
        success: true,
        message: 'Preferences saved'
      })
    })
    .catch((err) => {
      err.message = 'Could not save preferences';
      next(err);
    })
});

module.exports = router;
