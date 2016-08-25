var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var TSC = new Schema({
  year:{ type: Schema.Types.ObjectId , ref: 'Year'},
  classRoom:{ type: Schema.Types.ObjectId , ref: 'ClassRoom'},
  teacher:{ type: Schema.Types.ObjectId , ref: 'Teacher'},
  subject:{ type: Schema.Types.ObjectId , ref: 'Subject'},
  system:{ type: Schema.Types.ObjectId , ref: 'System'},
  SysPro:{type: Schema.Types.ObjectId , ref: 'SysPro'},
  status: {type: Number, default:1}
});

TSC.plugin(timestamps);
exports.TSC = mongoose.model('TSC', TSC);