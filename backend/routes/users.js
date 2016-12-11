'use strict';

const express = require('express');
const router = express.Router();

router.get('/account', (req, res) => {
  console.log(req.body);
  res.send({strst: "eeii"})
});

module.exports = router;
