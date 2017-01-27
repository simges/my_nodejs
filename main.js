var fs = require('fs');
var Server = require('./server');

var Server = new Server(8082);
Server.addListeners();

/*
 * Create entities

var firstUser = new database.UserInfo({
    name : 'Simge',
    surname : 'Sonmez',
    mail : 'simgesonmez90@gmail.com',
    age : 26
});


setTimeout(function() {
    database.addEntity(database.UserInfo, firstUser);
},1000);

setTimeout(function() {
    database.listEntities(database.UserInfo);
},5500);

setTimeout(function() {
    database.closeConnection();
},7000);
 */
setTimeout(function() {
    Server.getConnections();
},10000);
