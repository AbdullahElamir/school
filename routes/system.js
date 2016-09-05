var express = require('express');
var router = express.Router();
var systemMgr = require("../controller/system");
var userHelpers = require("../controller/userHelpers");

// GET all systems
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  systemMgr.getAllSystemCount(req.params.limit,req.params.page,function(system){
    res.send(system);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  systemMgr.getAllSystem(function(system){
    res.send(system);
  });
});

// Add new system
router.post('/add', userHelpers.isLogin ,function(req, res) {
  systemMgr.addSystem(req.body,function(system){
    res.send(system);
  });
  
});

// Edit system by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
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