var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var ParentMsg = new Schema({
  parent:{type: Schema.Types.ObjectId , ref: 'Parent'},
  msg:{type: Schema.Types.ObjectId , ref: 'Message'},
  seen:{type: Number, default:0},
  status: {type: Number, default:1}
});

ParentMsg.plugin(timestamps);
exports.ParentMsg = mongoose.model('ParentMsg', ParentMsg); 