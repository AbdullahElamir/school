var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var transferProcessStudents = new Schema({
  student:{ type: Schema.Types.ObjectId , ref: 'Student'},
  amount: {type: Number,default:0},
  transferProcess : { type: Schema.Types.ObjectId , ref: 'TransferProcess'},
  status: {type: Number, default:1}
});

transferProcessStudents.plugin(timestamps);
transferProcessStudents.index({ name: 'text'});
exports.transferProcessStudents = mongoose.model('transferProcessStudents', transferProcessStudents);
