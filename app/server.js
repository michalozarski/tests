// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
//below to list routes
expressListRoutes   = require('express-list-routes');

var jwt		= require('jsonwebtoken'); // used to create, sign, and verify tokens
var config	= require('./config'); // get our config file
var Driver	= require('./app/models/driver'); // get our mongoose model
var aToken	= require('./app/models/token');

// configuration =========
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('somesecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// basic route
app.get('/', function(req, res) { res.send('Hello! The API is at http://localhost:' + port + '/api'); });
// ADDING ROUTES
var userRoutes = require('./routes/userRoutes')(app,express,Driver);
var authRoutes = require('./routes/authRoutes')(app,express,jwt,Driver,aToken);
var driverRouteaa = require('./routes/driverRoutes')(app,express,jwt,Driver,aToken);
expressListRoutes({ prefix: '/api' }, 'API:', driverRoutes );

// start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);