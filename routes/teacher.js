var express = require('express');
var router = express.Router();
var teacherMgr = require("../controller/teacher");
var userHelpers = require("../controller/userHelpers");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/*GET all Teachers By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  teacherMgr.getTeachersBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

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
router.post('/upload/:id', multipartMiddleware, function(req, res) {
  console.log(req.files.file);
  //save image to public/img/students with a name of "student's id" without extention
  // don't forget to delete all req.files when done
  res.send(true);
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
