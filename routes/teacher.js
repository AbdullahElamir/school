var express = require('express');
var router = express.Router();
var teacherMgr = require("../controller/teacher");
var userHelpers = require("../controller/userHelpers");

/* GET all teacher */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  teacherMgr.getAllTeacherCount(req.params.limit,req.params.page,function(teacher){
    res.send(teacher);
  });
});
router.get('/all', userHelpers.isLogin ,function(req, res) {
  teacherMgr.getAllTeacher(function(teacher){
    res.send(teacher);
  });
});

/* Add new teacher  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  teacherMgr.addTeacher(req.body,function(teacher){
    res.send(teacher);
  });
  
});

/* Edit teacher by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  teacherMgr.updateTeacher(req.params.id,req.body,function(teacher){
    res.send(teacher);
  });
});
/* Delete teacher by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  teacherMgr.deleteTeacher(req.params.id,function(teacher){
    res.send({result:teacher});
  });
});

/* GET teacher by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  teacherMgr.getTeacherId(req.params.id,function(teacher){
    res.send(teacher);
  });
});


module.exports = router;
