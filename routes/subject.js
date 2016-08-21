var express = require('express');
var router = express.Router();
var subjectMgr = require("../controller/subject");
var userHelpers = require("../controller/userHelpers");

// GET all subject
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  subjectMgr.getAllSubjectCount(req.params.limit,req.params.page,function(subject){
    res.send(subject);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  subjectMgr.getAllSubject(function(subject){
    res.send(subject);
  });
});

// Add new subject
router.post('/add', userHelpers.isLogin ,function(req, res) {
  subjectMgr.addSubject(req.body,function(subject){
    res.send(subject);
  });
  
});

// Edit subject by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  subjectMgr.updateSubject(req.params.id,req.body,function(subject){
    res.send(subject);
  });
});

// Delete subject by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  subjectMgr.deleteSubject(req.params.id,function(subject){
    res.send({result:subject});
  });
});

// GET subject by ID
router.get('/:id',userHelpers.isLogin , function(req, res) {
  subjectMgr.getSubjectId(req.params.id,function(subject){
    res.send(subject);
  });
});


module.exports = router;