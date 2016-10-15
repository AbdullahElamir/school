var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Teacher = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  password: { type: String, required: true},
  salt: String,
  email: { type: String, unique : true, required : true},
  phone: {type: String,default:"NULL"},
  phone2: {type: String,default:"NULL"},
  personalId: {type: String},
  nid: {type: String, index: true},
  qualification: {type: String, default:"NULL"},
  qualificationDate: {type: String, default:"NULL"},
  specialization: {type: String, default:"NULL"},
  birth_day:{ type:Date, required: [true, 'start date required']},
  startDate:{ type:String , default:"NULL"},
  /*last_login:{ type:Date, required: [true, 'start date required']},*/
  gender:{type: String,default:"NULL"},
  nationality:{type: String,default:"NULL"},
  address:{type: String,default:"NULL"},
  closestPoint:{type: String,default:"NULL"},
  level:{type:Number, default:2},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Teacher.plugin(timestamps);
Teacher.index({ name: 'text'});
exports.Teacher = mongoose.model('Teacher', Teacher);
