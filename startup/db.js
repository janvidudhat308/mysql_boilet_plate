var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'boiler_plate'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports=con;

