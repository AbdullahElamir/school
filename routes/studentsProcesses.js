var express = require('express');
var router = express.Router();
var userHelpers = require("../controller/userHelpers");
var classRoomMgr = require("../controller/classRoom");
var sysYearMgr = require("../controller/systemYear");
var examMgr = require("../controller/exam");
var marksSubMgr = require("../controller/marksSubject");
var stuproMgr = require("../controller/studentProcess");
var resultMgr = require("../controller/result");
var stuEvaMgr = require("../controller/studentEvaluation");
var evaMgr = require("../controller/evaluation");
//get student information
router.get('/rate/:stupro/:course/:month/:half', userHelpers.isLogin ,function(req, res) {
  evaMgr.getAllEvaluation(function(result){
    stuEvaMgr.getStuEva(req.params.stupro,req.params.course,req.params.month,req.params.half,function(evaluation){
      var obj=[];
      if(result.length === 0){
        res.send([]);
      }
      for( var i in result){
        var eva={
          _id:result[i]._id,
          name:result[i].name
        };
        if(evaluation[result[i]._id]){
          eva.rating=evaluation[result[i]._id];
        }else{
          eva.rating=0;
        }

        obj.push(eva);
        if(i == result.length-1){
          res.send(obj);
        }
      }
    });
  });


});

router.get('/stuPro', userHelpers.isLogin ,function(req, res) {
  var info = [{
    "name":"mohammed",
    "description":"tripoli",
    "id":"1"
  }];
  res.send(info);

});

// update grades of exams student in subject on classRoom for a current year (where year is Active)
router.put('/grades/edit/:idStudent/:subjectId/:classRoomId', userHelpers.isLogin ,function(req, res) {
  stuproMgr.getStudentsSto(req.params.classRoomId,req.params.idStudent,function(sto){
    for( var k in req.body){
      var obj={
        StuPro:sto,
        exam:req.body[k]._id,
        subject:req.params.subjectId,
        mark:req.body[k].studentMark
      };
      resultMgr.addResultUpdate(obj,function(result){
        if(k==req.body.length-1){
          res.send(true);
        }
      });
    }

  });

});

router.put('/rate/:stupro/:course/:month/:half', userHelpers.isLogin ,function(req, res) {
  //req.body
  for (var index in req.body){
    stuEvaMgr.addStuEva(req.params.stupro,req.params.course,req.params.month,req.params.half,req.body[index],function(evaluation){

    });
    if(index == req.body.length-1){
        res.send(true);
      }

  }

});
// get grades of exams for student in subject on classRoom for a current year (where year is Active)
router.get('/grades/:idStudent/:subjectId/:classRoomId', userHelpers.isLogin ,function(req, res) {
  classRoomMgr.getClassRoomId(req.params.classRoomId,function(classR){
    var clssY=classR.class;
    sysYearMgr.getSystemYear(classR.year,function(sysyear){
      system=sysyear.system;
      marksSubMgr.getMarksSubSubject(req.params.subjectId,system,function(examssub){
        examMgr.getExamSClass(classR.class,sysyear.system,function(exams){
          stuproMgr.getStudentsSto(req.params.classRoomId,req.params.idStudent,function(sto){
            resultMgr.getResultSubject(sto,exams,req.params.subjectId,function(marksS){
              var examsGrades=[];
              for( var i in examssub){
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
                  res.send(examsGrades);
                }
              }
            });
          });
        });
      });

    });
  });
});

// get students By subject Id and class room Id for a current year (where year is Active)
router.get('/studInfo/:subjectId/:classRoomId', userHelpers.isLogin ,function(req, res) {
  stuproMgr.getStudentClassRoom(req.params.classRoomId,function(Crooms){
    var _room=[];
    if(Crooms.length === 0){
      res.send([]);
    }
    for (var i in Crooms.stu){
      _room.push(Crooms.stu[i].student);
      if(i == Crooms.stu.length-1){
        res.send(_room);
      }
    }
  });
});


router.post('/add', userHelpers.isLogin ,function(req, res) {
  stuproMgr.addStupro(req.body,function(Stupro){
    res.send(Stupro);
  });
});
module.exports = router;
