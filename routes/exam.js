var express = require('express');
var router = express.Router();
var examMgr = require("../controller/exam");
var userHelpers = require("../controller/userHelpers");
var resultMgr = require("../controller/result");


router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  examMgr.getAllExam(req.user.school,function(exam){
    res.send(exam);
  });
});

// add new  class room
router.post('/add', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  examMgr.addExam(req.body,function(exam){
    res.send(exam);
  });
  
});
router.post('/addR', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  resultMgr.addResult(req.body,function(exam){
    res.send(exam);
  });
});

// edit class room by id
router.put('/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  examMgr.updateExam(req.params.id,req.body,function(exam){
    res.send(exam);
  });
});

// delete room by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  examMgr.updateExam(req.params.id,{status:0},function(exam){
    res.send({result:exam});
  });
});
// get class room by status
router.get('/status/:status',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  examMgr.getAllExamStatus(req.user.school,req.params.status,function(exam){
    res.send(exam);
  });
});
// get class room by name
router.get('/name/:name',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  examMgr.getExamName(req.user.school,req.params.name,function(exam){
    res.send(exam);
  });
});
//get all claas Rooms By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  examMgr.getAllExamesBySearchValue(req.user.school,req.params.searchValue,req.params.limit,req.params.page,function(exams){
    res.send(exams);
  });
});
// get all class rooms
router.get('/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  examMgr.getAllExamCount(req.user.school,req.params.limit,req.params.page,function(exam){
    res.send(exam);
  });
});
// get  class room by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  examMgr.getExamId(req.params.id,function(exam){
    res.send(exam);
  });
});


module.exports = router;
