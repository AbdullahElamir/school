var express = require('express');
var router = express.Router();
var systemMgr = require("../controller/system");
var userHelpers = require("../controller/userHelpers");
var user={};
user.school="5801f550e4de0e349c8714c2";

// edit system setting
router.put('/data/edit', userHelpers.isLogin ,function(req, res) {
  systemMgr.updateSystemSetting(req.body,function(system){
    res.send(system);
  });
});

// Add new system setting
router.post('/data/add', userHelpers.isLogin ,function(req, res) {
  systemMgr.addNewSystemSetting(req.body,function(system){
    res.send(system);
  });
});

// GET Classes And ClassRooms by System ID
router.get('/data/:id/:year',userHelpers.isLogin , function(req, res) {
  systemMgr.getClassesAndClassRoomsBySystem(req.params.id,req.params.year,function(data){
    res.send(data);
  });
});

// GET all systems
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  systemMgr.getAllSystemCount(user.school,req.params.limit,req.params.page,function(system){
    res.send(system);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  systemMgr.getAllSystem(user.school,function(system){
    res.send(system);
  });
});

// Add new system
router.post('/add', userHelpers.isLogin ,function(req, res) {
  req.body.school=user.school;
  systemMgr.addSystem(req.body,function(system){
    res.send(system);
  });
});

// Edit system by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  req.body.school=user.school;
  systemMgr.updateSystem(req.params.id,req.body,function(system){
    res.send(system);
  });
});

// Delete system by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  systemMgr.deleteSystem(req.params.id,function(system){
    res.send({result:system});
  });
});

// GET system by ID
router.get('/:id',userHelpers.isLogin , function(req, res) {
  systemMgr.getSystemId(req.params.id,function(system){
    res.send(system);
  });
});

module.exports = router;
