var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Bus = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  size: {type: Number,default:0},
  color: {type: String,default:"NULL"},
  plateNumber: {type: String, default:"NULL"},
  status: {type: Number, default:1}
});

Bus.plugin(timestamps);
Bus.index({ name: 'text'});
exports.Bus = mongoose.model('Bus', Bus);
