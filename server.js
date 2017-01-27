var http = require("http");
var net = require("net");
var url = require('url');
var queryString = require('querystring');
var filesystem = require("fs");

var that;

function Server(port) {
    var db = require('./database').Database;
    this.database = new db();
    that = this;
    this.server = http.createServer(requestListenerCallback);
    this.server.listen(port);
    console.log("Server is listening");
};
    
Server.prototype.addListeners = function () {    
    this.server.on("connection", function (socket) {
        console.log("client connected!" + socket.address().address);
    });
    
    this.server.on("close", function (socket) {
        console.log("connection closed!" + socket.address().address);
    });
};

Server.prototype.getConnections = function () {
    this.server.getConnections(function (err, count) {
        if (err) {
            console.log("error when getting count of connections");
        } else {
            console.log("current connection count: " + count);
        }
    })
};

var requestListenerCallback = function(request, response) {
    
    if (url.parse(request.url, true).path !== null) {
        var path = url.parse(request.url,true).path;
        var query = path.substring(path.indexOf("?")+1);
        var firstname = queryString.parse(query)["FirstName"];
        var lastname = queryString.parse(query)["LastName"];
        var user = new that.database.UserInfo({
            name : firstname,
            surname : lastname,
            mail : "",
            age : 0
        });
        that.database.addEntity(that.database.UserInfo, user);
        setTimeout(function() {
            that.database.listEntities(that.database.UserInfo);
        },1000);
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    if ("./index.html" !== undefined) {
        filesystem.readFile("./index.html" , function(err, data) {
            if (err) {
                console.error(err);
                throw err;
            } else {
                response.write(data);
                response.end();
            }
        });
    }
    else {
        response.write("<!DOCTYPE 'html'>");
        response.write("<html>");
        response.write("<head>");
        response.write("<title>Hello World Page</title>");
        response.write("</head>");
        response.write("<body>");
        response.write("Hello World!");
        response.write("</body>");
        response.write("</html>");
        response.end();
    }
};

module.exports = Server;