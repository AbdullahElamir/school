var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var TransferProcess = new Schema({
  year: { type: Schema.Types.ObjectId , ref: 'Year'},
  driver: { type: Schema.Types.ObjectId , ref: 'Driver'},
  path: { type: String, index: true, default: "NULL"},
  bus: { type: Schema.Types.ObjectId , ref: 'Bus'},
  supervisor: { type: Schema.Types.ObjectId , ref: 'Teacher'},
  fare: {type: Number,default:0},
  notes: {type: String,default:""},
  status: {type: Number, default:1}
});

TransferProcess.plugin(timestamps);
TransferProcess.index({ name: 'text'});
exports.TransferProcess = mongoose.model('TransferProcess', TransferProcess);
