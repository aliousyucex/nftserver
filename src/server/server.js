const mysqlCon = require('./db/connection');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Router = require('./routes/router');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', Router);

app.listen(3003);