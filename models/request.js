var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Request = new Schema({
  student:{ type: Schema.Types.ObjectId , ref: 'Student'},
  parent:{ type: Schema.Types.ObjectId , ref: 'Parent'},
  clothes:{ type: Schema.Types.ObjectId , ref: 'Clothes'},
  size: {type: Number},
  quantity: {type: Number},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Request.plugin(timestamps);
exports.Request = mongoose.model('Request', Request);