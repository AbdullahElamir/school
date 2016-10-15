var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var TeacherAttendance = new Schema({
  teacher:{ type: Schema.Types.ObjectId , ref: 'Teacher'},
  date:{ type: Date},
  attend: {type: Number,default:1},
  reason: {type: String,default:""},
  status: {type: Number, default:1}
});

TeacherAttendance.plugin(timestamps);
exports.TeacherAttendance = mongoose.model('TeacherAttendance', TeacherAttendance);
