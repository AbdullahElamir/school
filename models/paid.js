var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Paid = new Schema({
  fees:{type: Schema.Types.ObjectId , ref: 'Fees'},
  // id_fees:{type: Schema.Types.ObjectId , ref: 'Fees'},
  StuPro:{type: Schema.Types.ObjectId , ref: 'StuPro'},
  paidUp:{type:Number},
  // residual:{type:Number},
  // date:{ type: String, default: "null"},
  receip_num:{type: String, default: "null"},
  status: {type: Number, default:1}
});

Paid.plugin(timestamps);
exports.Paid = mongoose.model('Paid', Paid);
