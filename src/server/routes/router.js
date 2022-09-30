const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const Router = express.Router();
const mysqlCon = require('../db/connection');
Router.use(express.json())

Router.get('/', (req, res) => {
    mysqlCon.query('SELECT * FROM subscribe', (err, rows) => {
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});


Router.post('/', (req, res) => {
        mysqlCon.query(
            `INSERT INTO subscribe (email) VALUES ( '${req.body.email}');`
            , 
        (err, rows, fields) => {
            if(!err){
                res.send(rows);
            }
            else{
                res.send(err);
            }
        })
});

module.exports = Router;