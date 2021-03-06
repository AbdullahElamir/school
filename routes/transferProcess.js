var express = require('express');
var router = express.Router();
var TransferProcessMgr = require("../controller/transferProcess");
var userHelpers = require("../controller/userHelpers");

// Get all teachers on transfer process By id of transfer process
router.get('/transferProcessTeachers/all/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  TransferProcessMgr.getTransferProcessTeachers(req.params.id,function(transferProcessTeachers){
    res.send(transferProcessTeachers);
  });
});

// Edit all teachers on transfer process By id of transfer process
router.put('/transferProcessTeachers/edit/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  TransferProcessMgr.updateTeachers(req.params.id,req.body,function(status){
    res.send(status);
  });
});

// Get all students on transfer process By id of transfer process
router.get('/transferProcessStudents/all/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  TransferProcessMgr.getTransferProcessStudents(req.params.id,function(transferProcessStudents){
    res.send(transferProcessStudents);
  });
});

// Edit all students on transfer process By id of transfer process
router.put('/transferProcessStudents/edit/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  TransferProcessMgr.updateStudents(req.params.id,req.body,function(status){
    res.send(status);
  });
});

/*GET all Transfer Processes By Search Value And Year*/
router.get('/:searchValue/:year/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  TransferProcessMgr.getTransferProcessesBySearchValueAndYear(req.params.searchValue,req.params.year,req.params.limit,req.params.page,function(transferProcesses){
    res.send(transferProcesses);
  });
});

// GET all Transfer Processes 
router.get('/:year/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  TransferProcessMgr.getTransferProcessesBySearchValueAndYear("",req.params.year,req.params.limit,req.params.page,function(transferProcesses){
    res.send(transferProcesses);
  });
});

// GET Transfer Process By id
router.get('/get/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  TransferProcessMgr.getTransferProcess(req.params.id,function(transferProcess){
    res.send(transferProcess);
  });
});
 
// add new transfer process
router.post('/add', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  TransferProcessMgr.addTransferProcess(req.body,function(tr){
    res.send(tr);
  });
});

/* Delete transfer process by id  */
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  TransferProcessMgr.deleteTransferProcess(req.params.id,function(tp){
    res.send({result:tp});
  });
});

/* Edit transfer process by id  */
router.put('/edit/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  TransferProcessMgr.editTransferProcess(req.params.id,req.body,function(tp){
    res.send({result:tp});
  });
});

module.exports = router;