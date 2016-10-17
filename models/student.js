var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Student = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  motherName: { type: String, default:"NULL"},
  nid: {type: String, index: true},
  birth_day:{ type:Date, required: [true, 'birth date required']},
  startDate:{ type:Date, required: [true, 'start date required']},
  finishDate:{ type:Date },
  email: { type: String,default:""},
  password: { type: String,default:""},
  birth_place:{ type:String, default:"NULL"},
  parent:[{ type: Schema.Types.ObjectId , ref: 'Parent'}],
  gender:{type: String,default:"NULL"},
  nationality:{type: String,default:"NULL"},
  address:{type: String,default:"NULL"},
  closestPoint:{type: String,default:"NULL"},
  closestPerson:{type: String,default:"NULL"},
  closestPersonPhone:{type: String,default:"NULL"},
  bloodType:{type: String,default:"NULL"},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1},
  active: {type: Number, default:1}
});

Student.plugin(timestamps);
Student.index({ name: 'text'});
exports.Student = mongoose.model('Student', Student);
