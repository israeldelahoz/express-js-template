var helpers = module.parent.exports.helpers
,   _ = require('underscore')._
, dateFormat = require('dateformat')
, Config = module.parent.exports.Config;

_.extend(helpers,{
  "_": _,
  "dateFormat": dateFormat,
  "Config": Config
} );