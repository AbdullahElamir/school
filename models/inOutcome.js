var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var InOutcome = new Schema({
  title: { type: String, index: true, default: "Unknown title"},
  inOutcomeType:{ type: Schema.Types.ObjectId , ref: 'InOutcomeType'},
  admin:{ type: Schema.Types.ObjectId , ref: 'Admin'},
  date:{type:Date},
  amount:{type:Number,default:0},
  type:{type:Number,default:1},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

InOutcome.plugin(timestamps);
InOutcome.index({ name: 'text'});
exports.InOutcome = mongoose.model('InOutcome', InOutcome);
