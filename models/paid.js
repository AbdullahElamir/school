var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Paid = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  id_fees:{type: Schema.Types.ObjectId , ref: 'Fees'},
  StuPro:{type: Schema.Types.ObjectId , ref: 'StuPro'},
  paidUp:{type:Number},
  description: {type: String,default:"NULL"},
  residual:{type:Number},
  date:{ type: String, default: "null"},
  receip_num:{type: String, default: "null"},
  status: {type: Number, default:1}
});

Paid.plugin(timestamps);
exports.Paid = mongoose.model('Paid', Paid); 