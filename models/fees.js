var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Fees = new Schema({
  id_class:{type: Schema.Types.ObjectId , ref: 'Class'},
  amount:{type:Number},
  status: {type: Number, default:1}
});

Fees.plugin(timestamps);
Fees.index({ name: 'text'});
exports.Fees = mongoose.model('Fees', Fees); 