const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'\\views\\partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'\\public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	console.log(`${now}: ${req.method} ${req.url}`);
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs', {
		pageTitle: 'Maintanace'
	})
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

hbs.registerHelper('currentYear', (text) => {
	return new Date().getFullYear()
});

app.use(express.static(__dirname + '\\public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		indexTitle: 'Home Page',
		userName: 'Michal',
	});
	});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
	});

app.get('/*', (req, res) => {
	res.send({
		name: 'Michal',
		likes: [
		'Bikes',
		'Travel'
		]
	});
});

app.listen(port, () => {
	console.log(`Server is up! Port: ${port}`);
});
