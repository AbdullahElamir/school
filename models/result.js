var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Result = new Schema({
  StuPro:{type: Schema.Types.ObjectId , ref: 'StuPro'},
  exam:{type: Schema.Types.ObjectId , ref: 'Exam'},
  subject:{ type: Schema.Types.ObjectId , ref: 'Subject'},
  mark:{type:Number,default:0},
  status: {type: Number, default:1}
});

Result.plugin(timestamps);
exports.Result = mongoose.model('Result', Result);