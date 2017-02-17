// SERVER FILE
// REQUIRING NEEDED PACKAGES
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// COINNECTING TO DB
mongoose.connect('mongodb://127.0.0.1:27017/bears'); // connect to our database
// DATABASE MODELS
var Bear     = require('./app/models/bear');

// ADDING bodyParser() TO GET DATA FROM POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SETTING PORT
var port = process.env.PORT || 8080;

// ADDING ROUTES
var routes = require('./routes')(app,express,Bear);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);