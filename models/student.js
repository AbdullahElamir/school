var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Student = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  /*password: { type: String, required: true},*/
  salt: String,
  email: { type: String, unique : true, required : true},
  phone: {type: String,default:"NULL"},
  nid: {type: String, index: true},
  birth_day:{ type:Date, required: [true, 'start date required']},
  parent:[{ type: Schema.Types.ObjectId , ref: 'Parent'},],
 /* lastLogin:{ type:Date, required: [true, 'start date required']},
  dateJoun:{ type:Date, required: [true, 'start date required']},*/
  gender:{type: String,default:"NULL"},
  nationality:{type: String,default:"NULL"},
  address:{type: String,default:"NULL"},
 /* startDate:{ type:Date, required: [true, 'start date required']},*/
  bloodType:{type: String,default:"NULL"},
  status: {type: Number, default:1}
});

Student.plugin(timestamps);
Student.index({ name: 'text'});
exports.Student = mongoose.model('Student', Student);