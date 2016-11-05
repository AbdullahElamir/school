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
      seen: {type: Boolean, default:false},
      date: {type: Date, default: Date.now },
      from: {
        type: {
          id : {type: Schema.Types.ObjectId},
          type : {type: String,default:""}
        }
      }
    }]
  }
});

Conversation.plugin(timestamps);
exports.Conversation = mongoose.model('Conversation', Conversation);