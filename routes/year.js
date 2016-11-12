var express = require('express');
var router = express.Router();
var yearMgr = require("../controller/year");
var userHelpers = require("../controller/userHelpers");

router.get('/all/thing', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  yearMgr.getAllYear(req.req.user.school,function(years){
    res.send(years);
  });
});

//get the activated year`
router.get('/active', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  yearMgr.getActiveYear(req.user.school,function(year){
    res.send(year);
  });
});

router.get('/status/:status', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  yearMgr.getAllYearStatus(req.user.school,req.params.status,function(years){
    res.send(years);
  });
});
router.get('/name/:name', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  yearMgr.getYearName(req.user.school,req.params.name,function(years){
    res.send(years);
  });
});
// add new years
router.post('/add', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  req.body.school=req.user.school;
  yearMgr.addYear(req.body,function(years){
    res.send(years);
  });

});

// edit years by id
router.put('/edit/:id', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  yearMgr.updateYear(req.params.id,req.body,function(years){
    res.send(years);
  });
});
//activate or disactivate
router.put('/active/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  if(req.body.active){
    yearMgr.activate(req.user.school,req.params.id,function(result){
      res.send(result);
    });
  }else{
    yearMgr.disActivate(req.params.id,function(result){
      res.send(result);
    });
  }
});

// delete years by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  yearMgr.deleteYear(req.params.id,function(result){
    res.send({result:result});
  });
});
//get all years By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  yearMgr.getAllYearsBySearchValue(req.user.school,req.params.searchValue,req.params.limit,req.params.page,function(years){
    res.send(years);
  });
});

// get all years
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  yearMgr.getAllYearCount(req.user.school,req.params.limit,req.params.page,function(years){
    res.send(years);
  });
});
// get years by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  yearMgr.getYearId(req.params.id,function(years){
    res.send(years);
  });
});




module.exports = router;
