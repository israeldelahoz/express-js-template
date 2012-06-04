var express = module.parent.exports.express
,   Users   = module.exports = express.createServer()
,   path    = require("path")
,   helpers = module.parent.exports.helpers
,   dynamicHelpers = module.parent.exports.dynamicHelpers
,   mongoose = module.parent.exports.mongoose
,   User   = module.parent.exports.User
,   passport = module.parent.exports.passport
,   ensureAuthenticated = module.parent.exports.ensureAuthenticated
,   ensureAdmin = module.parent.exports.ensureAdmin
,   UsersController;

var template_path = path.join(__dirname, "../views/users");

// Configuration//{{{
  Users.configure(function(){
    Users.helpers(helpers);
    Users.dynamicHelpers(dynamicHelpers);
    Users.set("views", template_path);
    Users.use(express.bodyParser());
    Users.use(express.methodOverride());
    Users.use(Users.router);
    Users.set("view options", {
      layout: "../layout.ejs"
    });
    Users.dynamicHelpers({ });
  });

  UsersController = {
    sign_in: function(req, res){
      res.render("login.ejs");
    },

    login: function(req, res){
      res.redirect('/');
    },
    
    register_form: function(req, res){
      res.render("register.ejs");
    },

    register: function(req, res){
      user = new User({
        email: req.param("email"),
        password: req.param("password")
      });
      
      user.save(function(err){
        if(!err){
          res.redirect('/login');
        }else{
          res.render("register.ejs");
          console.log(err);
        }
      });
    },

    logout: function (req, res){
      req.logOut();
      res.redirect('/');
    },
  }

  Users.get("/login",  UsersController.sign_in);
  Users.post("/login", passport.authenticate('local'), UsersController.login);
  Users.get("/failedAutentication",  UsersController.failedAutentication);
  Users.get("/register",  UsersController.register_form);
  Users.post("/register", UsersController.register);
  Users.get("/logout", UsersController.logout);
  