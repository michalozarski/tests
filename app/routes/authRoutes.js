module.exports = function (app,express,jwt,Driver,aToken) {
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
var authRoutes = express.Router(); 

authRoutes.post('/authenticate', function(req, res) {
	console.log(req.body);
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
          expiresIn: '1h' // expires in 1 hour
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

// route middleware to verify a token
authRoutes.use(function(req, res, next) {

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

// apply the routes to our application with the prefix /api
app.use('/api', authRoutes);
};