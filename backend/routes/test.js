'use strict';

const express = require('express');
var router = express();

router.get("/test", function (req, res, next) {
  res.send(200);
});

module.exports = router;
