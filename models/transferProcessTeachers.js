var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var transferProcessTeachers = new Schema({
  teacher:{ type: Schema.Types.ObjectId , ref: 'Teacher'},
  amount: {type: Number,default:0},
  transferProcess : { type: Schema.Types.ObjectId , ref: 'TransferProcess'},
  status: {type: Number, default:1}
});

transferProcessTeachers.plugin(timestamps);
transferProcessTeachers.index({ name: 'text'});
exports.transferProcessTeachers = mongoose.model('transferProcessTeachers', transferProcessTeachers);
