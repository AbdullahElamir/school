var express = require('express');
var router = express.Router();
var adminMgr = require("../controller/admin");
var userHelpers = require("../controller/userHelpers");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var path = require("path");
var user={};
    user.school="5801f550e4de0e349c8714c2";


/*GET all ADmins By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  adminMgr.getAllAdminsBySearchValue(user.school,req.params.searchValue,req.params.limit,req.params.page,function(admins){
    res.send(admins);
  });
});

/* GET all admin */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  adminMgr.getAllAdminCount(user.school,req.params.limit,req.params.page,function(admins){
    res.send(admins);
  });
});
router.get('/all', userHelpers.isLogin ,function(req, res) {
  adminMgr.getAllAdmin(user.school,function(admins){
    res.send(admins);
  });
});
router.get('/getuser',userHelpers.isLogin , function(req, res) {
  if(user.school){
    res.send(true);
  }else{
    res.send(false);
  }
});
/* Add new admin  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  req.body.school=user.school;
  adminMgr.addAdmin(req.body,function(admins){
    res.send(admins);
  });

});
router.post('/upload/:id',userHelpers.isLogin, multipartMiddleware, function(req, res) {
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

/* Edit admin by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  adminMgr.updateAdmin(req.params.id,req.body,function(admins){
    res.send(admins);
  });
});
/* Edit admin by id  */
router.put('/changePass/:id', userHelpers.isLogin ,function(req, res) {
  adminMgr.changePass(req.params.id,req.body,function(result){
    res.send({result:result});
  });
});

/* Delete admin by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  adminMgr.deleteAdmin(req.params.id,function(admins){
    res.send({result:admins});
  });
});

/* GET admin by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  adminMgr.getAdminId(req.params.id,function(admins){
    res.send(admins);
  });
});


module.exports = router;
