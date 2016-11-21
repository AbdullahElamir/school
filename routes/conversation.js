var express = require('express');
var router = express.Router();
var conversationMgr = require("../controller/conversation");
var userHelpers = require("../controller/userHelpers");

router.get('/conversations/admin', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getAllConversationsByUserIDAndType(req.user._id,"ADMIN",function(conversations){
    res.send(conversations);
  });
});

router.get('/conversations/teacher', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getAllConversationsByUserIDAndType(req.user._id,"TEACHER",function(conversations){
    res.send(conversations);
  });
});

router.post('/message/add/in/conversation/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.addMessageInConversation(req.params.id,req.body.message,{id:req.user._id,type:req.body.type},function(send){
    res.send(send);
  });
});

router.get('/conversation/messagesCount/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getMessagesCountInConversation(req.params.id,function(count){
    res.send(count);
  });
});

router.get('/conversation/messages/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getMessagesByConversationId(req.params.id,function(messages){
    res.send(messages);
  });
});

router.put('/message/seen/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.setSeenAllMessagesInConversation(req.params.id,req.body.type,function(send){
    res.send(send);
  });
});



module.exports = router;