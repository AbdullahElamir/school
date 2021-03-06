var express = require('express');
var router = express.Router();
var inOutcomeTypesMgr = require("../controller/inOutcomeType");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  inOutcomeTypesMgr.getAllInOutcomeTypes(req.session.school,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// add new inOutcomeTypes
router.post('/add', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  req.body.school=req.session.school;
  inOutcomeTypesMgr.addInOutcomeTypes(req.body,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// edit inOutcomeTypes by id
router.put('/edit/:id', userHelpers.isLogin,userHelpers.isAdmin,function(req, res) {
  inOutcomeTypesMgr.updateInOutcomeTypes(req.params.id,req.body,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// delete inOutcomeTypes by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  inOutcomeTypesMgr.deleteInOutcomeTypes(req.params.id,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

//get all inOutcomeTypes By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  inOutcomeTypesMgr.getAllInOutcomeTypesBySearchValue(req.session.school,req.params.searchValue,req.params.limit,req.params.page,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// get all inOutcomeTypes
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  inOutcomeTypesMgr.getAllInOutcomeTypesCount(req.session.school,req.params.limit,req.params.page,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// get inOutcomeTypes by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  inOutcomeTypesMgr.getInOutcomeTypesId(req.params.id,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

module.exports = router;
