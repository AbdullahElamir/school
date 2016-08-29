var express = require('express');
var router = express.Router();
var attendMgr = require("../controller/attendance");
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

// get attend by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  attendMgr.getAttendanceId(req.params.id,function(attend){
    res.send(attend);
  });
});


module.exports = router;
