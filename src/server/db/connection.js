const mysql = require('mysql2');
console.log('puuu')
var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Asd123!!",
    database:"elephantyacthclub"
});

const connectTry = async () => { 
    // bunu calistirdigim anca promise donmeli
    // baglanirsam ok
    // baglanamazsam promise reject vermeli
mysqlConnection.connect((err) => {
    if(!err){
        console.log("Connected");
    } 
    else{
        console.log("Connection Failed");
    }
});
}

module.exports = {mysqlConnection, connectTry};