var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '181986'
});

app.get('/contactList', function(req, res) {
  var contactList = [];
  connection.query('USE MyApp');
  connection.query('SELECT * FROM contact', function(err, rows, field) {
    res.json(rows);
  });
});

app.post('/contactList', function(req, res) {
  var body = req.body;
  connection.query('USE MyApp');
  connection.query('INSERT INTO contact (name, email, number) VALUES (\'' + body.name + '\',\'' + body.email + '\',\'' + body.number + '\')');
 // connection.query('SELECT * FROM contact', function(err, rows, field) {
//    console.log(rows);
//  });
});

app.delete('/contactList/:id', function(req, res) {
  var id = req.params.id;
  connection.query('DELETE FROM contact WHERE ID=' + id);
});

app.get('/contactList/:id', function(req, res) {
  var id = req.params.id;
  connection.query('SELECT * FROM contact WHERE ID=' + id, function(err, rows, field) {
    res.json(rows[0]);
  });
});

app.put('/contactList/:id', function(req, res) {
  var id = req.params.id;
  var body = req.body;
  connection.query('UPDATE contact SET name=\'' + body.name + '\', email=\'' + body.email + '\', number=\'' + body.number + '\' WHERE ID=' + id, function(err, rows, field) {
    res.json(rows[0]);
  });
});

app.listen(3000);
console.log('Server running in port 3000');