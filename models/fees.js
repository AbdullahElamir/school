var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Fees = new Schema({
  year:{ type: Schema.Types.ObjectId , ref: 'Year'},
  id_class:{type: Schema.Types.ObjectId , ref: 'Class'},
  amount:{type:Number},
  name:{type: String, default:""},
  feesDate:{type:String, default:""},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Fees.plugin(timestamps);
Fees.index({ name: 'text'});
exports.Fees = mongoose.model('Fees', Fees);
