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
      } else if( message.from.type == "TEACHER" ){
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

function saveMessageOnConversation(option,studentsIds,fromId,typeFrom,toId,typeTo,message,cb){
  model.Conversation.findOne(option).exec(function(err, conversation){
    if( !err ){
      if( conversation != null && conversation.participants.length == (studentsIds.length+2) ){
        var messages = JSON.parse(JSON.stringify(conversation.messages)); 
        messages.push({ text:message.description, seen:false, date:new Date(), from:{id:fromId,type:typeFrom} });
        model.Conversation.findOneAndUpdate({_id:conversation._id},{messages:messages}, function(err) {
          cb((!err)? true : false);
        });
      } else {
        var counter = 0;
        var participantsArray = [];
        participantsArray.push({id:fromId,type:typeFrom});
        participantsArray.push({id:toId,type:typeTo});
        if( studentsIds.length > 0 ){
          studentsIds.forEach(function(studentId){
            participantsArray.push({id:studentId,type:"STUDENT"});
            counter++;
            if(counter == studentsIds.length){
              var conversationNewObj = new model.Conversation({ participants:participantsArray, messages:[{ text:message.description, seen:false, date:new Date(), from:{id:fromId,type:typeFrom} }] });
              conversationNewObj.save(function(err){  cb((!err)? true : false);  });
            }
          });
        } else {
          var conversationNew = new model.Conversation({ participants:participantsArray, messages:[{ text:message.description, seen:false, date:new Date(), from:{id:fromId,type:typeFrom} }] });
          conversationNew.save(function(err){  cb((!err)? true : false);  });
        }
      }
    } else {
      cb(false);
    }
  });
}

module.exports = {

  getAllConversationsByUserIDAndType :function(userID,type,cb){
    model.Conversation.find({participants : { $elemMatch : { id : userID , type : type } } })
    .sort({updatedAt:1})
    .exec(function(err, conversationsMongoose){
      if(!err){
        if(  conversationsMongoose.length > 0 ){
          var conversations = JSON.parse(JSON.stringify(conversationsMongoose));
          var sum = 0 , counter = 0;
          conversations.forEach(function(conversation){
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
              }else if( participant.type == "TEACHER" ){
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
  },
  
  sendMsgFromPersonToPersonWithStudents: function(studentsIds,fromId,typeFrom,toId,typeTo,message,cb){
    var option = {$and : []};
    option.$and.push({participants : { $elemMatch : {id:fromId,type:typeFrom} } });
    option.$and.push({participants : { $elemMatch : {id:toId  ,type:typeTo  } } });
    option.$and.push({ $where: "this.participants.length == "+(studentsIds.length+2) });
    if( studentsIds.length > 0 ){
      var counter = 0;
      studentsIds.forEach(function(studentId){
        option.$and.push({participants : { $elemMatch : {id:studentId,type:"STUDENT"} } });
        counter++;
        if(counter == studentsIds.length){
          saveMessageOnConversation(option,studentsIds,fromId,typeFrom,toId,typeTo,message,cb);
        }
      });
    }else{
      saveMessageOnConversation(option,studentsIds,fromId,typeFrom,toId,typeTo,message,cb);
    }
  },
  
  addMessageInConversation : function(conversationId,message,from,cb){
    model.Conversation.findOne({_id:conversationId}, function(err, conversation){
      if(!err && conversation != null){
        var messages = JSON.parse(JSON.stringify(conversation.messages)); 
        messages.push({ text:message, seen:false, date:new Date(), from:from });
        model.Conversation.findOneAndUpdate({_id:conversationId},{messages:messages}, function(err) {
          cb((!err)? true : false);
        });
      }else{
        cb(false);
      }
    });
  }
  
};