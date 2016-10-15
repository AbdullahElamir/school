var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Task = new Schema({
  name: { type: String, index: true, default: "Unknown name"},
  content: { type: String,  default: "NULL "},
  classRoom:{ type: Schema.Types.ObjectId , ref: 'ClassRoom'},
  subject:{ type: Schema.Types.ObjectId , ref: 'Subject'},
  teacher:{ type: Schema.Types.ObjectId , ref: 'Teacher'},
  date:{type:Date},
  status: {type: Number, default:1}
});

Task.plugin(timestamps);
Task.index({ name: 'text'});
exports.Task = mongoose.model('Task', Task);
