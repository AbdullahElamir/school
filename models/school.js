var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var School = new Schema({
  name: { type: String, index: true, required: true},
  address: {type: String,default:"NULL"},
  phone: {type: String,default:"NULL"},
  des: {type: String, default:"NULL"},
  status: {type: Number, default:1}
});

School.plugin(timestamps);
School.index({ name: 'text'});
exports.School = mongoose.model('School', School);
