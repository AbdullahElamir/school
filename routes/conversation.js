var express = require('express');
var router = express.Router();
var conversationMgr = require("../controller/conversation");
var userHelpers = require("../controller/userHelpers");

router.get('/conversations/admin/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getAllConversationsByUserIDAndType(req.params.id,"ADMIN",function(conversations){
    res.send(conversations);
  });
});

router.get('/conversations/teacher/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getAllConversationsByUserIDAndType(req.params.id,"TEACHER",function(conversations){
    res.send(conversations);
  });
});

router.get('/conversations/parent/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getAllConversationsByUserIDAndType(req.params.id,"PARENT",function(conversations){
    res.send(conversations);
  });
});

router.post('/message/add/in/conversation/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.addMessageInConversation(req.params.id,req.body.message,req.body.from,function(send){
    res.send(send);
  });
});

router.get('/conversation/messagesCount/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getMessagesCountInConversation(req.params.id,function(count){
    res.send(count);
  });
});

module.exports = router;