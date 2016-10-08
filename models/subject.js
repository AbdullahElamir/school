var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Subject = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  description: {type: String,default:"NULL"},
  clas:{ type: Schema.Types.ObjectId , ref: 'Class'},
  status: {type: Number, default:1}
});

Subject.plugin(timestamps);
Subject.index({ name: 'text'});
exports.Subject = mongoose.model('Subject', Subject);
