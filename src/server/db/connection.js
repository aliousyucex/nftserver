const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Asd123!!",
    database:"elephantyacthclub"
});

const connectTry = async () => {
    const myPromise = new Promise((resolve, reject) => {
        mysqlConnection.connect((err) => {
            if(err){
                console.log("Connection Failed");
                reject();
                return;
            } 
                console.log("Connected");
                resolve();
        });
    })
}

module.exports = {mysqlConnection, connectTry};