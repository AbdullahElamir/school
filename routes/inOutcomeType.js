var express = require('express');
var router = express.Router();
var inOutcomeTypesMgr = require("../controller/inOutcomeType");
var userHelpers = require("../controller/userHelpers");

router.get('/all', userHelpers.isLogin ,function(req, res) {
  inOutcomeTypesMgr.getAllInOutcomeTypes(function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// add new inOutcomeTypes
router.post('/add', userHelpers.isLogin ,function(req, res) {
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
  inOutcomeTypesMgr.getAllInOutcomeTypesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(inOutcomeTypes){
    res.send(inOutcomeTypes);
  });
});

// get all inOutcomeTypes
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  inOutcomeTypesMgr.getAllInOutcomeTypesCount(req.params.limit,req.params.page,function(inOutcomeTypes){
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
