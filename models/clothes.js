var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Clothes = new Schema({
  name: { type: String, index: true, default: "Unknown"},
  status: {type: Number, default:1}
});

Clothes.plugin(timestamps);
Clothes.index({ name: 'text'});
exports.Clothes = mongoose.model('Clothes', Clothes);