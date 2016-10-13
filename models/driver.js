var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Driver = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  phone1: {type: String,default:"NULL"},
  phone2: {type: String,default:""},
  nid: {type: String, default:"NULL"},
  address:{type: String,default:"NULL"},
  status: {type: Number, default:1}
});

Driver.plugin(timestamps);
Driver.index({ name: 'text'});
exports.Driver = mongoose.model('Driver', Driver);
