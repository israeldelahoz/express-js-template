//this file will read the configuration options set on the config.json file

var fs = require('fs')
, _ = require("underscore")._
, enviroment = module.parent.exports.enviroment;

var configString = fs.readFileSync(__dirname + '/config.json', 'utf8');
var configs = JSON.parse(configString);

var config = _.extend(configs["default"], configs[enviroment]);
if(enviroment != "development"){
  config.db_path = process.env.MONGOHQ_URL;
  config.port = process.env.PORT;
}

module.exports.config = config