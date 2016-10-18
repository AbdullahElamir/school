var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Vaccination = new Schema({
  name: { type: String, index: true, default: "Unknown name"},
  description: { type: String,  default: "NULL "},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Vaccination.plugin(timestamps);
Vaccination.index({ name: 'text'});
exports.Vaccination = mongoose.model('Vaccination', Vaccination);
