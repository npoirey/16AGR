'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const {loginRequired} = require('../middlewares/authorisations');

router.get('/', loginRequired, (req, res) => {
  Event.fetchAll().then((events)=> {
    res.send(events)
  })
});

module.exports = router;
