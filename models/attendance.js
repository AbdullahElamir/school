var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Attendance = new Schema({
  StuPro:{type: Schema.Types.ObjectId , ref: 'Stupro'},
  date:{ type: Date},
  attend: {type: Number,default:1},
  reason: {type: String,default:""},
  status: {type: Number, default:1}
});

Attendance.plugin(timestamps);
exports.Attendance = mongoose.model('Attendance', Attendance);
