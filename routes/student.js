var express = require('express');
var router = express.Router();
var studentMgr = require("../controller/student");
var classRoomMgr = require("../controller/classRoom");
var stuproMgr = require("../controller/studentProcess");
var MessageMgr = require("../controller/message");
var parentMsg = require("../controller/parentMsg");
var userHelpers = require("../controller/userHelpers");

router.get('/class/:searchValue/:_class',userHelpers.isLogin , function(req, res) {
  classRoomMgr.getClassRoomClass(req.params._class,function(clas){
    stuproMgr.getStuproRoom(clas,function(stupro){
      studentMgr.getStudentStupro(req.params.searchValue,stupro,function(student){
        res.send(student);
      });
    });
  });
});
router.get('/class//:_class',userHelpers.isLogin , function(req, res) {
  // get real data without search text
  classRoomMgr.getClassRoomClass(req.params._class,function(clas){
    stuproMgr.getStuproRoom(clas,function(stupro){
      studentMgr.getStudentStupro('',stupro,function(student){
        res.send(student);
      });
      
    });
  });
});

/* Send Message to Parent of Student by studentID */
router.put('/message/:studentId',function(req, res) {
  MessageMgr.addMsgParent(req.body,function(msg){
    studentMgr.getStudentId(req.params.studentId,function(stu){
      parentMsg.addParentMsg({parent:stu.parent[0],msg:msg._id},function(send){
        res.send(send);
      });
    });
  });
  // console.log("#1 : " + req.params.studentId); // student id
  // console.log("#2 : " + req.body.title);       // message title 
  // console.log("#3 : " + req.body.description); // message description
});

/*GET all Student By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  studentMgr.getAllStudentsBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

/* GET all student */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  studentMgr.getAllStudentsCount(req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res){
  studentMgr.getAllStudent(function(student){
    res.send(student);
  });
});

/* Add new student  */
router.post('/add',function(req, res) {
  studentMgr.addStudent(req.body,function(student){
    res.send(student);
  });

});

/* Edit student by id  */
router.put('/edit/:id',function(req, res) {
  studentMgr.updateStudent(req.params.id,req.body,function(student){
    res.send(student);
  });
});
/* Delete student by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  studentMgr.deleteStudent(req.params.id,function(student){
    res.send({result:student});
  });
});

/* GET student by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  studentMgr.getStudentId(req.params.id,function(student){
    res.send(student);
  });
});

module.exports = router;
