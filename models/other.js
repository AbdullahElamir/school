var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Other = new Schema({
  name: { type: String, index: true, default: "Unknown name"},
  description: { type: String,  default: "NULL "},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Other.plugin(timestamps);
Other.index({ name: 'text'});
exports.Other = mongoose.model('Other', Other);
