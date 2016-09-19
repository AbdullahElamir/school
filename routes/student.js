var express = require('express');
var router = express.Router();
var studentMgr = require("../controller/student");
var userHelpers = require("../controller/userHelpers");

router.get('/class/:searchValue/:_class',userHelpers.isLogin , function(req, res) {
  // get real data with search text
  res.send([
    {_id:745645645,name:"abdo"},
    {_id:845613541,name:"taha"},
    {_id:754874856,name:"salem"},
    {_id:812674577,name:"hitam"}
  ]);
});
router.get('/class//:_class',userHelpers.isLogin , function(req, res) {
  // get real data without search text
  res.send([
    {_id:745645645,name:"abdo"},
    {_id:845613541,name:"taha"},
    {_id:754874856,name:"salem"},
    {_id:812674577,name:"hitam"}
  ]);
});

/*GET all Student By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  studentMgr.getAllStudentsBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(student){
    res.send(student);
  });
});

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
  studentMgr.addStudent(req.body,function(student){
    res.send(student);
  });

});

/* Edit student by id  */
router.put('/edit/:id',function(req, res) {
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
