var express = require('express');
var router = express.Router();
var CheckMgr = require("../controller/check");
var userHelpers = require("../controller/userHelpers");
var user={};
user.school="57fb8d5606d14d29e32b3c86";

router.get('/all', userHelpers.isLogin ,function(req, res) {
  CheckMgr.getAllCheck(function(check){
    res.send(check);
  });
});

// add new check
router.post('/add', userHelpers.isLogin ,function(req, res) {
  CheckMgr.addCheck(req.body,function(check){
    res.send(check);
  });
});

// add new student's check
router.post('/student', userHelpers.isLogin ,function(req, res) {
  CheckMgr.setStudentCheck(req.body,function(result){
    res.send(result);
  });
});
// get check by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  CheckMgr.getAllCheckStatus(req.params.status,function(check){
    res.send(check);
  });
});
router.get('/student/:id',userHelpers.isLogin , function(req, res) {
  CheckMgr.getAllCheckStudent(req.params.id,function(check){
    res.send(check);
  });
});
router.put('/student/edit/:id', userHelpers.isLogin ,function(req, res) {
  CheckMgr.updateStudentCheck(req.params.id,req.body,function(check){
    res.send(check);
  });
});
// edit check by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  CheckMgr.updateCheck(req.params.id,req.body,function(check){
    res.send(check);
  });
});

router.delete('/student/delete/:id',userHelpers.isLogin , function(req, res) {
  CheckMgr.deleteStudentCheck(req.params.id,function(check){
    res.send({result:check});
  });
});
// delete check by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  CheckMgr.deleteCheck(req.params.id,function(check){
    res.send({result:check});
  });
});
//get all check By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  CheckMgr.getAllChecksBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(check){
    res.send(check);
  });
});

// get all check
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  CheckMgr.getAllCheckCount(req.params.limit,req.params.page,function(check){
    res.send(check);
  });
});

// get check by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  CheckMgr.getCheckId(req.params.id,function(check){
    res.send(check);
  });
});


module.exports = router;
