var model = require('../models');
var adminMgr = require("../controller/admin");
var parentMgr = require("../controller/parent");
var teacherMgr = require("../controller/teacher");
var studentMgr = require("../controller/student");

function setFromsMessages(conversations,cb){
  var sum = 0 ,counter = 0;
  for(var i in conversations){
    sum += conversations[i].messages.length;
    for(var j in conversations[i].messages ){
      if( conversations[i].messages[j].from.type == "ADMIN" ){
        adminMgr.getAdminId(conversations[i].messages[j].from.id,function(obj){
          conversations[i].messages[j].from.id = obj;
          counter++;
          if ( sum == counter ){
            cb(conversations);
          }
        });
      } else if( conversations[i].messages[j].from.type == "PARENT" ){
        parentMgr.getParentId(conversations[i].messages[j].from.id,function(obj){
          conversations[i].messages[j].from.id = obj;
          counter++;
          if ( sum == counter ){
            cb(conversations);
          }
        });
      } else if( conversations[i].messages[j].from.type == "TEAHER" ){
        teacherMgr.getTeacherId(conversations[i].messages[j].from.id,function(obj){
          conversations[i].messages[j].from.id = obj;
          counter++;
          if ( sum == counter ){
            cb(conversations);
          }
        });
      }
    }
  } 
}

module.exports = {

  getAllConversationsByParentID :function(parentID,cb){
    model.Conversation.find({participants : { $elemMatch : { id : parentID , type : "PARENT" } } })
    .exec(function(err, conversationsMongoose){
      if(!err){
        var conversations = JSON.parse(JSON.stringify(conversationsMongoose));
        var sum = 0 , counter = 0;
        for(var i in conversations){
          sum += conversations[i].participants.length;
          for(var j in conversations[i].participants){
            if( conversations[i].participants[j].type == "ADMIN" ){
              adminMgr.getAdminId(conversations[i].participants[j].id,function(obj){
                conversations[i].participants[j].id = obj;
                counter++;
                if( sum == counter ){
                  setFromsMessages(conversations,cb);
                }
              });
            }else if( conversations[i].participants[j].type == "PARENT" ){
              parentMgr.getParentId(conversations[i].participants[j].id,function(obj){
                conversations[i].participants[j].id = obj;
                counter++;
                if( sum == counter ){
                  setFromsMessages(conversations,cb);
                }
              });
            }else if( conversations[i].participants[j].type == "TEAHER" ){
              teacherMgr.getTeacherId(conversations[i].participants[j].id,function(obj){
                conversations[i].participants[j].id = obj;
                counter++;
                if( sum == counter ){
                  setFromsMessages(conversations,cb);
                }
              });
            }else if( conversations[i].participants[j].type == "STUDENT" ){
              studentMgr.getStudentId(conversations[i].participants[j].id,function(obj){
                conversations[i].participants[j].id = obj;
                counter++;
                if( sum == counter ){
                  setFromsMessages(conversations,cb);
                }
              });
            }
          }
        }
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
