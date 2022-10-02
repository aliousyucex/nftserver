const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const Router = express.Router();
const mysqlCon = require('../db/connection');
const sendEmail = require('@sendgrid/mail')

sendEmail.setApiKey(process.env.SENDGRID_API_KEY)
Router.use(express.json())


Router.get('/score', (req, res) => {
    mysqlCon.query('SELECT * FROM score', (err, rows) => {
        if (!err) {
            const sortData = [];
            for(var scoreText in rows) {
                rows.sort(function(a, b) {
                    return a.scoreInt - b.scoreInt;
                });
            }
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
});

Router.post('/score', (req, res) => {
    mysqlCon.query(`
    INSERT INTO score 
        (userName, scoreText, scoreInt) 
    VALUES  
        ('${req.body.userName}','${req.body.scoreText}',${req.body.scoreInt});
    `,
    (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
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

                        const maildata = {
                            to: req.body.email,
                            from: 'sponsorship@elephantyachtclub.com',
                            templateId: 'd-9e67dc44ceb248f588a45f416d1e3e39',
                        }

                        sendEmail.send(maildata).then(() => {
                            console.log('Email sent')
                        }).catch((error) => {
                         console.error(error)
  })
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