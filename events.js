var fs = require('fs');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdaptor: 'https',
  apiKey: 'AIzaSyCOFECor-rqHgnIMhfl7ss_dXCY8V3Mtn0',
  formatter: null
};

var loadEventsFile = () => {
	try {
		return JSON.parse(fs.readFileSync('eventlist.json'));
	}
	catch (exception) {
		if(exception.code === 'ENOENT') {
			fs.writeFileSync('eventlist.json', '{}');
			return JSON.parse(fs.readFileSync('eventlist.json'));
		}
	}
};

var writeEventsFile = (eventsArr) => {
	fs.writeFileSync('eventlist.json', JSON.stringify(eventsArr));
};

var findLocation = (user_location) => {
	var geocoder = NodeGeocoder(options);
	return new Promise((resolve, reject) => {
		geocoder.geocode(user_location, function(err, res) {
		resolve([res[0].latitude, res[0].longitude])
		});
	})
};

var addEvent = async (event_name, description, location) => {
	var coord = await findLocation(location);
	var event_lat = coord[0];
	var event_lng = coord[1];
	var attending = [];
	var eventsArr = loadEventsFile();
	eventsArr[event_name] = {
		description: description,
		lat: event_lat,
		lng: event_lng,
		attending: attending
	}
	writeEventsFile(eventsArr);
};

var placeMarkers = () => {
	json_file.push(JSON.parse(fs.readFileSync('eventlist.json')));

	for (var i = 0; i < json_file.length; i++) {

	    // Current object
	    var unique_event = json_file[i];

	    // Adding a new marker for the object
	    var marker = new google.maps.Marker({
	        position: new google.maps.LatLng(unique_event.lat, unique_event.lng),
	        map: map,
	        title: unique_event.event_name
	    })
	};
};

module.exports = {
  loadEventsFile,
  writeEventsFile, 
  findLocation,
  addEvent,
  placeMarkers
};