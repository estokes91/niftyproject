var fs = require('fs');

/** 
Loads the file, creates a file if no file exists
*/
var loadFile = () => {
    try {
        return JSON.parse(fs.readFileSync('accounts.json'));
    } catch (exception) {
        if (exception.code === 'ENOENT') {
            fs.writeFileSync('accounts.json', '{}');
            return JSON.parse(fs.readFileSync('accounts.json'));
        }
    }
};

/** 
Writes to the file and stringifys it
*/
var writeFile = (usersArr) => {
    fs.writeFileSync('accounts.json', JSON.stringify(usersArr));
};

/** 
Adds a user and calls the writeFile function to write it to a database file
*/
var addUser = (username, password, name) => {
    event_list = []
    var usersArr = loadFile();
    usersArr[username] = {
        name: name,
        pass: password,
        online: false,
        event: event_list
    }
    writeFile(usersArr);
};

/** 
Checks that the username exists in the database file and then checks that the passwords match. returns a 1 for pass and 0 for fail
*/
var loginCheck = (username, password) => {
        var usersArr = loadFile();
        if (username in usersArr) {
            if (password == usersArr[username].pass) {
                for (var key in usersArr){
                    if (usersArr.hasOwnProperty(key)){
                        usersArr[key].online = false;
                    }
                }
                usersArr[username].online = true;
                writeFile(usersArr);
                return 1
            } else {
                return 0
            }
        } else {
            return 0
        };
};

module.exports = {
            loadFile,
            writeFile,
            addUser,
            loginCheck
};