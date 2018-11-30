var fs = require('fs');

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
	//user request function
	user_location.split(' ').join('+');
	location_details = <script src=https://maps.googleapis.com/maps/api/geocode/json?address=${user_location}&key=AIzaSyCOFECor-rqHgnIMhfl7ss_dXCY8V3Mtn0></script>;
};

var addEvent = (event_name, description, location) => {
	var event_lat = null;
	var event_lng = null;
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

module.exports = {
  loadEventsFile,
  writeEventsFile,
  addEvent
};