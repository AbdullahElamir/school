var express = require('express');
var router = express.Router();
var marksSubMgr = require("../controller/marksSubject");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  marksSubMgr.getAllMarksSub(req.session.school,function(marksSub){
    res.send(marksSub);
  });
});

// add new   marksSub
router.post('/add', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  marksSubMgr.addMarksSub(req.body,function(marksSub){
    res.send(marksSub);
  });
  
});

// edit marksSub by id
router.put('/edit/:id', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  marksSubMgr.updateMarksSub(req.params.id,req.body,function(marksSub){
    res.send(marksSub);
  });
});
router.put('/markexam/:exam', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  marksSubMgr.getMarksSubExam(req.session.school,req.params.exam,function(marksSub){
    res.send(marksSub);
  });
});
router.put('/marksub/:subject', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  marksSubMgr.getMarksSubSubject(req.session.school,req.params.subject,function(marksSub){
    res.send(marksSub);
  });
});
router.put('/marksubexam/:exam/:subject/:semester', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  marksSubMgr.getMarksSubExamSubject(req.session.school,req.params.exam,req.params.subject,req.params.semester,function(marksSub){
    res.send(marksSub);
  });
});
// delete marksSub by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  marksSubMgr.updateMarksSub(req.params.id,{status:0},function(marksSub){
    res.send({result:marksSub});
  });
});
// get marksSub by status
router.get('/status/:status',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  marksSubMgr.getAllMarksSubStatus(req.session.school,req.params.status,function(marksSub){
    res.send(marksSub);
  });
});

//get all marksSub By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  marksSubMgr.getAllMarksSubesBySearchValue(req.session.school,req.params.searchValue,req.params.limit,req.params.page,function(marksSubs){
    res.send(marksSubs);
  });
});
// get all marksSub
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  marksSubMgr.getAllMarksSubCount(req.params.limit,req.params.page,function(marksSub){
    res.send(marksSub);
  });
});
// get  marksSub by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  marksSubMgr.getMarksSubId(req.params.id,function(marksSub){
    res.send(marksSub);
  });
});


module.exports = router;
