var express = require('express');
var router = express.Router();
var teacherMgr = require("../controller/teacher");
var userHelpers = require("../controller/userHelpers");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var user={};
    user.school="57fb8d5606d14d29e32b3c86";
// var path = require("path");

/*GET all Teachers By Search Value*/

router.get('/all', userHelpers.isLogin ,function(req, res) {
  teacherMgr.getAllTeacher(user.school,function(teacher){
    res.send(teacher);
  });
});

/* Add new teacher  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  req.body.school=user.school;
  teacherMgr.addTeacher(req.body,function(teacher){
    res.send(teacher);
  });

});
router.post('/upload/:id',userHelpers.isLogin, multipartMiddleware, function(req, res) {
  //save image to public/img/students with a name of "student's id" without extention
  // don't forget to delete all req.files when done
  var dir = './public/img/teachers';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.readFile(req.files.file.path, function (err, data) {
    var newPath =dir+'/'+req.params.id;
    fs.writeFile(newPath, data, function (err) {
      if(!err){
        res.send(true);
      }

    });
  });
});

/* Edit teacher by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  teacherMgr.updateTeacher(req.params.id,req.body,function(teacher){
    res.send(teacher);
  });
});

router.put('/changePass/:id', userHelpers.isLogin ,function(req, res) {
  teacherMgr.changePass(req.params.id,req.body,function(result){
    res.send({result:result});
  });
});
/* Delete teacher by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  teacherMgr.deleteTeacher(req.params.id,function(teacher){
    res.send({result:teacher});
  });
});
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  teacherMgr.getTeachersBySearchValue(user.school,req.params.searchValue,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

/* GET all teacher */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  teacherMgr.getAllTeacherCount(user.school,req.params.limit,req.params.page,function(teacher){
    res.send(teacher);
  });
});
/* GET teacher by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  teacherMgr.getTeacherId(req.params.id,function(teacher){
    res.send(teacher);
  });
});


module.exports = router;
