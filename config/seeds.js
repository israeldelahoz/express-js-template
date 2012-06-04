var mongoose = module.parent.exports.mongoose
,   User     = module.parent.exports.User
,   Config   = module.parent.exports.Config;

Config.default_admins.forEach(function(email){
  User.findOne({email: email}, function(error, user){
    if(user){
      user.approved = true;
      user.role = "admin";
      user.save();
    }
  });
});