var express = require('express');
var router = express.Router();
var conversationMgr = require("../controller/conversation");
var userHelpers = require("../controller/userHelpers");

router.get('/conversations/parent/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getAllConversationsByParentID(req.params.id,function(conversations){
    res.send(conversations);
  });
});

router.get('/conversation/messagesCount/:id', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getMessagesCountInConversation(req.params.id,function(count){
    res.send(count);
  });
});

module.exports = router;