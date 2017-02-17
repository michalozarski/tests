module.exports = function (app,express,jwt,Driver,aToken) {
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
var apiRoutes = express.Router(); 

apiRoutes.post('/authenticate', function(req, res) {
  // find the user
  Driver.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. Driver not found.' });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
	// create a token if user is found and password is right
	newdata = {name:user.name, plec:user.sex};
        var token = jwt.sign(newdata, app.get('somesecret'), {
          expiresIn: '1h' // expires in 24 hours
        });
		id = user._id;
		options = {upsert: true, setDefaultsOnInsert: true};
		timestamp = Date.now();
		condition = {_id:id} 
		query = { $set: { name: user.name, token: token, updated: timestamp, status: 1 }};
		aToken.update(condition, query, options, function(err) {
            if (err)
                res.send(err);
            res.json({ 
			user: user,
			message: 'Token created and stored in DB!', 
			success: true,
			token: token
			});
        });
      }
    }
  });
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/setup', function(req, res) {

  // create a sample user
  var nick = new Driver({ 
    name: 'Luki', 
    password: 'daria',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;
    console.log('Driver saved successfully: '+nick.name);
    res.json({ success: true });
  });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('somesecret'), function(err, decoded) {      
      if (err) {
        return res.status(403).send({
		success: false, message: 'Failed to authenticate token.' 
		});    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
		console.log(decoded);
        next();
      }
    });
  } else {
    // if there is no token return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
}); 


apiRoutes.delete('/delete/:user_id', function(req, res) {
        Driver.remove({
            _id: req.params.user_id
        }, function(err, _id) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });
		
	apiRoutes.put('/update/:user_id', function(req, res) {
            // update
			console.log(req.body.sex);
			console.log(req.params.user_id);
			sex = req.body.sex;
			name = req.body.name;
			id = req.params.user_id;
            Driver.findByIdAndUpdate(id, { $set: {sex: sex, name: name}},  function(err, user) {
                if (err) res.send(err);
                else res.json({ message: 'Sex updated!' });
console.log('updated.');
            });

        });


// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  Driver.find({}, function(err, users) {
    console.log(users.length);
	res.json(users);
  });
});   

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
};