
module.exports.dynamicHelpers = {
  current_user: function(req, res){
    return req.user;
  },
  isAuthenticated: function (req, res){
    return req.isAuthenticated();
  },
  isAdmin: function (req, res){
    if(req.isAuthenticated() && req.user.role == "admin") return true;
    return false;
  }
}