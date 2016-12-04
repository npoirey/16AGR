'use strict';

const express = require('express');
const router = express.Router();
//const events = require('../')

router.post('/api/test', (req, res) => {
  console.log(req.body);
  res.send({strst: "eeii"})
});

module.exports = router;
