var express = require('express');
var router = express.Router();
var parentMgr = require("../controller/parent");
var userHelpers = require("../controller/userHelpers");

/* GET all parent */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  parentMgr.getAllParentCount(req.params.limit,req.params.page,function(parents){
    res.send(parents);
  });
});
router.get('/all', userHelpers.isLogin ,function(req, res) {
  parentMgr.getAllParent(function(parents){
    res.send(parents);
  });
});

/* Add new parent  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  parentMgr.addParent(req.body,function(parents){
    res.send(parents);
  });
  
});

/* Edit parent by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  parentMgr.updateParent(req.params.id,req.body,function(parents){
    res.send(parents);
  });
});

/* Delete parent by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  parentMgr.deleteTeacher(req.params.id,function(parents){
    res.send({result:parents});
  });
});

/* GET parent by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  parentMgr.getParentId(req.params.id,function(parents){
    res.send(parents);
  });
});


module.exports = router;
