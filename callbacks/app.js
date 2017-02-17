const request = require('request');

request ({
	url: 'https://maps.google.com/maps/api/geocode/json?address=swieta%20katarzyna%20dolnoslaskie',
	json: true
}, (error, response, body) => {
	console.log(JSON.stringify(body.results[0].geometry.location.lat, undefined, 2));
	console.log(JSON.stringify(body.results[0].geometry.location.lng, undefined, 2));
});