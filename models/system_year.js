var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var System_year = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  description: {type: String,default:"NULL"},
  status: {type: Number, default:1}
});

System_year.plugin(timestamps);
System_year.index({ name: 'text'});
exports.System_year = mongoose.model('System_year', System_year);