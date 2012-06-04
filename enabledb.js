var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/express-template");

var Schema = mongoose.Schema;


UserSchema = new Schema({
  email: String,
  password : String
});


User = mongoose.model('User', UserSchema);

this.exports = { user: User}

/*
  var db = require("./enabledb").exports
  Source = db.source
*/ 