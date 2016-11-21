var express = require('express');
var router = express.Router();
var OtherMgr = require("../controller/other");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  OtherMgr.getAllOther(req.session.school,function(other){
    res.send(other);
  });
});
// add new student's medical other stuff
router.post('/student', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  OtherMgr.setStudentOther(req.body,function(result){
    res.send(result);
  });
});

// add new other
router.post('/add', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  req.body.school = req.session.school;
  OtherMgr.addOther(req.body,function(other){
    res.send(other);
  });
});
// get other by status
router.get('/status/:status',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  OtherMgr.getAllOtherStatus(req.params.status,function(other){
    res.send(other);
  });
});
router.get('/student/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  OtherMgr.getAllOtherStudent(req.params.id,function(other){
    res.send(other);
  });
});
router.put('/student/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  OtherMgr.updateStudentOther(req.params.id,req.body,function(other){
    res.send(other);
  });
});
// edit other by id
router.put('/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  OtherMgr.updateOther(req.params.id,req.body,function(other){
    res.send(other);
  });
});

router.delete('/student/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  OtherMgr.deleteStudentOther(req.params.id,function(other){
    res.send({result:other});
  });
});
// delete other by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  OtherMgr.deleteOther(req.params.id,function(other){
    res.send({result:other});
  });
});
//get all other By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  OtherMgr.getAllOthersBySearchValue(req.session.school,req.params.searchValue,req.params.limit,req.params.page,function(other){
    res.send(other);
  });
});

// get all other
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  OtherMgr.getAllOtherCount(req.session.school,req.params.limit,req.params.page,function(other){
    res.send(other);
  });
});

// get other by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  OtherMgr.getOtherId(req.params.id,function(other){
    res.send(other);
  });
});


module.exports = router;
