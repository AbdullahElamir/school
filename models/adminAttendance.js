var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var AdminAttendance = new Schema({
  admin:{ type: Schema.Types.ObjectId , ref: 'Admin'},
  date:{ type: Date},
  attend: {type: Number,default:1},
  reason: {type: String,default:""},
  status: {type: Number, default:1}
});

AdminAttendance.plugin(timestamps);
exports.AdminAttendance = mongoose.model('AdminAttendance', AdminAttendance);
