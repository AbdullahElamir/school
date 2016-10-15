var express = require('express');
var router = express.Router();
var TaskMgr = require("../controller/task");
var userHelpers = require("../controller/userHelpers");
var user={};
    user.school="57fb8d5606d14d29e32b3c86";

router.get('/all', userHelpers.isLogin ,function(req, res) {
  TaskMgr.getAllTask(function(task){
    res.send(task);
  });
});

// add new task
router.post('/add', userHelpers.isLogin ,function(req, res) {
  TaskMgr.addTask(req.body,function(task){
    res.send(task);
  });
});
// get task by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  TaskMgr.getAllTaskStatus(req.params.status,function(task){
    res.send(task);
  });
});
// edit task by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  TaskMgr.updateTask(req.params.id,req.body,function(task){
    res.send(task);
  });
});

// delete task by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  TaskMgr.deleteTask(req.params.id,function(task){
    res.send({result:task});
  });
});
//get all task By Search Value
router.get('/:searchValue/:limit/:page/:classRoom/:subject',userHelpers.isLogin , function(req, res) {
  TaskMgr.getAllTasksBySearchValue(req.params.searchValue,req.params.limit,req.params.page,req.params.classRoom,req.params.subject,function(task){
    res.send(task);
  });
});

// get all task
router.get('/:limit/:page/:classRoom/:subject',userHelpers.isLogin , function(req, res) {
  TaskMgr.getAllTaskCount(req.params.limit,req.params.page,req.params.classRoom,req.params.subject,function(task){
    res.send(task);
  });
});

// get task by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  TaskMgr.getTaskId(req.params.id,function(task){
    res.send(task);
  });
});


module.exports = router;
