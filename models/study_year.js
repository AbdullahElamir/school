var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Study = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  description: {type: String,default:"NULL"},
  status: {type: Number, default:1}
});

Study.plugin(timestamps);
Study.index({ name: 'text'});
exports.Study = mongoose.model('Study', Study);