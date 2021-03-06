var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Exam = new Schema({
  name: { type: String, index: true, default: "Unknown"},
  system:{ type: Schema.Types.ObjectId , ref: 'System'},
  clas:{ type: Schema.Types.ObjectId , ref: 'Class'},
  semester: {type: Number},
  type: {type: Number},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Exam.plugin(timestamps);
Exam.index({ name: 'text'});
exports.Exam = mongoose.model('Exam', Exam);