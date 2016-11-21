var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Parent = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  password: { type: String, required: true},
  salt: String,
  email: { type: String, required : true},
  phone: {type: String,default:"NULL"},
  phone2: {type: String,default:"NULL"},
  /*last_login:{ type:Date, required: [true, 'start date required']},*/
  gender:{type: String,default:"NULL"},
  nationality:{type: Number},
  job:{type: String,default:"NULL"},
  workPlace:{type: String,default:"NULL"},
  level:{type:Number,default:9},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Parent.plugin(timestamps);
Parent.index({ name: 'text'});
exports.Parent = mongoose.model('Parent', Parent);
