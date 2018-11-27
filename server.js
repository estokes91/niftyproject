const express = require('express');
const hbs = require('hbs');

var bodyParser = require('body-parser');
var fs = require('fs');
var users = require('./users.js')

var app = express();
var dpub = __dirname + '/public/'

/**
urlencodedParser uses the bodyParser module to parse the form submission so it can be read as a json object  
*/
var urlencodedParser = bodyParser.urlencoded({ extended: false })

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	response.render(dpub + 'index.hbs', {

	})
});

app.get('/signup', (request, response) => {
	response.render(dpub + 'signup.hbs', {
		title: 'Sign up for an account'
	})
});

/** 
Receives the request from /signup form post submission, and uses urlencdodedParser variable to pass the details into the addUser function
*/
app.post('/signup', urlencodedParser, (request, response) => {
	users.addUser(request.body.userLogin, request.body.passLogin, request.body.userName);
 				response.render('congratulations.hbs', {
 					title: 'Congratulations'
 				});

});


app.listen(8080, () => {
	console.log('Server is up on port 8080');
});
