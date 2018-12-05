var fs = require('fs');

function getJson() {
    json_events = JSON.parse(fs.readFileSync('eventlist.json'));
    return json_events
}

module.exports = {
  getJson
};