var express = require('express');
var router = express.Router();
var TSCMgr = require("../controller/teacherSubjectClass");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  TSCMgr.getAllTSC(req.session.school,function(TSCs){
    res.send(TSCs);
  });
});

router.get('/status/:status', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  TSCMgr.getAllTSCStatus(req.session.school,req.params.status,function(TSCs){
    res.send(TSCs);
  });
});

// add new TSCs
router.post('/add', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  TSCMgr.addTSC(req.body,function(TSCs){
    res.send(TSCs);
  });
  
});

// edit TSCs by id
router.put('/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  TSCMgr.updateTSC(req.params.id,req.body,function(TSCs){
    res.send(TSCs);
  });
});

// delete TSCs by id
router.delete('/delete/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  TSCMgr.updateTSC(req.params.id,{status:0},function(TSCs){
    res.send(TSCs);
  });
});


// get TSCs by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  TSCMgr.getTSCId(req.params.id,function(TSCs){
    res.send(TSCs);
  });
});


module.exports = router;
