var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Result = new Schema({
  SysPro:{type: Schema.Types.ObjectId , ref: 'SysPro'},
  exam:{type: Schema.Types.ObjectId , ref: 'Exam'},
  subject:{ type: Schema.Types.ObjectId , ref: 'Subject'},
  status: {type: Number, default:1}
});

Result.plugin(timestamps);
exports.Result = mongoose.model('Result', Result);