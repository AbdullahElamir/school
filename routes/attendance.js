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

//use this to change the value of attend from StuPro
router.put('/stupro/:stupro/:attend', userHelpers.isLogin ,function(req, res) {
  res.send(true);
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
    console.log(req.params.date);
    attendMgr.getAttendanceDate(new Date(req.params.date),stupro,function(attend){
      console.log(attend);
      res.send([
    {_id:745645645,name:"abdo",attend:1},
    {_id:845613541,name:"taha",attend:0},
    {_id:754874856,name:"salem",attend:1},
    {_id:812674577,name:"hitam",attend:0}
  ]);
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
