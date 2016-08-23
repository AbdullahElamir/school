var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Room = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  students: {type: Number,default:0},
  status: {type: Number, default:1}
});

Room.plugin(timestamps);
Room.index({ name: 'text'});
exports.Room = mongoose.model('Room', Room);