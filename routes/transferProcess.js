var express = require('express');
var router = express.Router();
var TransferProcessMgr = require("../controller/transferProcess");
var userHelpers = require("../controller/userHelpers");

/*GET all Transfer Processes By Search Value And Year*/
router.get('/:searchValue/:year/:limit/:page',userHelpers.isLogin , function(req, res) {
  TransferProcessMgr.getTransferProcessesBySearchValueAndYear(req.params.searchValue,req.params.year,req.params.limit,req.params.page,function(transferProcesses){
    res.send(transferProcesses);
  });
});

// GET all Transfer Processes 
router.get('/:year/:limit/:page',userHelpers.isLogin , function(req, res) {
  TransferProcessMgr.getTransferProcessesBySearchValueAndYear("",req.params.year,req.params.limit,req.params.page,function(transferProcesses){
    res.send(transferProcesses);
  });
});

// add new transfer process
router.post('/add', userHelpers.isLogin ,function(req, res) {
  TransferProcessMgr.addTransferProcess(req.body,function(tr){
    res.send(tr);
  });
});

/* Delete transfer process by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  TransferProcessMgr.deleteTransferProcess(req.params.id,function(tp){
    res.send({result:tp});
  });
});

/* Edit transfer process by id  */
router.put('/edit/:id',userHelpers.isLogin , function(req, res) {
  TransferProcessMgr.editTransferProcess(req.params.id,req.body,function(tp){
    res.send({result:tp});
  });
});

module.exports = router;