var express     = require('express');
var app         = express();
var aToken = require('./app/models/token');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var mongoose    = require('mongoose');
var config = require('./config'); // get our config file
mongoose.connect(config.database); // connect to database
app.set('somesecret', config.secret); // secret variable

aToken.find({status:1}, function(err, tokens) {
	//console.log(tokens);
	for (i = 0; i < tokens.length; i++) {
		// get the decoded payload ignoring signature, no secretOrPrivateKey needed
		var decoded = jwt.decode(tokens[i].token);
		console.log('Token for '+ decoded.name + ' expires in ' + (decoded.exp - timeNow) + ' seconds..');
		if(decoded.exp < timeNow) {
			console.log('Token for '+ decoded.name + ' expires in ' + (decoded.exp - timeNow) + ' seconds..');
		//console.log(tokens[i].token);

		name = decoded.name;

		options = {};
		timestamp = Date.now();
		condition = {name:name};

		console.log(condition);
		query = { $set: { status: 0, updated: timestamp }};
		console.log(query);
		aToken.update(condition, query, options, function(err) {
            if (err)
                console.log(err); 
			else
				console.log('bajka');
        });
			
		}
}});

timeNow = Math.round(new Date().getTime() / 1000);