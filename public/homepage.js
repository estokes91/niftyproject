var fs = require('fs');

var map = new google.maps.Map(document.getElementById('view_map'), {
    center: {lat:49.2827,lng:-123.1207},
    zoom:13
});

var searchBox = new google.maps.places.SearchBox(document.getElementById('searchField'));

google.maps.event.addListener(searchBox, 'places_changed', function(){
    var places = searchBox.getPlaces();

    var bounds = new google.maps.LatLngBounds();
    var i, place;

    for(i=0; place=places[i];i++){
        bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
    map.setZoom(15);
});
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

module.exports = {
  getJson
};