var express = require('express');
var router = express.Router();
var studentMgr = require("../controller/student");
var userHelpers = require("../controller/userHelpers");

/* GET all student */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  studentMgr.getAllStudentsCount(req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});
router.get('/all', userHelpers.isLogin ,function(req, res) {
  studentMgr.getAllStudent(function(student){
    res.send(student);
  });
});

/* Add new student  */
router.post('/add',function(req, res) {
  console.log(req.body);
  studentMgr.addStudent(req.body,function(student){
    res.send(student);
  });
  
});

/* Edit student by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  studentMgr.updateStudent(req.params.id,req.body,function(student){
    res.send(student);
  });
});
/* Delete student by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  studentMgr.deleteStudent(req.params.id,function(student){
    res.send({result:student});
  });
});

/* GET student by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  studentMgr.getStudentId(req.params.id,function(student){
    res.send(student);
  });
});


module.exports = router;
