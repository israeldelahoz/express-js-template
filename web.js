//setup Dependencies//{{{
  require(__dirname + "/lib/setup");

  var connect = module.exports.connect  = require('connect')
  , express   = module.exports.express  = require('express')
  , helpers = module.exports.helpers = require('express-helpers')()
  , mongoose = module.exports.mongoose = require('mongoose')
  , sys       = require('sys')
  , passport = module.exports.passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , enviroment  = module.exports.enviroment = process.env.NODE_ENV || 'development'
  , Config =  module.exports.Config = require(__dirname + '/config/config.js').config
  , io = require('socket.io')
  , port      = Config.port;

  mongoose.connect(Config.db_path);
  //models
  var User = module.exports.User = require(__dirname + '/models/user.js').User
  
  require(__dirname + '/config/seeds.js')


  //Setup Express//{{{
    var app = express.createServer();

    //configure gobal helpers
    var dynamicHelpers =  module.exports.dynamicHelpers = require(__dirname + '/helpers/dynamic_helpers').dynamicHelpers
    require(__dirname + '/helpers/helpers')

    //configuring authentication
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

    passport.use(new LocalStrategy(
      // function(username, password, done) {
      //   console.log("on the function");
      //   User.findOne({email: username}, function(err, user) {
      //     done(null, user)
      //   })
      // }
      function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          // Find the user by username.  If there is no user with the given
          // username, or the password is not correct, set the user to `false` to
          // indicate failure and set a flash message.  Otherwise, return the
          // authenticated `user`.
          User.findOne({email: username}, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unkown user ' + username }); }
            if (!user.isThisMyPassword(password)) { return done(null, false, { message: 'Invalid password' }); }
            return done(null, user);
          })
        });
      }
    ));

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/login')
    }
    
    function ensureAdmin(req, res, next){
      ensureAuthenticated(req, res, function(){
        if(req.user.role == 'admin') return next();
        res.redirect('/')
      });
    }

    module.exports.ensureAuthenticated = ensureAuthenticated;
    module.exports.ensureAdmin = ensureAdmin;
    // end of authentication config

    app.configure(function(){
      app.set('views', __dirname + '/views');
      app.use(express.methodOverride());
      app.use(express.bodyParser());
      app.use(express.logger());
      app.use(express.cookieParser()); 
      app.use(express.session({ secret: 'secret word' }));
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(express.static(__dirname + '/static'));
      app.use(express.compiler({ src: __dirname + '/static', enable: ['less'] }));
      app.use("/", require(__dirname + "/controllers/main"));
      app.use("/", require(__dirname + "/controllers/users"));
      app.use(app.router);
      });//}}}
      
      app.configure('production', function(){
        app.use(express.errorHandler());
        process.on('uncaughtException', function(err) {
            console.log('An error has occurred');
            console.log(err);
          });
      });


      app.listen(port);
      
      //socket.io listen
      var io = io.listen(app);
      io.sockets.on('connection', function (socket) {
        console.log("socket connected");
      });

      console.log('Listening on http://0.0.0.0:' + port );