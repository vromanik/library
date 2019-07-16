const http = require('http');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.send('API home page')
  })

app.get('/addAuthor', function (req, res) {
  res.render('addAuthorForm')
  })

app.post('/addAuthor', urlencodedParser, function (req, res) {
    let data = JSON.parse(req.body);
    let firstName = data["name"];
    console.log(firstName);
    res.send('Server has got the request')
  })

app.listen(3000, function() {
    console.log('Server port 3000 started');
  })
