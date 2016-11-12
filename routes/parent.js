var express = require('express');
var router = express.Router();
var parentMgr = require("../controller/parent");
var conversationMgr = require("../controller/conversation");
var userHelpers = require("../controller/userHelpers");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");

// var path = require("path");

/*GET all Student By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  parentMgr.getAllParentsBySearchValue(req.user.school,req.params.searchValue,req.params.limit,req.params.page,function(parents){
    res.send(parents);
  });
});

/* Send Message From Admin to Parent by parentID */
router.put('/message/:parentId',userHelpers.isLogin,userHelpers.isAdmin,function(req, res) {
  conversationMgr.sendMsgFromPersonToPersonWithStudents(req.body.children,req.user._id,"ADMIN",req.params.parentId,"PARENT",req.body.message,function(send){
    res.send(send);
  });
});

/* GET all parent */
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  parentMgr.getAllParentCount(req.user.school,req.params.limit,req.params.page,function(parents){
    res.send(parents);
  });
});

router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  parentMgr.getAllParent(req.user.school,function(parents){
    res.send(parents);
  });
});

/* Add new parent  */
router.post('/add', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  req.body.school=req.user.school;
  parentMgr.addParent(req.body,function(parents){
    res.send(parents);
  });

});

router.post('/upload/:id',userHelpers.isLogin,userHelpers.isAdmin, multipartMiddleware, function(req, res) {
  var dir = './public/img/parents';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.readFile(req.files.file.path, function (err, data) {
    var newPath =dir+'/'+req.params.id;
    fs.writeFile(newPath, data, function (err) {
      if(!err){  
        res.send(true);       
      }
       
    });
  });
});

/* Edit parent by id  */
router.put('/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  parentMgr.updateParent(req.params.id,req.body,function(parents){
    res.send(parents);
  });
});

/* Delete parent by id  */
router.delete('/delete/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  parentMgr.deleteParent(req.params.id,function(parents){
    res.send({result:parents});
  });
});

/* GET parent by ID  */
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  parentMgr.getParentId(req.params.id,function(parents){
    res.send(parents);
  });
});


module.exports = router;
