var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Clothes = new Schema({
  school:{type: Schema.Types.ObjectId , ref: 'School'},
  stock: [{
    name: {type: String,default:""},
    status: {type: Number, default:1},
    info: [{
      size: {type: String,default:""},
      quantity : {type: Number, default:0}
    }]
  }],
  status: {type: Number, default:1}
});

Clothes.plugin(timestamps);
Clothes.index({ name: 'text'});
exports.Clothes = mongoose.model('Clothes', Clothes);