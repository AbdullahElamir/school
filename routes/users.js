var express = require('express');
var router = express.Router();
var adminMgr = require("../controller/admin");
var userHelpers = require("../controller/userHelpers");
var user={};
    user.school="57fb8d5606d14d29e32b3c86";

router.get('/all', userHelpers.isLogin ,function(req, res) {
  adminMgr.getAllAdmin(function(admins){
    res.send(admins);
  });
});

/* Add new admins  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  adminMgr.addAdmin(req.body,function(admins){
    res.send(admins);
  });
  
});

/* Edit admins by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  adminMgr.updateAdmin(req.params.id,req.body,function(admins){
    res.send(admins);
  });
});
/* Delete admins by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  adminMgr.updateAdmin(req.params.id,{status:0},function(admins){
    res.send({result:admins});
  });
});


/*GET all adminss By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  adminMgr.getAdminsBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

/* GET all admins */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  adminMgr.getAllAdminCount(req.params.limit,req.params.page,function(admins){
    res.send(admins);
  });
});
/* GET admins by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  adminMgr.getAdminId(req.params.id,function(admins){
    res.send(admins);
  });
});

module.exports = router;
