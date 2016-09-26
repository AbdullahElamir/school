var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Student = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  /*password: { type: String, required: true},*/
  salt: String,
  nid: {type: String, index: true},
  birth_day:{ type:Date, required: [true, 'birth date required']},
  birth_place:{ type:String, default:"NULL"},
  parent:[{ type: Schema.Types.ObjectId , ref: 'Parent'}],
  gender:{type: String,default:"NULL"},
  nationality:{type: String,default:"NULL"},
  address:{type: String,default:"NULL"},
  closestPoint:{type: String,default:"NULL"},
  closestPerson:{type: String,default:"NULL"},
  closestPersonPhone:{type: String,default:"NULL"},
  bloodType:{type: String,default:"NULL"},
  status: {type: Number, default:1}
});

Student.plugin(timestamps);
Student.index({ name: 'text'});
exports.Student = mongoose.model('Student', Student);
