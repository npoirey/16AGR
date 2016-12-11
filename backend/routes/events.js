'use strict';

const express = require('express');
const router = express.Router();
const EventModel = require('../models/EventModel');

router.get('/', (req, res) => {
  EventModel.fetchAll().then((events)=> {
    res.send(events)
  })
});

module.exports = router;
