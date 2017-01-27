var mongoose = require("mongoose");
mongoose.set('debug', true);

function Database() {        
    mongoose.connect('mongodb://localhost:27017/my_database');
    //connect to DB
    this.connection = mongoose.connection;
    this.connection.on('error', function() {
        console.log("an error occured");
    });
    this.connection.on('open', function() {
        console.log("database connected");
    });
    this.connection.on('close', function() {
        console.log("database disconnected");
    });
};


/* Step-1
* Create a schema
*/
Database.prototype.userSchema = new mongoose.Schema({
    name : String,
    surname : String,
    mail : String,
    age : Number
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
Database.prototype.userSchema.methods.logg = function () {
    console.log("logs added");
};
/* Step-2
* Compile Schema into Model
*/

Database.prototype.UserInfo = mongoose.model("UserInfo", Database.prototype.userSchema);

/* Step-4
 * Save entities
 */
Database.prototype.addEntity = function (Model, Entity) {
    Model.find({name : Entity.name, surname : Entity.surname}, 
                function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log("docs.length : " + docs.length);
            if (docs.length == 0) {
                Entity.save(function (err, Entity) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(Entity.name);
                    }
                });
                console.log(err);
            } else {
                console.log("Entity is already added.");
            }            
        }
    });
};

//list entities
Database.prototype.listEntities = function (Model) {
    Model.find(function (err, entities) {
        if (err) {
            console.log(err);
        } else {
            console.log(entities);
        }
    });
};

Database.prototype.closeConnection = function () {
    this.connection.dropDatabase(function (err) {
        if (err) {
            console.log("err");
        } else {
            console.log("database connection closed!");
        }
    });
};

module.exports.Database = Database;