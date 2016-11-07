var express = require('express');
var router = express.Router();
var inOutcomeTypesMgr = require("../controller/inOutcomeType");
var userHelpers = require("../controller/userHelpers");
var user={};
user.school="57fb8d5606d14d29e32b3c86";

router.get('/all', userHelpers.isLogin ,function(req, res) {
  inOutcomeTypesMgr.getAllInOutcomeTypes(user.school,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// add new inOutcomeTypes
router.post('/add', userHelpers.isLogin ,function(req, res) {
  req.body.school=user.school;
  inOutcomeTypesMgr.addInOutcomeTypes(req.body,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// edit inOutcomeTypes by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  inOutcomeTypesMgr.updateInOutcomeTypes(req.params.id,req.body,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// delete inOutcomeTypes by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  inOutcomeTypesMgr.deleteInOutcomeTypes(req.params.id,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

//get all inOutcomeTypes By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  inOutcomeTypesMgr.getAllInOutcomeTypesBySearchValue(user.school,req.params.searchValue,req.params.limit,req.params.page,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// get all inOutcomeTypes
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  inOutcomeTypesMgr.getAllInOutcomeTypesCount(user.school,req.params.limit,req.params.page,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// get inOutcomeTypes by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  inOutcomeTypesMgr.getInOutcomeTypesId(req.params.id,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

module.exports = router;
