var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Class = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  description: {type: String,default:"NULL"},
  type: {type: Number,default:1},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  prevClass:{type: Schema.Types.ObjectId , ref: 'Class'},
  status: {type: Number, default:1}
});

Class.plugin(timestamps);
Class.index({ name: 'text'});
exports.Class = mongoose.model('Class', Class);
