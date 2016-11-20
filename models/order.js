var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Order = new Schema({
  student:{type: Schema.Types.ObjectId , ref: 'Student'},
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  details: [{
    size:{type: String,default:""},
    quantity:{type: Number, default:0},
    status: {type: Number, default:1}
    
  }]
});

Order.plugin(timestamps);
Order.index({ name: 'text'});
exports.Order = mongoose.model('Order', Order);