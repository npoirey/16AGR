'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../model/Event');

router.get('/', (req, res) => {
  Event.fetchAll().then((events)=> {
    res.send(events)
  })
});

module.exports = router;
