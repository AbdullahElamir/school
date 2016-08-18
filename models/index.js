var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
// var autoIncrement = require('mongoose-auto-increment');


var config = require('../config'); // get our config file
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: config.user,
  pass: config.password
};
var connection=mongoose.connect(config.url, options);
// autoIncrement.initialize(connection);
var model = {};
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    model = _.extend(model, require(path.join(__dirname, file)));                      
  });

module.exports = model;