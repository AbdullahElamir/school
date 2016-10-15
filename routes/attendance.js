var express = require('express');
var router = express.Router();
var attendMgr = require("../controller/attendance");
var attendTeaMgr = require("../controller/teacherAttendance");
var attendAdminMgr = require("../controller/adminAttendance");
var stuproMgr = require("../controller/studentProcess");
var teacherMgr = require("../controller/teacher");
var adminMgr = require("../controller/admin");
var userHelpers = require("../controller/userHelpers");
var user={};
    user.school="57fb8d5606d14d29e32b3c86";





router.get('/all', userHelpers.isLogin ,function(req, res) {
  attendMgr.getAllAttend(function(attend){
    res.send(attend);
  });
});

// add new attend
router.post('/add', userHelpers.isLogin ,function(req, res) {
  attendMgr.addAttendance(req.body,function(attend){
    res.send(attend);
  });

});

// edit attend by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  attendMgr.updateAttendance(req.params.id,req.body,function(attend){
    res.send(attend);
  });
});

//use this to change the value of reason
router.put('/reason/:stupro/:date', userHelpers.isLogin ,function(req, res) {
  attendMgr.setReason(req.params.stupro,req.body,req.params.date,function(result){
    res.send(result);
  });
});

//##################################################
router.put('/teacher/reason/:id/:date', userHelpers.isLogin ,function(req, res) {
  attendTeaMgr.setReason(req.params.id,req.body,req.params.date,function(result){
    res.send(result);
  });
  
});

router.put('/admin/reason/:id/:date', userHelpers.isLogin ,function(req, res) {
  res.send(true);
});
//##################################################

//use this to change the value of attend from StuPro
router.put('/stupro/:stupro/:attend/:date', userHelpers.isLogin ,function(req, res) {
  attendMgr.setAttendance(req.params.stupro,req.params.attend,req.params.date,function(result){
    res.send(result);
  });
});

//################################################
router.put('/teacher/:id/:attend/:date', userHelpers.isLogin ,function(req, res) {
  attendTeaMgr.setTeacherAttendance(req.params.id,req.params.attend,req.params.date,function(result){
    res.send(result);
  });
});
router.put('/admin/:id/:attend/:date', userHelpers.isLogin ,function(req, res) {
  res.send(true);
});
//################################################

// delete attend by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  attendMgr.updateAttendance(req.params.id,{status:0},function(attend){
    res.send({result:attend});
  });
});
// get all attend
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  attendMgr.getAllAttendanceCount(req.params.limit,req.params.page,function(attend){
    res.send(attend);
  });
});
// get attend by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  attendMgr.getAllAttendanceStatus(req.params.status,function(attend){
    res.send(attend);
  });
});

//################################################
router.get('/teachers/:searchValue/:date/:limit/:page',userHelpers.isLogin , function(req, res) {
  teacherMgr.getTeachersBySearchValue(user.school,req.params.searchValue,req.params.limit,req.params.page,function(teachers){
    attendTeaMgr.getTeacherAttendanceDate(new Date(req.params.date),teachers.teachersId,function(attends){
      var _attend=[];
      if(teachers.result.length==0){
        res.send(_attend);
      }
      for(var i in teachers.result){
        var att = {
          _id:teachers.result[i]._id,
          name:teachers.result[i].name,
        }
        if(attends[teachers.result[i]._id]==null){
          att.attend=0;
        }else{
          att.attend=attends[teachers.result[i]._id].attend;
          att.reason=attends[teachers.result[i]._id].reson;
        }
        _attend.push(att);
        if(i == teachers.result.length-1){
          res.send({result:_attend,count:teachers.count});
        }
      }
    });
  });
});
router.get('/teachers//:date/:limit/:page',userHelpers.isLogin , function(req, res) {
  teacherMgr.getTeachersBySearchValue(user.school,'',req.params.limit,req.params.page,function(teachers){
    attendTeaMgr.getTeacherAttendanceDate(new Date(req.params.date),teachers.teachersId,function(attends){
      var _attend=[];
      if(teachers.result.length==0){
        res.send(_attend);
      }
      for(var i in teachers.result){
        var att = {
          _id:teachers.result[i]._id,
          name:teachers.result[i].name,
        }
        if(attends[teachers.result[i]._id]==null){
          att.attend=0;
        }else{
          att.attend=attends[teachers.result[i]._id].attend;
          att.reason=attends[teachers.result[i]._id].reson;
        }
        _attend.push(att);
        if(i == teachers.result.length-1){
          res.send({result:_attend,count:teachers.count});
        }
      }
    });
  });
  // res.send({
  //   result:[
  //     {_id:1234,name:"ahmed",attend:1,reason:""},
  //     {_id:1224,name:"mohammed",attend:1,reason:""},
  //     {_id:1254,name:"salem",attend:1,reason:""},
  //     {_id:1274,name:"abdo",attend:0,reason:"بلا سبب"}
  //   ],
  //   count:4
  // });
});

router.get('/admins/:searchValue/:date/:limit/:page',userHelpers.isLogin , function(req, res) {
  adminMgr.getAllAdminsBySearchValue(user.school,req.params.searchValue,req.params.limit,req.params.page,function(admins){
    attendAdminMgr.getAdminAttendanceDate(new Date(req.params.date),admins.adminsId,function(attends){
      var _attend=[];
      if(teachers.result.length==0){
        res.send(_attend);
      }
      for(var i in teachers.result){
        var att = {
          _id:teachers.result[i]._id,
          name:teachers.result[i].name,
        }
        if(attends[teachers.result[i]._id]==null){
          att.attend=0;
        }else{
          att.attend=attends[teachers.result[i]._id].attend;
          att.reason=attends[teachers.result[i]._id].reson;
        }
        _attend.push(att);
        if(i == teachers.result.length-1){
          res.send({result:_attend,count:teachers.count});
        }
      }
    });
  });

  // res.send({
  //   result:[
  //     {_id:1234,name:"ahmed",attend:1,reason:""},
  //     {_id:1224,name:"mohammed",attend:1,reason:""},
  //     {_id:1254,name:"salem",attend:1,reason:""},
  //     {_id:1274,name:"abdo",attend:0,reason:"بلا سبب"}
  //   ],
  //   count:3
  // });
});
router.get('/admins//:date/:limit/:page',userHelpers.isLogin , function(req, res) {
  adminMgr.getAllAdminsBySearchValue(user.school,'',req.params.limit,req.params.page,function(admins){
    attendAdminMgr.getAdminAttendanceDate(new Date(req.params.date),admins.adminsId,function(attends){
      var _attend=[];
      if(teachers.result.length==0){
        res.send(_attend);
      }
      for(var i in teachers.result){
        var att = {
          _id:teachers.result[i]._id,
          name:teachers.result[i].name,
        }
        if(attends[teachers.result[i]._id]==null){
          att.attend=0;
        }else{
          att.attend=attends[teachers.result[i]._id].attend;
          att.reason=attends[teachers.result[i]._id].reson;
        }
        _attend.push(att);
        if(i == teachers.result.length-1){
          res.send({result:_attend,count:teachers.count});
        }
      }
    });
  });
});
//#########################################


// get attend by date and classRoom
router.get('/students/:classRoom/:date',userHelpers.isLogin , function(req, res) {
  // get real data _id  id is the id of the stuPro to let you make edits
  stuproMgr.getStudentClassRoom(req.params.classRoom,function(stupro){
    attendMgr.getAttendanceDate(new Date(req.params.date),stupro.StuP,function(attends){
      var _attend=[];
      for(var i in stupro.stu){
        var att = {
          _id:stupro.stu[i]._id,
          name:stupro.stu[i].student.name,
        }
        if(attends[stupro.stu[i]._id]==null){
          att.attend=0;
        }else{
          att.attend=attends[stupro.stu[i]._id].attend;
          att.reason=attends[stupro.stu[i]._id].reson;
        }
        _attend.push(att);
        if(i == stupro.stu.length-1){
          res.send(_attend);
        }
      }
    });
  });

});

// get attend by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  attendMgr.getAttendanceId(req.params.id,function(attend){
    res.send(attend);
  });
});


module.exports = router;
