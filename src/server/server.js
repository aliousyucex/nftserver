const mysqlCon = require('./db/connection');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Router = require('./routes/router');
var app = express();
app.use(bodyParser.json());

app.use('/', Router);

async function boot() {
    await mysqlCon.connectTry();
    app.listen(3003);
}
boot()
.then(() => {
    console.log('yey')})
.catch((err) => {
    console.error(err);
    process.exit(1);
});
