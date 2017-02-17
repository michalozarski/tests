module.exports = function (app,express,jwt,Driver,aToken) {
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
driverRoutes = express.Router();

driverRoutes.delete('/delete/:user_id', function(req, res) {
        Driver.remove({
            _id: req.params.user_id
        }, function(err, _id) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });
		
driverRoutes.put('/update/:user_id', function(req, res) {
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
driverRoutes.get('/users', function(req, res) {
  Driver.find({}, function(err, users) {
    console.log(users.length);
	res.json(users);
  });
});   

// apply the routes to our application with the prefix /api
app.use('/api', driverRoutes);

//expressListRoutes({ prefix: '/api' }, 'API:', driverRoutes );

};