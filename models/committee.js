var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Committee = new Schema({
  name: { type: String, index: true, default: "Unknown user"},
  room: {type: Schema.Types.ObjectId , ref: 'Room'},
  year: {type: Schema.Types.ObjectId , ref: 'Year'},
  notes: {type: String, default: ""},
  proctors:{
    type: [{
      examCommitteeProctors:{type: Schema.Types.ObjectId , ref: 'Teacher'}
    }]
  },
  school: {type: Schema.Types.ObjectId , ref: 'School'},
  status: {type: Number, default:1}
});

Committee.plugin(timestamps);
Committee.index({ name: 'text'});
exports.Committee = mongoose.model('Committee', Committee);