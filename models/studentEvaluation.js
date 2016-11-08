var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Stueva = new Schema({
  StuPro:{type: Schema.Types.ObjectId , ref: 'Stupro'},
  evaluation:{ type: Schema.Types.ObjectId , ref: 'Evaluation'},
  course :{type: Schema.Types.ObjectId , ref: 'Subject'},
  level: {type: Number},
  month: {type: Number},
  half: {type: Number},
  status: {type: Number, default:1}
});

Stueva.plugin(timestamps);
exports.Stueva = mongoose.model('Stueva', Stueva);