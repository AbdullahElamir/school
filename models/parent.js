var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Parent = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  password: { type: String, required: true},
  salt: String,
  email: { type: String, required : true},
  phone: {type: String,default:"NULL"},
  nid: {type: String, index: true},
  birth_day:{ type:Date, required: [true, 'start date required']},
  /*last_login:{ type:Date, required: [true, 'start date required']},*/
  gender:{type: String,default:"NULL"},
  nationality:{type: String,default:"NULL"},
  address:{type: String,default:"NULL"},
  level:{type:Number,default:3},
  status: {type: Number, default:1}
});

Parent.plugin(timestamps);
Parent.index({ name: 'text'});
exports.Parent = mongoose.model('Parent', Parent);