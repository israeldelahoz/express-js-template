var mongoose = module.parent.exports.mongoose
, Schema = mongoose.Schema;

function encrypt(value){
  return new Buffer(value).toString('base64');
}

var UserSchema = new Schema({
  email: {type: String },
  password : {type: String, setter: encrypt}
});

UserSchema.methods.isThisMyPassword = function (password) {
  console.log("________________________________________");
  console.log(this.password, password);
  console.log(this.password == password);
  return this.password == password;
};

exports.User = mongoose.model('User', UserSchema);