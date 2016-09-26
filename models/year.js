var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Year = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  system:{ type: Schema.Types.ObjectId , ref: 'System'},
  active: {type: Number, default:0},
  status: {type: Number, default:1}
});

Year.plugin(timestamps);
Year.index({ name: 'text'});
exports.Year = mongoose.model('Year', Year);
