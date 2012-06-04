var express = module.parent.exports.express
,   Main   = module.exports = express.createServer()
,   path    = require("path")
,   helpers = module.parent.exports.helpers
,   dynamicHelpers = module.parent.exports.dynamicHelpers
,   MainController;

var template_path = path.join(__dirname, "../views/main");
  
// Configuration//{{{
  Main.configure(function(){
    Main.helpers(helpers);
    Main.dynamicHelpers(dynamicHelpers);
    Main.set("views", template_path);
    Main.use(express.bodyParser());
    Main.use(express.methodOverride());
    Main.use(Main.router);
    Main.set("view options", {
      layout: "../layout.ejs"
    });
  });

  MainController = {
    homePage:function(req, res){
      res.render("homepage.ejs", {user: req.user});
    }
  }

  
  //routes
  Main.get("/", MainController.homePage);
