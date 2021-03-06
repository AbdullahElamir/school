var express = require('express');
var router = express.Router();
var subjectMgr = require("../controller/subject");
var userHelpers = require("../controller/userHelpers");


/*GET all Subjects By Search Value And Class*/
router.get('/:searchValue/:clas/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  subjectMgr.getSubjectsBySearchValueAndClass(req.session.school,req.params.searchValue,req.params.clas,req.params.limit,req.params.page,function(subject){
    res.send(subject);
  });
});

// GET all subject
router.get('/:clas/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  subjectMgr.getSubjectsBySearchValueAndClass(req.session.school,"",req.params.clas,req.params.limit,req.params.page,function(subject){
    res.send(subject);
  });
});

// GET subjects by class
router.get('/class/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  subjectMgr.getSubjectsByClass(req.params.id,function(subject){
    res.send(subject);
  });
});

// GET all subject
router.get('/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  subjectMgr.getAllSubjectCount(req.session.school,req.params.limit,req.params.page,function(subject){
    res.send(subject);
  });
});

router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  subjectMgr.getAllSubject(req.session.school,function(subject){
    res.send(subject);
  });
});

// Add new subject
router.post('/add',userHelpers.isAdmin, userHelpers.isLogin ,function(req, res) {
  req.body.school=req.session.school;
  subjectMgr.addSubject(req.body,function(subject){
    res.send(subject);
  });
  
});

// Edit subject by id
router.put('/edit/:id',userHelpers.isAdmin, userHelpers.isLogin ,function(req, res) {
  subjectMgr.updateSubject(req.params.id,req.body,function(subject){
    res.send(subject);
  });
});

// Delete subject by id
router.delete('/delete/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  subjectMgr.deleteSubject(req.params.id,function(subject){
    res.send({result:subject});
  });
});

// GET subject by ID
router.get('/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  subjectMgr.getSubjectId(req.params.id,function(subject){
    res.send(subject);
  });
});


module.exports = router;
