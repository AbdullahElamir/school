var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var ExamCommittee = new Schema({  
  clas: {type: Schema.Types.ObjectId , ref: 'Class'},
  exam: {type: Schema.Types.ObjectId , ref: 'Exam'},
  day: {type: String, default: ""},
  time: {type: String, default: ""},
  year: {type: Schema.Types.ObjectId , ref: 'Year'},
  committee: {type: Schema.Types.ObjectId , ref: 'Committee'},
  notes: {type: String, default: ""},
  students:{
    type: [{
      examCommitteeStudents:{type: Schema.Types.ObjectId , ref: 'Student'}
    }]
  },
  proctors:{
    type: [{
      examCommitteeProctors:{type: Schema.Types.ObjectId , ref: 'Teacher'}
    }]
  },
  status: {type: Number, default:1}
});

ExamCommittee.plugin(timestamps);
ExamCommittee.index({ name: 'text'});
exports.ExamCommittee = mongoose.model('ExamCommittee', ExamCommittee);