var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var Student = new Schema({
  name: { type: String, default: "Unknown user"},
  motherName: { type: String, default:"NULL"},
  nid: {type: String},
  birth_day:{ type:Date, required: [true, 'birth date required']},
  startDate:{ type:Date, required: [true, 'start date required']},
  finishDate:{ type:Date },
  stdEmail: { type: String,default:""},
  password: { type: String,default:""},
  birth_place:{ type:String, default:"NULL"},
  parent:[{ type: Schema.Types.ObjectId , ref: 'Parent'}],
  gender:{type: String,default:"NULL"},
  nationality:{type: Number},
  address:{type: String,default:"NULL"},
  closestPoint:{type: String,default:"NULL"},
  closestPerson:{type: String,default:"NULL"},
  closestPersonPhone:{type: String,default:"NULL"},
  bloodType:{type: String,default:"NULL"},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  clas:{type: Schema.Types.ObjectId , ref: 'Class'},
  status: {type: Number, default:1},
  active: {type: Number, default:1},
  studentid:{ type: Number,default:1},
  studentrealid:{ type: Number},
});

Student.plugin(autoIncrement.plugin, {
    model: 'Student',
    field: 'studentid',
    startAt: 2,
    incrementBy: 1
});


Student.plugin(timestamps);
Student.index({ name: 'text'});
exports.Student = mongoose.model('Student', Student);
