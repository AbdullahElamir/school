var express = require('express');
var router = express.Router();
var InOutcomeMgr = require("../controller/inOutcome");
var userHelpers = require("../controller/userHelpers");



router.get('/all', userHelpers.isLogin ,function(req, res) {
  InOutcomeMgr.getAllInOutcome(req.user.school,function(inOutcome){
    res.send(inOutcome);
  });
});

// add new inOutcome
router.post('/add', userHelpers.isLogin ,function(req, res) {
  req.body.school = req.user.school;
  InOutcomeMgr.addInOutcome(req.body,function(inOutcome){
    res.send(inOutcome);
  });

});
// edit inOutcome by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  InOutcomeMgr.updateInOutcome(req.params.id,req.body,function(inOutcome){
    res.send(inOutcome);
  });
});

// delete inOutcome by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  InOutcomeMgr.deleteInOutcome(req.params.id,function(inOutcome){
    res.send({result:inOutcome});
  });
});
//get all inOutcome By Search Value
router.get('/:searchValue/:startDate/:finishDate/:limit/:page/:type/:cat',userHelpers.isLogin , function(req, res) {
  InOutcomeMgr.getAllInOutcomesBySearchValue(req.user.school,req.params.cat,req.params.type,req.params.searchValue,req.params.limit,req.params.page,req.params.startDate,req.params.finishDate,function(inOutcome){
    res.send(inOutcome);
  });
});

// get all inOutcome
router.get('/:startDate/:finishDate/:limit/:page/:type/:cat',userHelpers.isLogin , function(req, res) {
  InOutcomeMgr.getAllInOutcomeCount(req.user.school,req.params.cat,req.params.type,req.params.limit,req.params.page,req.params.startDate,req.params.finishDate,function(inOutcome){
    res.send(inOutcome);
  });
});

// get inOutcome by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  InOutcomeMgr.getInOutcomeId(req.params.id,function(inOutcome){
    res.send(inOutcome);
  });
});


module.exports = router;
