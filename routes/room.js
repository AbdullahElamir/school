var express = require('express');
var router = express.Router();
var roomMgr = require("../controller/room");
var sysYearMgr = require("../controller/systemYear");
var userHelpers = require("../controller/userHelpers");
var user={};
user.school="5801f550e4de0e349c8714c2";
//get all Rooms By Search Value
router.post('/addY', userHelpers.isLogin ,function(req, res) {
  sysYearMgr.addSystemYear(req.body,function(room){
    res.send(room);
  });
});

router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  roomMgr.getAllRoomsBySearchValue(user.school,req.params.searchValue,req.params.limit,req.params.page,function(rooms){
    res.send(rooms);
  });
});

// get all rooms
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  roomMgr.getAllRoomCount(user.school,req.params.limit,req.params.page,function(room){
    res.send(room);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  roomMgr.getAllRoom(user.school,function(room){
    res.send(room);
  });
});

// add new room
router.post('/add', userHelpers.isLogin ,function(req, res) {
  req.body.school=user.school;
  roomMgr.addRoom(req.body,function(room){
    res.send(room);
  });
  
});

// edit room by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  roomMgr.updateRoom(req.params.id,req.body,function(room){
    res.send(room);
  });
});

// delete room by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  roomMgr.deleteRoom(req.params.id,function(room){
    res.send(room);
  });
});

// get room by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  roomMgr.getRoomId(req.params.id,function(room){
    res.send(room);
  });
});


module.exports = router;
