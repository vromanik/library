var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'node',
  password : '123456',
  database : 'library'
});

connection.connect();

connection.query('SELECT userStatus FROM user_status', function (err, result, fields) {
    if (err) throw err
  
    console.log(result);
  })
  
  connection.end()