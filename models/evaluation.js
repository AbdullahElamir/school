var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Evaluation = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  description: {type: String,default:"NULL"},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Evaluation.plugin(timestamps);
Evaluation.index({ name: 'text'});
exports.Evaluation = mongoose.model('Evaluation', Evaluation);