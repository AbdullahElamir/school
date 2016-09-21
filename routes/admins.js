var express = require('express');
var router = express.Router();
var adminMgr = require("../controller/admin");
var userHelpers = require("../controller/userHelpers");


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

/* Edit admin by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  adminMgr.updateAdmin(req.params.id,req.body,function(admins){
    res.send(admins);
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
