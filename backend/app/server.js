'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;

const test = require("./routes/test.js");

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(test);


//app.use("/api", test);

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
