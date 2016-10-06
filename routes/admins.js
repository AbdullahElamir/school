var express = require('express');
var router = express.Router();
var adminMgr = require("../controller/admin");
var userHelpers = require("../controller/userHelpers");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


/*GET all ADmins By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  adminMgr.getAllAdminsBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(admins){
    res.send(admins);
  });
});

/* GET all admin */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  adminMgr.getAllAdminCount(req.params.limit,req.params.page,function(admins){
    res.send(admins);
  });
});
router.get('/all', userHelpers.isLogin ,function(req, res) {
  adminMgr.getAllAdmin(function(admins){
    res.send(admins);
  });
});

/* Add new admin  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  adminMgr.addAdmin(req.body,function(admins){
    res.send(admins);
  });

});
router.post('/upload/:id',userHelpers.isLogin, multipartMiddleware, function(req, res) {
  console.log(req.files.file);
  //save image to public/img/admins with a name of "admin's id" without extention
  // don't forget to delete all req.files when done
  res.send(true);
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
