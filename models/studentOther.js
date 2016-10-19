var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var StdOther = new Schema({
  student:{type: Schema.Types.ObjectId , ref: 'Student'},
  other:{ type: Schema.Types.ObjectId , ref: 'Other'},
  description: {type: String,default:"NULL"},
  place: {type: String,default:"NULL"},
  date: {type: String,default:""},
  status: {type: Number, default:1}
});

StdOther.plugin(timestamps);
exports.StdOther = mongoose.model('StdOther', StdOther);
