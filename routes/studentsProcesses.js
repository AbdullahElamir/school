var express = require('express');
var router = express.Router();
var userHelpers = require("../controller/userHelpers");
var stuproMgr = require("../controller/studentProcess");

//get student information
router.get('/stuPro', userHelpers.isLogin ,function(req, res) {
  var info = [{
    "name":"mohammed",
    "description":"tripoli",
    "id":"1"
  }];
  res.send(info);
  
});

// update grades of exams student in subject on classRoom
router.put('/grades/edit/:idStudent/:subjectId/:classRoomId', userHelpers.isLogin ,function(req, res) {
  
  res.send(true);
});

// get grades of exams for student in subject on classRoom
router.get('/grades/:idStudent/:subjectId/:classRoomId', userHelpers.isLogin ,function(req, res) {
  //console.log(req.params.idStudent);
  //console.log(req.params.subjectId);
  //console.log(req.params.classRoomId);
  
  var examsGrades = [
    {
      _id : "6a5s1d" ,
      name : "إمتحان شهر 5" ,
      mark : 30 ,
      studentMark : 14,
      type : 1 ,
      semester : 2          
    },{
      _id : "6as54ddf" ,
      name : "إمتحان شهر 4" ,
      mark : 30 ,
      studentMark : 26.5,
      type : 1 ,
      semester : 2          
    },{
      _id : "spokdf" ,
      name : "إمتحان شهر 1" ,
      mark : 30 ,
      studentMark : 10,
      type : 1 ,
      semester : 1
    },{
      _id : "8rt465g" ,
      name : "إمتحان النصفي الثاني" ,
      mark : 40 ,
      studentMark : 24,
      type : 3 ,
      semester : 2
    },{
      _id : "pkasda" ,
      name : "إمتحان شهر 2" ,
      mark : 30 ,
      studentMark : 10,
      type : 1 ,
      semester : 1          
    },{
      _id : "6235dfdh" ,
      name : "إمتحان شهر 3" ,
      mark : 30 ,
      studentMark : 15,
      type : 1 ,
      semester : 2
    },{
      _id : "2l3ijs68" ,
      name : "متوسط شهر 3 و 4 و 5" ,
      mark : 30 ,
      studentMark : 0,
      type : 2 ,
      semester : 2
    },{
      _id : "68a4s5dr" ,
      name : "متوسط شهر 1 و 2" ,
      mark : 30 ,
      studentMark : 0,
      type : 2 ,
      semester : 1 
    },{
      _id : "68234d1" ,
      name : "إمتحان النصفي الأول" ,
      mark : 40 ,
      studentMark : 33,
      type : 3 ,
      semester : 1          
    }
  ];
  res.send(examsGrades);
});

// get students By subject Id and class room Id for a current year (where year is Active)
router.get('/studInfo/:subjectId/:classRoomId', userHelpers.isLogin ,function(req, res) {
  //console.log(req.params.subjectId);
  //console.log(req.params.classRoomId);
  stuproMgr.getStudentClassRoom(req.params.classRoomId,function(Crooms){
    var _room=[];
    for (i in Crooms.stu){
      _room.push(Crooms.stu[i].student);
      if(i == Crooms.stu.length-1){
        res.send(_room);
      }
    }
  });
 //  var info = [{
 //        _id : "z5456a1sd",
 //        name : "علي أحمد محمد جمال"
 //      },
 //      {
 //        _id : "77s6a1sd",
 //        name : "رضوان خليفة علي عبد الرحمن" 
 //      },
 //      {
 //        _id : "pp5oew1sd",
 //        name : "رامي عبد السلام عبد الله" 
 //      },
 //      {
 //        _id : "mjkjmwrrp",
 //        name : "فاطمة علي محمد سالم" 
 //      }
 //  ];
  // res.send(info);
});


router.post('/add', userHelpers.isLogin ,function(req, res) {
  stuproMgr.addStupro(req.body,function(Stupro){
    res.send(Stupro);
  });
  
});
module.exports = router;