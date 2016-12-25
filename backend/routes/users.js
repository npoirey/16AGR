'use strict';

const express = require('express');
const router = express.Router();
const UserPreference = require('../models/UserPreference.js');
const User = require('../models/User.js');
const {loginRequired, adminRequired} = require('../middlewares/authorisations');

router.post('/preferences', loginRequired, (req, res, next) => {
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

router.post('/synthesis', adminRequired, (req, res, next) => {
  const userDao = new User();
  const request = req.body;
  if (request.filters && request.filters.length > 0) {
    request.filters.forEach((filter) => {
      switch (filter.type) {
        case 'boolean':
          userDao.where(filter.name, filter.pattern);
          break;
        case 'contains':
          userDao.where(filter.name, '~*', filter.pattern);
          break;
        default:
          break;
      }
    });
  }
  if (request.sort && request.sort.name && request.sort.order) {
    userDao.orderBy(request.sort.name, request.sort.order);
  }
  userDao.fetchAll()
    .then((users) => {
      res.send({
        success: true,
        message: 'Users fetched',
        items: users
      })
    })
    .catch((err) => {
      err.message = 'Could not fetch users';
      next(err);
    })
});

module.exports = router;
