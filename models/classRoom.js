var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var ClassRoom = new Schema({
  year:{ type: Schema.Types.ObjectId , ref: 'Year'},
  name: { type: String, index: true, default: "Unknown user"},
  description: {type: String,default:"NULL"},
  room:{type: Schema.Types.ObjectId , ref: 'Room'},
  clas:{ type: Schema.Types.ObjectId , ref: 'Class'},
  sheft:{type: Number, default:1},
  status: {type: Number, default:1}
});

ClassRoom.plugin(timestamps);
ClassRoom.index({ name: 'text'});
exports.ClassRoom = mongoose.model('ClassRoom', ClassRoom); 