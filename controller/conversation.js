var model = require('../models');
var adminMgr = require("../controller/admin");
var parentMgr = require("../controller/parent");
var teacherMgr = require("../controller/teacher");
var studentMgr = require("../controller/student");

function setFromsMessages(conversations,cb){
  var sum = 0 ,counter = 0;
  conversations.forEach(function(conversation) {
    sum += conversation.messages.length;
    conversation.messages.forEach(function(message) {
      if( message.from.type == "ADMIN" ){
        adminMgr.getAdminId(message.from.id,function(obj){
          message.from.id = obj;
          counter++;
          if ( sum == counter ){
            cb(conversations);
          }
        });
      } else if( message.from.type == "PARENT" ){
        parentMgr.getParentId(message.from.id,function(obj){
          message.from.id = obj;
          counter++;
          if ( sum == counter ){
            cb(conversations);
          }
        });
      } else if( message.from.type == "TEAHER" ){
        teacherMgr.getTeacherId(message.from.id,function(obj){
          message.from.id = obj;
          counter++;
          if ( sum == counter ){
            cb(conversations);
          }
        });
      }
    });
  });
}

module.exports = {

  getAllConversationsByParentID :function(parentID,cb){
    model.Conversation.find({participants : { $elemMatch : { id : parentID , type : "PARENT" } } })
    .exec(function(err, conversationsMongoose){
      if(!err){
        var conversations = JSON.parse(JSON.stringify(conversationsMongoose));
        var sum = 0 , counter = 0;
        conversations.forEach(function(conversation) {
          sum += conversation.participants.length;
          conversation.participants.forEach(function(participant){
            if( participant.type == "ADMIN" ){
              adminMgr.getAdminId(participant.id,function(obj){
                participant.id = obj;
                counter++;
                if( sum == counter ){
                  setFromsMessages(conversations,cb);
                }
              });
            }else if( participant.type == "PARENT" ){
              parentMgr.getParentId(participant.id,function(obj){
                participant.id = obj;
                counter++;
                if( sum == counter ){
                  setFromsMessages(conversations,cb);
                }
              });
            }else if( participant.type == "TEAHER" ){
              teacherMgr.getTeacherId(participant.id,function(obj){
                participant.id = obj;
                counter++;
                if( sum == counter ){
                  setFromsMessages(conversations,cb);
                }
              });
            }else if( participant.type == "STUDENT" ){
              studentMgr.getStudentId(participant.id,function(obj){
                participant.id = obj;
                counter++;
                if( sum == counter ){
                  setFromsMessages(conversations,cb);
                }
              });
            }
          });
        });
      }else{
        cb([]);
      }
    });
  },
  
  getMessagesCountInConversation :function(conversationID,cb){
    model.Conversation.findOne({_id:conversationID}, function(err, conversation){
      if(!err){
        cb({count : conversation.messages.length});
      }else{
        cb({count : 0});
      }
    });
  }
  
};