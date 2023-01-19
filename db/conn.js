const mysql = require('mysql');

const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "bigbboy"
});

connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("DB Connected");
    }
});

module.exports = connection;