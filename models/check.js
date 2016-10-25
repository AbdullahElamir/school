var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Check = new Schema({
  name: { type: String, index: true, default: "Unknown name"},
  description: { type: String,  default: "NULL "},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Check.plugin(timestamps);
Check.index({ name: 'text'});
exports.Check = mongoose.model('Check', Check);
