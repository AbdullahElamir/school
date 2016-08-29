var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var MarksSub = new Schema({
  exam:{ type: Schema.Types.ObjectId , ref: 'Exam'},
  subject:{ type: Schema.Types.ObjectId , ref: 'Subject'},
  mark: {type: Number},
  status: {type: Number, default:1}
});

MarksSub.plugin(timestamps);
exports.MarksSub = mongoose.model('MarksSub', MarksSub);