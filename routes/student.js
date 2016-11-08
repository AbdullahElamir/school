var express = require('express');
var router = express.Router();
var studentMgr = require("../controller/student");
var classRoomMgr = require("../controller/classRoom");
var stuproMgr = require("../controller/studentProcess");
var MessageMgr = require("../controller/message");
var parentMsg = require("../controller/parentMsg");
var userHelpers = require("../controller/userHelpers");
yearMgr = require("../controller/year");
var TSCMgr = require("../controller/teacherSubjectClass");
var jsreport = require("jsreport");
var subjectMgr = require("../controller/subject");
var stuEvaMgr = require("../controller/studentEvaluation");
var evaMgr = require("../controller/evaluation");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var path = require("path");
var user={};
user.school="5801f550e4de0e349c8714c2";



router.get('/report1',userHelpers.isLogin , function(req, res) {
  jsreport.render({
    template: {
      engine: "jsrender",
      recipe: "phantom-pdf",
      content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report1.html"), "utf8")
    },data:{result:null}
  }).then(function(resp) {
    resp.stream.pipe(res);
  }).catch(function(e) {
    res.end(e.message);
  });
});


router.get('/genrateStudentId',function(req, res){
  studentMgr.StudentGenerateId(1,function(result){
   res.send(result); 
  });
})



router.get('/report2/:stupro',userHelpers.isLogin , function(req, res) {
  getData(req.params.stupro,function(data){
    console.log('data');
    jsreport.render({
      template: {
        engine: "jsrender",
        recipe: "phantom-pdf",
        phantom:{
          format: 'A4',
          orientation: "landscape"
        },
        content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report2.html"), "utf8")
      },data:{result:data}
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  });
});
router.get('/report3',userHelpers.isLogin , function(req, res) {
  jsreport.render({
    template: {
      engine: "jsrender",
      recipe: "phantom-pdf",
      content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report3.html"), "utf8")
    },data:{result:null}
  }).then(function(resp) {
    resp.stream.pipe(res);
  }).catch(function(e) {
    res.end(e.message);
  });
});
router.get('/report4',userHelpers.isLogin , function(req, res) {
  jsreport.render({
    template: {
      engine: "jsrender",
      recipe: "phantom-pdf",
      phantom:{
        format: 'A4',
        orientation: "landscape"
      },
      content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report4.html"), "utf8")
    },data:{result:null}
  }).then(function(resp) {
    resp.stream.pipe(res);
  }).catch(function(e) {
    res.end(e.message);
  });
});
router.get('/class/:searchValue/:_class',userHelpers.isLogin , function(req, res) {
  classRoomMgr.getClassRoomClass(req.params._class,function(clas){
    stuproMgr.getStuproRoom(clas,function(stupro){
      studentMgr.getStudentStupro(user.school,req.params.searchValue,stupro,function(student){
        res.send(student);
      });
    });
  });
});
router.get('/class//:_class',userHelpers.isLogin , function(req, res) {
  // get real data without search text
  classRoomMgr.getClassRoomClass(req.params._class,function(clas){
    stuproMgr.getStuproRoom(clas,function(stupro){
      studentMgr.getStudentStupro(user.school,'',stupro,function(student){
        res.send(student);
      });

    });
  });
});

/* Send Message to Parent of Student by studentID */
router.put('/message/:studentId',userHelpers.isLogin,function(req, res) {
  MessageMgr.addMsgParent(req.body,function(msg){
    studentMgr.getStudentId(req.params.studentId,function(stu){
      parentMsg.addParentMsg({parent:stu.parent[0],msg:msg._id},function(send){
        res.send(send);
      });
    });
  });
});

/*GET all Student By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  studentMgr.getAllStudentsBySearchValue(user.school,req.params.searchValue,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

/* GET all student */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  studentMgr.getAllStudentsCount(user.school,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res){
  studentMgr.getAllStudent(user.school,function(student){
    res.send(student);
  });
});

/* Add new student  */
router.post('/add',function(req, res) {
  studentMgr.StudentGenerateId(req.body.gender,function(result){
      req.body.school=user.school;
      req.body.studentrealid =result
      studentMgr.addStudent(req.body,function(student){
      res.send(student);
    });
  });
});

router.post('/upload/:id',userHelpers.isLogin, multipartMiddleware, function(req, res) {
  //save image to public/img/students with a name of "student's id" without extention
  // don't forget to delete all req.files when done
  var dir = './public/img/students';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.readFile(req.files.file.path, function (err, data) {
    var newPath =dir+'/'+req.params.id;
    fs.writeFile(newPath, data, function (err) {
      if(!err){
        res.send(true);
      }

    });
  });

});

/* open student,s file by id  */
router.put('/openFile/:id',userHelpers.isLogin,function(req, res) {
  studentMgr.updateStudent(req.params.id,{finishDate:null,active:1},function(student){
    res.send(student);
  });
});
/* close student;s file by id  */
router.put('/closeFile/:id',userHelpers.isLogin,function(req, res) {
  studentMgr.updateStudent(req.params.id,{finishDate:new Date(),active:0},function(student){
    res.send(student);
  });
});

/* Edit student by id  */
router.put('/edit/:id',userHelpers.isLogin,function(req, res) {
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


function getSubject(sys_class,id,cb){
  sys_class.forEach(function(i,k) {
    if(i.id_class.toString()==id.toString()){
      cb(i.selected);
    }
  });
}
function getData(id,cb){
  stuproMgr.getStuPro(id,function(stupro){
    if(stupro){
      classRoomMgr.getClassRoomId(stupro.classRoom,function(claaes){
        yearMgr.getYearId(stupro.year,function(system){
          TSCMgr.getTeacherSubject(stupro.classRoom,stupro.year,function(teacherSub){
            var arr=[];
            getSubject(system.system.sys_class,claaes.class._id,function(subjectsID){
              subjectMgr.getSubjectById(user.school,subjectsID,function(subjects){
                for(i in subjects){
                  var name = ".................";
                  if(teacherSub[subjects[i]._id]){
                    name = teacherSub[subjects[i]._id].name;
                  }
                  getEvaluation(stupro,subjects[i]._id,1,function(eva){
                    var obj = {
                      subject:subjects[i].name,
                      teacher:name,
                      // first:eva.first,
                      // second:eva.second
                    }
                    arr.push(obj);
                    if(i == subjects.length-1){
                      cb(arr);
                    }
                  });
                } 
              });
              
            });
          });
        });
      });
    }
  });
}
function getEvaluation(stupro,subject,month,cb){
  evaMgr.getAllEvaluation(user.school,function(eva){
    stuEvaMgr.getStuEva(stupro,subject,month,1,function(evaluationF){
      stuEvaMgr.getStuEva(stupro,subject,month,2,function(evaluationS){
        var first=[];
        var second=[]; 
        for(var j in eva){
          var obj1={
            name:eva[j].name
          };
          var obj2={
            name:eva[j].name
          };
          if(evaluationF[eva[j]._id]){
            obj1.rating=evaluationF[eva[j]._id];
          }else{
            obj1.rating=null;
          }
          first[eva[j]._id]=obj1;
          if(evaluationS[eva[j]._id]){
            obj2.rating=evaluationF[eva[j]._id];
          }else{
            obj2.rating=null;
          }
          second[eva[j]._id]=obj2;
          if(j==eva.length-1){
            console.log(j);
            cb({first:first,second:second});
          }
        }
      });
    });
  });

}
module.exports = router;
