var express = require('express');
var router = express.Router();
var userHelpers = require("../controller/userHelpers");
var studentMgr = require("../controller/student");
var conversationMgr = require("../controller/conversation");
var adminMgr = require("../controller/admin");
var teacherMgr = require("../controller/teacher");
var parentMgr = require("../controller/parent");
var orderMgr = require("../controller/order");

router.post('/children/all', function(req, res) {
  studentMgr.getStudentByParentId(req.session.school,req.body._id,function(child){
    children=[];
    for (i in child){
      createObject(child[i],req.body.type,function(obj){
        children.push(obj);
        if(i == child.length-1){
          res.send(children);
        }
      });
    }

  });
});
router.post('/order', function(req, res) {
  var details={
    name: req.body.type,
    size:req.body.size,
    quantity:req.body.quantity,
    date:req.body.date
    };
    var detArray = [];
      detArray.push(details);
    var obj= {
          student:req.body.studentId,
          school:req.body.schoolId,
          details:detArray

    };
  orderMgr.addOrder(obj,function(result){
    var obj={
      schoolId:result.school,
      type:result.details[result.details.length-1].name,
      quantity:result.details[result.details.length-1].quantity,
      size:result.details[result.details.length-1].size,
      date:result.details[result.details.length-1].date,
      status:result.details[result.details.length-1].status,
      _id:result._id,
      studentName:req.body.studentName,
      studentId:result.student
    };
    res.send(obj);
  });
});
router.post('/person',userHelpers.isLogin, function(req, res) {
  if(req.body.type=='STUDENT'){
    studentMgr.getStudentId(req.body._id,function(student){
      createObject(student,req.body.type,function(obj){
        res.send(obj);
      });
    });
  }else if(req.body.type=='ADMIN'){
    adminMgr.getAdminId(req.body._id,function(admin){
      createObject(admin,req.body.type,function(obj){
        res.send(obj);
      });
    });
  }else if(req.body.type=='TEACHER'){
    teacherMgr.getTeacherId(req.body._id,function(teacher){
      createObject(teacher,req.body.type,function(obj){
        res.send(obj);
      });
    });
  }else if(req.body.type=='PARENT'){
    parentMgr.getParentId(req.body._id,function(parent){
      createObject(parent,req.body.type,function(obj){
        res.send(obj);
      });
    });
  }

});

// Mobile App Router :

router.get('/get/messages/count/:parentId', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getMessagesCount(req.params.parentId,function(count){
    res.send(count);
  });
});

router.get('/get/new/messages/:conversationID/:startFrom', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getNewMessages(req.params.conversationID,req.params.startFrom,function(messages){
    res.send(messages);
  });
});

router.get('/get/conversations/count/:parentId', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getConversationsCount(req.params.parentId,function(count){
    res.send(count);
  });
});

router.get('/get/seen/messages/count/in/conversaton/:conversationID', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getSeenMessagesCountInConversaton(req.params.conversationID,function(count){
    res.send(count);
  });
});

router.get('/get/seen/messages/by/staff/:conversationID', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getSeenMessagesByStaff(req.params.conversationID,function(msgIDs){
    res.send(msgIDs);
  });
});

router.post('/send/seen/requests/by/parent', userHelpers.isLogin ,function(req, res) {
  conversationMgr.sendSeenRequestsByParent(req.body,function(send){
    res.send(send);
  });
});

router.post('/get/new/conversations/:parentID', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getNewConversations(req.body,function(newConversations){
    res.send(newConversations);
  });
});

router.put('/send/message/:conversationID', userHelpers.isLogin ,function(req, res) {
  conversationMgr.addMessageInConversation(req.params.conversationID,req.body.text,{id:req.body.from.id,type:"PARENT"},function(send){
    res.send(send);
  });
});





function createObject(obj,type,cb){
  cb({type:type,
    _id:obj._id,
    name:obj.name,
    school_id:obj.school
  });
}







module.exports = router;
