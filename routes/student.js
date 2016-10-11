var express = require('express');
var router = express.Router();
var studentMgr = require("../controller/student");
var classRoomMgr = require("../controller/classRoom");
var stuproMgr = require("../controller/studentProcess");
var MessageMgr = require("../controller/message");
var parentMsg = require("../controller/parentMsg");
var userHelpers = require("../controller/userHelpers");
var jsreport = require("jsreport");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var path = require("path");



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



router.get('/report2',userHelpers.isLogin , function(req, res) {
  jsreport.render({
    template: {
      engine: "jsrender",
      recipe: "phantom-pdf",
      phantom:{
        format: 'A4',
        orientation: "landscape"
      },
      content: fs.readFileSync(path.join(__dirname, "../views/admin/reports/report2.html"), "utf8")
    },data:{result:null}
  }).then(function(resp) {
    resp.stream.pipe(res);
  }).catch(function(e) {
    res.end(e.message);
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
router.put('/message/:studentId',userHelpers.isLogin,function(req, res) {
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

module.exports = router;
