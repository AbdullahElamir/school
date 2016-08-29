var express = require('express');
var router = express.Router();
var classRoomMgr = require("../controller/classRoom");
var userHelpers = require("../controller/userHelpers");





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
