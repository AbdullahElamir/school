var express = require('express');
var router = express.Router();
var InOutcomeMgr = require("../controller/inOutcome");
var userHelpers = require("../controller/userHelpers");



router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  InOutcomeMgr.getAllInOutcome(req.session.school,function(inOutcome){
    res.send(inOutcome);
  });
});

// add new inOutcome
router.post('/add', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  req.body.school = req.session.school;
  InOutcomeMgr.addInOutcome(req.body,function(inOutcome){
    res.send(inOutcome);
  });

});
// edit inOutcome by id
router.put('/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  InOutcomeMgr.updateInOutcome(req.params.id,req.body,function(inOutcome){
    res.send(inOutcome);
  });
});

// delete inOutcome by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  InOutcomeMgr.deleteInOutcome(req.params.id,function(inOutcome){
    res.send({result:inOutcome});
  });
});
//get all inOutcome By Search Value
router.get('/:searchValue/:startDate/:finishDate/:limit/:page/:type/:cat',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  InOutcomeMgr.getAllInOutcomesBySearchValue(req.session.school,req.params.cat,req.params.type,req.params.searchValue,req.params.limit,req.params.page,req.params.startDate,req.params.finishDate,function(inOutcome){
    res.send(inOutcome);
  });
});

// get all inOutcome
router.get('/:startDate/:finishDate/:limit/:page/:type/:cat',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  InOutcomeMgr.getAllInOutcomeCount(req.session.school,req.params.cat,req.params.type,req.params.limit,req.params.page,req.params.startDate,req.params.finishDate,function(inOutcome){
    res.send(inOutcome);
  });
});

// get inOutcome by id
router.get('/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  InOutcomeMgr.getInOutcomeId(req.params.id,function(inOutcome){
    res.send(inOutcome);
  });
});


module.exports = router;
