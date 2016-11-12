var express = require('express');
var router = express.Router();
var CheckMgr = require("../controller/check");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  CheckMgr.getAllCheck(req.user.school,function(check){
    res.send(check);
  });
});

// add new check
router.post('/add', userHelpers.isLogin,userHelpers.isAdmin,function(req, res) {
  req.body.school = req.user.school;
  CheckMgr.addCheck(req.body,function(check){
    res.send(check);
  });
});

// add new student's check
router.post('/student', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  CheckMgr.setStudentCheck(req.body,function(result){
    res.send(result);
  });
});
// get check by status
router.get('/status/:status',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  CheckMgr.getAllCheckStatus(req.params.status,function(check){
    res.send(check);
  });
});
router.get('/student/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  CheckMgr.getAllCheckStudent(req.params.id,function(check){
    res.send(check);
  });
});
router.put('/student/edit/:id', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  CheckMgr.updateStudentCheck(req.params.id,req.body,function(check){
    res.send(check);
  });
});
// edit check by id
router.put('/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  CheckMgr.updateCheck(req.params.id,req.body,function(check){
    res.send(check);
  });
});

router.delete('/student/delete/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  CheckMgr.deleteStudentCheck(req.params.id,function(check){
    res.send({result:check});
  });
});
// delete check by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  CheckMgr.deleteCheck(req.params.id,function(check){
    res.send({result:check});
  });
});
//get all check By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  CheckMgr.getAllChecksBySearchValue(req.user.school,req.params.searchValue,req.params.limit,req.params.page,function(check){
    res.send(check);
  });
});

// get all check
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  CheckMgr.getAllCheckCount(req.user.school,req.params.limit,req.params.page,function(check){
    res.send(check);
  });
});

// get check by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  CheckMgr.getCheckId(req.params.id,function(check){
    res.send(check);
  });
});


module.exports = router;
