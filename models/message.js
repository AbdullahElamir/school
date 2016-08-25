var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Message = new Schema({
  msg: { type: String,  default: "Unknown "},
  description: {type: String,default:"NULL"},
  status: {type: Number, default:1}
});

Message.plugin(timestamps);
exports.Message = mongoose.model('Message', Message);