var express = require('express');
var router = express.Router();
var adminMgr = require("../controller/admin");
var userHelpers = require("../controller/userHelpers");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");

router.get('/all', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  adminMgr.getAllAdmin(req.user.school,function(admins){
    res.send(admins);
  });
});
router.get('/getuser',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  if(req.user.school){
    res.send(true);
  }else{
    res.send(false);
  }
});
/* Add new admin  */
router.post('/add', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  req.body.school=req.user.school;
  adminMgr.addAdmin(req.body,function(admins){
    res.send(admins);
  });
});

router.post('/upload/:id',userHelpers.isLogin,userHelpers.isAdmin, multipartMiddleware, function(req, res) {
  var dir = './public/img/admins';
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

router.get('/addAdmin/:email/:pass',function(req, res) {
  body= {email:req.params.email,password:req.params.pass,level:1};
  adminMgr.addAdmin(body,function(admins){
    res.send(admins);
  });
});

/* Edit admin by id On session */
router.put('/edit/session', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  adminMgr.updateAdmin(req.user._id,req.body,function(admins){
    res.send(admins);
  });
});

/* Edit admin by id  */
router.put('/edit/:id', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  adminMgr.updateAdmin(req.params.id,req.body,function(admins){
    res.send(admins);
  });
});

router.put('/changePass/session', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  adminMgr.changePass(req.user._id,req.body,function(result){
    res.send({result:result});
  });
});

router.put('/changePass/:id', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  adminMgr.changePass(req.params.id,req.body,function(result){
    res.send({result:result});
  });
});

/* Delete admin by id  */
router.delete('/delete/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  adminMgr.deleteAdmin(req.params.id,function(admins){
    res.send({result:admins});
  });
});

/* GET admin by ID on Session */
router.get('/session',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  adminMgr.getAdminId(req.user._id,function(admins){
    res.send(admins);
  });
});

/* GET admin by ID  */
router.get('/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  adminMgr.getAdminId(req.params.id,function(admins){
    res.send(admins);
  });
});

/*GET all ADmins By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  adminMgr.getAllAdminsBySearchValue(req.user.school,req.params.searchValue,req.params.limit,req.params.page,function(admins){
    res.send(admins);
  });
});

/* GET all admin */
router.get('/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  adminMgr.getAllAdminCount(req.user.school,req.params.limit,req.params.page,function(admins){
    res.send(admins);
  });
});


module.exports = router;