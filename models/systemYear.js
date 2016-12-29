
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var SystemYear = new Schema({
  system:{ type: Schema.Types.ObjectId , ref: 'System'},
  year:{ type: Schema.Types.ObjectId , ref: 'Year'},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

SystemYear.plugin(timestamps);
exports.SystemYear = mongoose.model('SystemYear', SystemYear);