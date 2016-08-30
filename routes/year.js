var express = require('express');
var router = express.Router();
var yearMgr = require("../controller/year");
var userHelpers = require("../controller/userHelpers");



router.get('/all', userHelpers.isLogin ,function(req, res) {
  yearMgr.getAllYear(function(years){
    res.send(years);
  });
});

router.get('/status/:status', userHelpers.isLogin ,function(req, res) {
  yearMgr.getAllYearStatus(req.params.status,function(years){
    res.send(years);
  });
});
router.get('/name/:name', userHelpers.isLogin ,function(req, res) {
  yearMgr.getYearName(req.params.name,function(years){
    res.send(years);
  });
});
// add new years
router.post('/add', userHelpers.isLogin ,function(req, res) {
  yearMgr.addYear(req.body,function(years){
    res.send(years);
  });
  
});

// edit years by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  yearMgr.updateYear(req.params.id,req.body,function(years){
    res.send(years);
  });
});

// delete years by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  yearMgr.updateYear(req.params.id,{status:0},function(years){
    res.send(years);
  });
});
//get all years By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  yearMgr.getAllYearsBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(years){
    res.send(years);
  });
});

// get all years
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  yearMgr.getAllYearCount(req.params.limit,req.params.page,function(years){
    res.send(years);
  });
});
// get years by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  yearMgr.getYearId(req.params.id,function(years){
    res.send(years);
  });
});


module.exports = router;