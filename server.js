const express = require('express');
const hbs = require('hbs');

var app = express();

var dpub = __dirname + '/public/'

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	response.render(dpub + 'index.hbs', {

	})
});

app.listen(8080, () => {
	console.log('Server is up on port 8080');
});

