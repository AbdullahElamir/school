var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var StdVaccination = new Schema({
  student:{type: Schema.Types.ObjectId , ref: 'Student'},
  vaccination:{ type: Schema.Types.ObjectId , ref: 'Vaccination'},
  description: {type: String,default:"NULL"},
  place: {type: String,default:"NULL"},
  date: {type: String,default:""},
  status: {type: Number, default:1}
});

StdVaccination.plugin(timestamps);
exports.StdVaccination = mongoose.model('StdVaccination', StdVaccination);
