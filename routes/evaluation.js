var express = require('express');
var router = express.Router();
var evaMgr = require("../controller/evaluation");
var userHelpers = require("../controller/userHelpers");


router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  evaMgr.getAllEvaluationsBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(eva){
    res.send(eva);
  });
});

// get all eva
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  evaMgr.getAllEvaluationCount(req.params.limit,req.params.page,function(eva){
    res.send(eva);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  evaMgr.getAllEvaluation(function(eva){
    res.send(eva);
  });
});

// add new eva
router.post('/add', userHelpers.isLogin ,function(req, res) {
  evaMgr.addEvaluation(req.body,function(eva){
    res.send(eva);
  });
  
});

// edit eva by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  evaMgr.updateEvaluation(req.params.id,req.body,function(eva){
    res.send(eva);
  });
});




module.exports = router;
