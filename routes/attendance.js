var express = require('express');
var router = express.Router();
var attendMgr = require("../controller/attendance");
var stuproMgr = require("../controller/studentProcess");
var userHelpers = require("../controller/userHelpers");






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

//use this to change the value of attend from StuPro
router.put('/stupro/:stupro/:attend/:date', userHelpers.isLogin ,function(req, res) {
  attendMgr.setAttendance(req.params.stupro,req.params.attend,req.params.date,function(result){
    res.send(result);
  });
});

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
// get attend by date and classRoom
router.get('/students/:classRoom/:date',userHelpers.isLogin , function(req, res) {
  // get real data _id  id is the id of the stuPro to let you make edits
  stuproMgr.getStudentClassRoom(req.params.classRoom,function(stupro){
    attendMgr.getAttendanceDate(new Date(req.params.date),stupro.StuP,function(attends){
      var _attend=[];
      for(i in stupro.stu){
        var att = {
          _id:stupro.stu[i]._id,
          name:stupro.stu[i].student.name,
        }
        if(attends[stupro.stu[i]._id]==null){
          att.attend=0;
        }else{
          att.attend=attends[stupro.stu[i]._id];
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
