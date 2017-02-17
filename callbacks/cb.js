var getUser = (id, callbacka) => {
	var user = {
		id: id,
		name: 'Michal'
	}
	callbacka(user);
};

getUser (31, (user) => {
	console.log(user);
});