var express = require('express');
var router = express.Router();
var classRoomMgr = require("../controller/classRoom");
var stuproMgr = require("../controller/studentProcess");
var studentMgr = require("../controller/student");
var MessageMgr = require("../controller/message");
var parentMsg = require("../controller/parentMsg");
var TSCMgr = require("../controller/teacherSubjectClass");
var userHelpers = require("../controller/userHelpers");
var resultMgr = require("../controller/result");
var marksSubMgr = require("../controller/marksSubject");
var examMgr = require("../controller/exam");
var user={};
user.school="5801f550e4de0e349c8714c2";

router.get('/student/:classRoom/:year/:text', userHelpers.isLogin ,function(req, res) {
  stuproMgr.getStuProcessesByClassRoomAndYear(req.params.classRoom,req.params.year,function(stuProsIds){
    studentMgr.getStudentByStuProcessAndSearchValue(stuProsIds,req.params.text,function(students){
      res.send(students);
    });
  });
});

router.get('/results/:searchValue/:classRoom/:year', userHelpers.isLogin ,function(req, res) {
  stuproMgr.getStuProcessesByClassRoomAndYear(req.params.classRoom,req.params.year,function(stuProsIds){
    studentMgr.getStudentByStuProcessAndSearchValue(stuProsIds,req.params.searchValue,function(students){
      var cb = function(std,status){
        students[std].stat=status;
        if(std===students.length-1){
          res.send(students);
        }
      };
      for(var std in students){
        resultMgr.studentStatus(students,std,cb);
      }
    });
  });
  // res.send({
  //   result:[
  //     {StuPro:"1",name:"احمد",status:0},
  //     {StuPro:"2",name:"سالم",status:1},
  //     {StuPro:"3",name:"محمد",status:2}
  //   ],
  //   count:3
  // });
});
router.get('/results//:classRoom/:year', userHelpers.isLogin ,function(req, res) {
  stuproMgr.getStuProcessesByClassRoomAndYear(req.params.classRoom,req.params.year,function(stuProsIds){
    studentMgr.getStudentByStuProcessAndSearchValue(stuProsIds,req.params.searchValue,function(students){
      var cb = function(std,status){
        students[std] = students[std].toObject();
        students[std].stat=status;
        if(std==students.length-1){
          res.send(students);
        }
      };
      for(var std in students){
        resultMgr.studentStatus(students,std,req.params.classRoom,cb);
      }
    });
  });
//   res.send({
//     result:[
//       {StuPro:"1",name:"احمد",status:0},
//       {StuPro:"2",name:"سالم",status:1},
//       {StuPro:"3",name:"محمد",status:2}
//     ],
//     count:3
//   });
});

router.get('/grades/:idStudent/:classRoomId', userHelpers.isLogin ,function(req, res) {
  classRoomMgr.getClassRoomIdWithYearAndSystem(req.params.classRoomId,function(classR){
    var clssY=classR.class;
    var system=classR.year.system;
    var result = [];
    var flag = 0;
    var func = function(subject,size){
      subject = subject.id_subject.toObject();
      marksSubMgr.getMarksSubSubject(subject._id,system._id,function(examssub){
        examMgr.getExamSClass(classR.class,system._id,function(exams){
          stuproMgr.getStudentsSto(req.params.classRoomId,req.params.idStudent,function(sto){
            resultMgr.getResultSubject(sto,exams,subject._id,function(marksS){
              var examsGrades=[];
              var fun = function(i){
                var obj ={
                  _id:examssub[i].exam._id,
                  name:examssub[i].exam.name,
                  mark:examssub[i].mark,
                  type:examssub[i].exam.type,
                  semester:examssub[i].exam.semester
                };
                if(marksS[examssub[i].exam._id]){
                  obj.studentMark=marksS[examssub[i].exam._id];

                }else{
                  obj.studentMark=0;
                }
                examsGrades.push(obj);
                if(i ==examssub.length-1){
                  console.log("aaa");
                  result.push({
                    _id:subject._id,
                    name:subject.name,
                    examsGrades:examsGrades
                  });
                  flag++;
                  if(flag===size){
                    res.send(result);
                  }
                }
              };
              for(var i in examssub){
                fun(i);
              }
            });
          });
        });
      });
    };
    for(var cls =0 ; cls<system.sys_class.length ; cls ++){
      if(system.sys_class[cls].id_class+"" === clssY+""){
        for(var sub = 0 ; sub < system.sys_class[cls].selected.length ; sub++){
          func(system.sys_class[cls].selected[sub],system.sys_class[cls].selected.length);
        }
        break;
      }
    }
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
    if(req.body.length===0){
      res.send(true);
    }
    for(var t in req.body){
      stuproMgr.addStudentsProcess(Croom,req.body[t],function(pro){
      });
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
