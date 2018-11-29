var fs = require('fs');

var loadFile = () => {
	try {
		return JSON.parse(fs.readFileSync('accounts.json'));
	}
	catch (exception) {
		if(exception.code === 'ENOENT') {
			fs.writeFileSync('accounts.json', '{}');
			return JSON.parse(fs.readFileSync('accounts.json'));
		}
	}
};

var writeFile = (usersArr) => {
	fs.writeFileSync('accounts.json', JSON.stringify(usersArr));
};


var addUser = (username, password, name) => {
	event_list = []
	var usersArr = loadFile();
	usersArr[username] = {
		name: name,
		pass: password,
		event: event_list
	}
	writeFile(usersArr);
};

module.exports = {
  loadFile,
  writeFile,
  addUser
};