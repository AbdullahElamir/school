var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var MarksSub = new Schema({
  exam:{ type: Schema.Types.ObjectId , ref: 'Exam'},
  subject:{ type: Schema.Types.ObjectId , ref: 'Subject'},
  system:{ type: Schema.Types.ObjectId , ref: 'System'},
  mark: {type: Number , required:true},
  status: {type: Number, default:1}
});

MarksSub.plugin(timestamps);
exports.MarksSub = mongoose.model('MarksSub', MarksSub);