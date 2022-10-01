const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const Router = express.Router();
const mysqlCon = require('../db/connection');
Router.use(express.json())

Router.get('/score', (req, res) => {
    mysqlCon.query('SELECT * FROM score', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

Router.get('/subscribe', (req, res) => {
    mysqlCon.query('SELECT * FROM subscribe', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

Router.post('/subscribe', (req, res) => {
    mysqlCon.query(`
    SELECT count(*) as exist FROM subscribe WHERE email = '${req.body.email}';
    `
        ,
        (err, rows, fields) => {
            if (!err) {
                if (rows[0].exist < 1)
                mysqlCon.query(`
                INSERT INTO subscribe (email) VALUES ('${req.body.email}');
                `,
                (err, rows, fields) => {
                    if (!err) {
                        res.send({msg:'Sucsessfuly added adress!'});
                    }
                    else {
                        res.send(err);
                    }
                 })
                 else {
                    
                    res.status(500).send('This email address already exist!');
                 }
            }
            else {
                res.send(err);
            }
        })
});



module.exports = Router;