'use strict';

const express = require('express');
const router = express.Router();
const UserPreference = require('../models/UserPreference.js');

router.post('/preferences', (req, res, next) => {
  /*const userId = req.user.id;
   if(userId !== req.body.userId){
   next({
   status: 401,
   message: 'Not allowed'
   })
   }*/
  const userId = req.body.userId;
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

router.get('/account', (req, res) => {
  console.log(req.body);
  res.send({strst: "eeii"})
});

module.exports = router;
