const express = require('express');
const hbs = require('hbs');

var bodyParser = require('body-parser');
var fs = require('fs');
var users = require('./users.js');
var events = require('./events.js');

var app = express();

/**
urlencodedParser uses the bodyParser module to parse the form submission so it can be read as a json object  
*/
var urlencodedParser = bodyParser.urlencoded({ extended: false })

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/homepage', (request, response) => {
	response.render('homepage.hbs', {
	});
});

app.get('/signup', (request, response) => {
	response.render('signup.hbs', {
		title: 'Sign up for an account'
	})
});

app.get('/', (request, response) => {
	response.render('login.hbs', {
		title: 'Log into NetKong'
	})
});

app.get('/addevent', (request, response) => {
	response.render('add_event.hbs', {
		title: 'Add a new event'
	})
});

/** 
login checks to see that a username and password exist and match and then renders the homepage
*/
app.post('/', urlencodedParser, (request, response) => {
	if (users.loginCheck(request.body.userLogin, request.body.passLogin) == 1) {
		response.render('homepage.hbs', {
			title: 'Main page'
		})
	}else {
		response.render('loginfailed.hbs', {
			title:'Login failed page'
		});
	}
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

app.post('/addevent', urlencodedParser, (request, response) => {
	events.addEvent(request.body.eventName, request.body.eventDescription, request.body.eventLocation);
 				response.render('event_created.hbs', {
 					title: 'Congratulations'
 				});
 });

app.post("/eventList", (request, response) => {
	var list = JSON.parse(fs.readFileSync('eventlist.json'))
	response.send(list)
})

/** 
used for the fetch method that the map marker uses
*/
app.route({
  method: 'GET',
  path: '/{filename*}',
  handler: {
    directory: {
      path:    __dirname + '/public',
      listing: false,
      index:   false
    }
  }
});

app.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.view('homepage');
  }
});

app.listen(8080, () => {
	console.log('Server is up on port 8080');
});
