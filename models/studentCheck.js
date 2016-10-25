var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var StdCheck = new Schema({
  student:{type: Schema.Types.ObjectId , ref: 'Student'},
  check:{ type: Schema.Types.ObjectId , ref: 'Check'},
  description: {type: String,default:"NULL"},
  place: {type: String,default:"NULL"},
  date: {type: String,default:""},
  status: {type: Number, default:1}
});

StdCheck.plugin(timestamps);
exports.StdCheck = mongoose.model('StdCheck', StdCheck);
