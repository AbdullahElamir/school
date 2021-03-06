var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Conversation = new Schema({
  participants:{ 
    type: [{
      id : {type: Schema.Types.ObjectId} ,
      type : {type: String,default:""}
    }]
  },
  messages:{
    type: [{
      text: {type: String,default:""},
      seen: {type: Number, default:0},
      date: {type: Date, default: Date.now },
      from: { 
        id : {type: Schema.Types.ObjectId},
        type : {type: String,default:""}
      }
    }]
  }
});

Conversation.plugin(timestamps);
Conversation.index({ name: 'text'});
exports.Conversation = mongoose.model('Conversation', Conversation);