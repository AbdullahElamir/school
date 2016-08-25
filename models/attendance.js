var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Attendance = new Schema({
  SysPro:{type: Schema.Types.ObjectId , ref: 'SysPro'},
  date:{ type: String, default: "null"},
  attend: {type: Number,default:1},
  status: {type: Number, default:1}
});

Attendance.plugin(timestamps);
exports.Attendance = mongoose.model('Attendance', Attendance);