var express = require('express');
var router = express.Router();
var MessageMgr = require("../controller/message");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin ,function(req, res) {
  MessageMgr.getAllMessage(function(msg){
    res.send(msg);
  });
});

// add new msg
router.post('/add', userHelpers.isLogin ,function(req, res) {
  MessageMgr.addMessage(req.body,function(msg){
    res.send(msg);
  });
  
});
// get msg by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  MessageMgr.getAllMessageStatus(req.params.status,function(msg){
    res.send(msg);
  });
});
// get msg by name
router.get('/name/:name',userHelpers.isLogin , function(req, res) {
  MessageMgr.getMessageName(req.params.name,function(msg){
    res.send(msg);
  });
});
// edit msg by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  MessageMgr.updateMessage(req.params.id,req.body,function(msg){
    res.send(msg);
  });
});

// delete msg by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  MessageMgr.updateMessage(req.params.id,{status:0},function(msg){
    res.send({result:msg});
  });
});
//get all msg By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  MessageMgr.getAllMessagesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(msg){
    res.send(msg);
  });
});

// get all msg
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  MessageMgr.getAllMessageCount(req.params.limit,req.params.page,function(msg){
    res.send(msg);
  });
});

// get msg by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  MessageMgr.getMessageId(req.params.id,function(msg){
    res.send(msg);
  });
});


module.exports = router;
