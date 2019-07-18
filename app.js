const http = require('http');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = require('./routes/user.js');

app.use(router);

app.listen(3000, function() {
    console.log('Server port 3000 is started');
  })
  