var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Message = new Schema({
  name: { type: String, index: true, default: "Unknown msg"},
  msg: { type: String,  default: "NULL "},
  description: {type: String,default:"NULL"},
  status: {type: Number, default:1}
});

Message.plugin(timestamps);
Message.index({ name: 'text'});
exports.Message = mongoose.model('Message', Message);