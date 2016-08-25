var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var SysPro = new Schema({
  system:{ type: Schema.Types.ObjectId , ref: 'System'},
  student:{ type: Schema.Types.ObjectId , ref: 'Student'},
  year:{ type: Schema.Types.ObjectId , ref: 'Year'},
  classRoom:{ type: Schema.Types.ObjectId , ref: 'ClassRoom'},
  description: {type: String,default:"NULL"},
  status: {type: Number, default:1}
});

SysPro.plugin(timestamps);
exports.SysPro = mongoose.model('SysPro', SysPro);