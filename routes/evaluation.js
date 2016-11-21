var express = require('express');
var router = express.Router();
var evaMgr = require("../controller/evaluation");
var userHelpers = require("../controller/userHelpers");


router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  evaMgr.getAllEvaluationsBySearchValue(req.session.school,req.params.searchValue,req.params.limit,req.params.page,function(eva){
    res.send(eva);
  });
});

// get all eva
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  evaMgr.getAllEvaluationCount(req.session.school,req.params.limit,req.params.page,function(eva){
    res.send(eva);
  });
});

router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  evaMgr.getAllEvaluation(req.session.school,function(eva){
    res.send(eva);
  });
});

// get  evaluation room by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  evaMgr.getEvaluationId(req.params.id,function(evaluation){
    res.send(evaluation);
  });
});

// add new eva
router.post('/add', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  evaMgr.addEvaluation(req.body,function(eva){
    res.send(eva);
  });

});

// edit eva by id
router.put('/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  evaMgr.updateEvaluation(req.params.id,req.body,function(eva){
    res.send(eva);
  });
});

router.delete('/delete/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  evaMgr.deleteEvaluation(req.params.id,function(eva){
    res.send({result:eva});
  });
});



module.exports = router;
