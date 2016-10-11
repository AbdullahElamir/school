var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var InOutcomeType = new Schema({
  name: { type: String, index: true, default: "Unknown"},
  description: { type: String, default: "NULL"},
  status: {type: Number, default:1}
});

InOutcomeType.plugin(timestamps);
InOutcomeType.index({ name: 'text'});
exports.InOutcomeType = mongoose.model('InOutcomeType', InOutcomeType);
