var express = require('express');
var router = express.Router();
var studentMgr = require("../controller/student");
var classRoomMgr = require("../controller/classRoom");
var stuproMgr = require("../controller/studentProcess");
var conversationMgr = require("../controller/conversation");
var userHelpers = require("../controller/userHelpers");
var yearMgr = require("../controller/year");
var TSCMgr = require("../controller/teacherSubjectClass");
var subjectMgr = require("../controller/subject");
var stuEvaMgr = require("../controller/studentEvaluation");
var evaMgr = require("../controller/evaluation");
var systemYearMgr = require("../controller/systemYear");
var examMgr = require("../controller/exam");
var resultMgr = require("../controller/result");
var marksSubMgr = require("../controller/marksSubject");
var months = require("../months");
var jsreport = require("jsreport");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var path = require("path");

router.get('/children/all/:parentId',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  studentMgr.getStudentByParentId(req.session.school,req.params.parentId,function(children){
    res.send(children);
  });
});
router.get('/months',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  res.send(months);
});
router.get('/report1',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  jsreport.render({
    template: {
      engine: "jsrender",
      recipe: "phantom-pdf",
      phantom: {
        format: 'A4',
        customPhantomJS: true
      },
      content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report1.html"), "utf8")
    },data:{result:null}
  }).then(function(resp) {
    resp.stream.pipe(res);
  }).catch(function(e) {
    res.end(e.message);
  });
});

router.get('/genrateStudentId',userHelpers.isAdmin,function(req, res){
  studentMgr.StudentGenerateId(1,function(result){
   res.send(result); 
  });
});




router.get('/report2/:stupro/:month',userHelpers.isLogin , function(req, res) {
  getData(req.params.stupro,req.params.month,req.session.school,function(data){
    jsreport.render({
      template: {
        engine: "jsrender",
        recipe: "phantom-pdf",
        phantom:{
          format: 'A4',
          orientation: "landscape"
        },
        content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report2.html"), "utf8")
      },data:{result:data.arr,info:data.info}
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  });
});
router.get('/report3',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  jsreport.render({
    template: {
      engine: "jsrender",
      recipe: "phantom-pdf",
      phantom: {
        format: 'A4',
        customPhantomJS: true
      },
      content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report3.html"), "utf8")
    },data:{result:null}
  }).then(function(resp) {
    resp.stream.pipe(res);
  }).catch(function(e) {
    res.end(e.message);
  });
});
router.get('/report4/:stupro',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  getcer(req.params.stupro,function(data,exsam){
    jsreport.render({
      template: {
        engine: "jsrender",
        recipe: "phantom-pdf",
        phantom:{
          format: 'A4',
          orientation: "landscape",
          customPhantomJS: true
        },
        content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report4.html"), "utf8")
      },data:{subject:data,exsam:exsam}
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  });
  function getcer(id,cb){
    stuproMgr.getStuproId(id,function(stupros){
      systemYearMgr.getsystemY(stupros.year,req.session.school,stupros.classRoom.class,function(system){
        examMgr.getAllExamS(system._id,stupros.classRoom.class,req.session.school,function(exsam){
          var ex=[]
          exsam.forEach(function(exsamI,E){
            marksSubMgr.getAllMarks(req.session.school,exsamI._id,system._id,function(marks){
              resultMgr.getAllMStupro(id,exsamI._id,function(stuMark){
                // console.log(system.sys_class[0].selected);
                ex[exsamI._id]={exsamM:marks,exsamR:stuMark}
                if(E==exsam.length-1){
                  // console.log(ex);
                  // cb(system.sys_class[0].selected,exsam,ex);
                  meakObj(system.sys_class[0].selected,exsam,ex,function(data){
                    cb(data,exsam);
                  });
                }
              });
            });
          });
        });
      }); 
    });
  };
  function meakObj(subject,exsam,marks,cb){
    var obj=[];
    subject.forEach(function(sub,i){
      var m =[];
      
      for(e in exsam){
        if(marks[exsam[e]._id] == undefined){
          var resul = marks[exsam[e]._id].exsamM[sub.id_subject._id]+" / "+0; 
        }else if(marks[exsam[e]._id].exsamR[sub.id_subject._id] == undefined){
          var resul = marks[exsam[e]._id].exsamM[sub.id_subject._id]+" / "+0;
        }else{
          var resul = marks[exsam[e]._id].exsamM[sub.id_subject._id]+" / "+marks[exsam[e]._id].exsamR[sub.id_subject._id];
        }
        m.push({
          mark:resul
        });
        if(e == exsam.length-1){
          obj.push({
            id_subject: 
              { name: sub.id_subject.name,
                description: sub.id_subject.description,
                marks:m,
                _id: sub.id_subject._id 
              },
            _id: sub._id
          });
        }
      }
      if(i == subject.length-1){
        cb(obj);

      }
    });
  };
});
router.get('/class/:searchValue/:_class',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  classRoomMgr.getClassRoomClass(req.params._class,function(clas){
    stuproMgr.getStuproRoom(req.session.school,clas,function(stupro){
      studentMgr.getStudentStupro(req.session.school,req.params.searchValue,stupro,function(student){
        res.send(student);
      });
    });
  });
});
router.get('/class//:_class',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  // get real data without search text
  classRoomMgr.getClassRoomClass(req.params._class,function(clas){
    stuproMgr.getStuproRoom(req.session.school,clas,function(stupro){
      studentMgr.getStudentStupro(req.session.school,'',stupro,function(student){
        res.send(student);
      });

    });
  });
});

/* Send Message From User _id (Admin or Teacher) to Parent of Student by studentID */
router.put('/message/:studentId',userHelpers.isLogin,userHelpers.isTeacher,function(req, res) {
  studentMgr.getStudentId(req.params.studentId,function(stu){
    conversationMgr.sendMsgFromPersonToPersonWithStudents([req.params.studentId],req.user._id,req.body.type,stu.parent[0]+"","PARENT",req.body.message,function(send){
      res.send(send);
    });
  });
});

/*GET all Student By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  studentMgr.getAllStudentsBySearchValue(req.session.school,req.params.searchValue,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

/* GET all student */
router.get('/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  studentMgr.getAllStudentsCount(req.session.school,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

router.get('/all', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res){
  studentMgr.getAllStudent(req.session.school,function(student){
    res.send(student);
  });
});

/* Add new student  */
router.post('/add',userHelpers.isAdmin,function(req, res) {
  studentMgr.StudentGenerateId(req.body.gender,function(result){
      req.body.school=req.session.school;
      req.body.studentrealid =result;
      studentMgr.addStudent(req.body,function(student){

      res.send(student);
    });
  });
});

router.post('/upload/:id',userHelpers.isLogin,userHelpers.isAdmin, multipartMiddleware, function(req, res) {
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
router.put('/openFile/:id',userHelpers.isLogin,userHelpers.isAdmin,function(req, res) {
  studentMgr.updateStudent(req.params.id,{finishDate:null,active:1},function(student){
    res.send(student);
  });
});
/* close student;s file by id  */
router.put('/closeFile/:id',userHelpers.isLogin,userHelpers.isAdmin,function(req, res) {
  studentMgr.updateStudent(req.params.id,{finishDate:new Date(),active:0},function(student){
    res.send(student);
  });
});

/* Edit student by id  */
router.put('/edit/:id',userHelpers.isLogin,userHelpers.isAdmin,function(req, res) {
  studentMgr.updateStudent(req.params.id,req.body,function(student){
    res.send(student);
  });
});


/* Delete student by id  */
router.delete('/delete/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  studentMgr.deleteStudent(req.params.id,function(student){
    res.send({result:student});
  });
});

/* GET student by ID  */
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
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
function getData(id,month,school,cb){
  stuproMgr.getStuPro(id,function(stupro){
    if(stupro){
      classRoomMgr.getClassRoomId(stupro.classRoom,function(claaes){
        var info = {
          student:stupro.student.name,
          class:claaes.name,
          month:months[month-1].name
        };

        yearMgr.getYearId(stupro.year,function(system){
          TSCMgr.getTeacherSubject(stupro.classRoom,stupro.year,function(teacherSub){
            var arr=[];
            getSubject(system.system.sys_class,claaes.class._id,function(subjectsID){
              subjectMgr.getSubjectById(school,subjectsID,function(subjects){
                subjects.forEach(function(sub,i) {
                  var name = ".................";
                  if(teacherSub[sub._id]){
                    name = teacherSub[sub._id].name;
                  }
                  getEvaluation(stupro,sub._id,month,school,function(evaluation){
                    var obj = {
                      subject:sub.name,
                      teacher:name,
                      first:evaluation.first,
                      second:evaluation.second
                    }
                    arr.push(obj);
                    if(i == subjects.length-1){
                      cb({arr:arr,info:info});
                    }
                  });
                });
              });
              
            });
          });
        });
      });
    }
  });
 }
function getEvaluation(stupro,subject,month,school,cb){
  evaMgr.getAllEvaluation(school,function(eva){
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
          first.push(obj1);
          if(evaluationS[eva[j]._id]){
            obj2.rating=evaluationF[eva[j]._id];
          }else{
            obj2.rating=null;
          }
          second.push(obj2);
          if(j==eva.length-1){
            cb({first:first,second:second});
          }
        }
      });
    });
  });

 }
module.exports = router;
