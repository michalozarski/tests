module.exports = function (app,express,Driver) {
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
var userRoutes = express.Router(); 

// route to show a random message (GET http://localhost:8080/api/)
userRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

userRoutes.get('/setup', function(req, res) {
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

// apply the routes to our application with the prefix /api
app.use('/api', userRoutes);
};