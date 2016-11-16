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

// Mobile App Router :

router.get('/get/messages/count/:parentId', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getMessagesCount(req.params.parentId,function(count){
    res.send(count);
  });
});

router.get('/get/new/messages/:conversationID/:startFrom', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getNewMessages(req.params.conversationID,req.params.startFrom,function(messages){
    res.send(messages);
  });
});

router.get('/get/conversations/count/:parentId', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getConversationsCount(req.params.parentId,function(count){
    res.send(count);
  });
});

router.get('/get/seen/messages/count/in/conversaton/:conversationID', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getSeenMessagesCountInConversaton(req.params.conversationID,function(count){
    res.send(count);
  });
});

router.get('/get/seen/messages/by/staff/:conversationID', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getSeenMessagesByStaff(req.params.conversationID,function(msgIDs){
    res.send(msgIDs);
  });
});

router.post('/send/seen/requests/by/parent', userHelpers.isLogin ,function(req, res) {
  conversationMgr.sendSeenRequestsByParent(req.body,function(send){
    res.send(send);
  });
});

router.post('/get/new/conversations/:parentID', userHelpers.isLogin ,function(req, res) {
  conversationMgr.getNewConversations(req.body,function(newConversations){
    res.send(newConversations);
  });
});

router.put('/send/message/:conversationID', userHelpers.isLogin ,function(req, res) {
  conversationMgr.addMessageInConversation(req.params.conversationID,req.body.text,{id:req.body.from.id,type:"PARENT"},function(send){
    res.send(send);
  });
});

module.exports = router;