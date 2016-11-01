var express = require('express');
var router = express.Router();
var classRoomMgr = require("../controller/classRoom");
var stuproMgr = require("../controller/studentProcess");
var studentMgr = require("../controller/student");
var MessageMgr = require("../controller/message");
var parentMsg = require("../controller/parentMsg");
var TSCMgr = require("../controller/teacherSubjectClass");
var userHelpers = require("../controller/userHelpers");
var user={};
user.school="5801f550e4de0e349c8714c2";

router.get('/student/:classRoom/:year/:text', userHelpers.isLogin ,function(req, res) {
  stuproMgr.getStuProcessesByClassRoomAndYear(req.params.classRoom,req.params.year,function(stuProsIds){
    studentMgr.getStudentByStuProcessAndSearchValue(stuProsIds,req.params.text,function(students){
      res.send(students);
    });
  });
});

router.get('/student/:classRoom/:year/', userHelpers.isLogin ,function(req, res) {
  stuproMgr.getStuProcessesByClassRoomAndYear(req.params.classRoom,req.params.year,function(stuProsIds){
    studentMgr.getStudentByStuProcessAndSearchValue(stuProsIds,"",function(students){
      res.send(students);
    });
  });
});

/* Send Message to Parent of Students of ClassRoom By classRoomID */
router.put('/message/:classRoomID',function(req, res) {
  stuproMgr.getStuproRoom(req.params.classRoomID,function(stupro){
    studentMgr.getStudentAllID(stupro,function(students){
      MessageMgr.addMsgParent(req.body,function(msg){
        parentMsg.addParentMsgBulk(students,msg._id,function(send){
          res.send(send);
        });
      });
    });
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  classRoomMgr.getAllClassRoom(function(Croom){
    res.send(Croom);
  });
});

// add new  class room
router.post('/add', userHelpers.isLogin ,function(req, res) {
  classRoomMgr.addClassRoom(req.body,function(Croom){
    res.send(Croom);
  });
});

// edit class room by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  classRoomMgr.updateClassRoom(req.params.id,req.body,function(Croom){
    res.send(Croom);
  });
});

// edit class room students
router.put('/students/:id', userHelpers.isLogin ,function(req, res) {
  //update students of this classroom
  classRoomMgr.getClassRoomId(req.params.id,function(Croom){
    if(req.body.length==0){
      res.send(true);
    }
    for(var t in req.body){
      stuproMgr.addStudentsProcess(Croom,req.body[t],function(pro){});
      studentMgr.updateStudent(req.body[t]._id,{class:Croom.class},function(st){}); //set this class as student's current class
      if(t == req.body.length-1){
        res.send(true);
      }
    }
  });
});

// delete room by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  classRoomMgr.updateClassRoom(req.params.id,{status:0},function(Croom){
    res.send({result:Croom});
  });
});

// get class room by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  classRoomMgr.getAllClassRoomStatus(req.params.status,function(Croom){
    res.send(Croom);
  });
});

// get class room by name
router.get('/name/:name',userHelpers.isLogin , function(req, res) {
  classRoomMgr.getClassRoomName(req.params.name,function(Croom){
    res.send(Croom);
  });
});

// get class room by name
router.get('/teacher/:id',userHelpers.isLogin , function(req, res) {
  TSCMgr.getTeacherClassSubject(req.params.id,function(result){
    var tsc = [];
    if(result.length === 0){
      res.send([]);
    }
    for(var i in result){
      tsc.push({
        _id:result[i].classRoom._id,
        name:result[i].classRoom.name,
        course:result[i].subject.name,
        courseId:result[i].subject._id
      });
      if(i == result.length-1){
        res.send(tsc);
      }
    }
  });
  // res.send([
  //   {_id:84515641,name:"3/1",course:"الفيزياء",courseId:651356},
  //   {_id:87458458,name:"3/2",course:"الفيزياء",courseId:651356},
  //   {_id:85648866,name:"4/1",course:"كيمياء",courseId:653156}
  // ]);
});

//get all claas Rooms By Search Value
router.get('/students/:classRoom/:year',userHelpers.isLogin , function(req, res) {
  stuproMgr.getAllClassRoomeStudentsByYear(req.params.classRoom,req.params.year,function(Crooms){
    var _room=[];
    if(Crooms.length === 0){
      res.send([]);
    }
    for (var i in Crooms){
      _room.push(Crooms[i].student);
      if(i == Crooms.length-1){
        res.send(_room);
      }
    }
  });
  // res.send([
  //   {_id:745645645,name:"a"},
  //   {_id:845613541,name:"b"},
  //   {_id:874515717,name:"c"},
  //   {_id:812674577,name:"d"}
  // ]);
});

//get all claas Rooms By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  classRoomMgr.getAllClassRoomesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(Crooms){
    res.send(Crooms);
  });
});

// get all class rooms
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  classRoomMgr.getAllClassRoomCount(req.params.limit,req.params.page,function(Croom){
    res.send(Croom);
  });
});

// get  class room by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  classRoomMgr.getClassRoomId(req.params.id,function(Croom){
    res.send(Croom);
  });
});

module.exports = router;
