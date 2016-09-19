var express = require('express');
var router = express.Router();
var feesMgr = require("../controller/fees");
var userHelpers = require("../controller/userHelpers");





router.get('/all', userHelpers.isLogin ,function(req, res) {
  feesMgr.getAllFees(function(fees){
    res.send(fees);
  });
});

// add new  class fees
router.post('/add', userHelpers.isLogin ,function(req, res) {
  feesMgr.addFees(req.body,function(fees){
    res.send(fees);
  });

});

// edit fees by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  feesMgr.updateFees(req.params.id,req.body,function(fees){
    res.send(fees);
  });
});

// delete fees by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  feesMgr.updateFees(req.params.id,{status:0},function(fees){
    res.send({result:fees});
  });
});
// get fees by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  feesMgr.getAllFeesStatus(req.params.status,function(fees){
    res.send(fees);
  });
});
// get fees by name
router.get('/name/:name',userHelpers.isLogin , function(req, res) {
  feesMgr.getFeesName(req.params.name,function(fees){
    res.send(fees);
  });
});

//get total fees of a class in specific year
router.get('/total/:classRoom/:year',userHelpers.isLogin , function(req, res) {
  res.send({amount:1000});
});

//get all fees By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  feesMgr.getAllFeesesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(feess){
    res.send(feess);
  });
});
// get all fees
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  feesMgr.getAllFeesCount(req.params.limit,req.params.page,function(fees){
    res.send(fees);
  });
});
// get  fees by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  feesMgr.getFeesId(req.params.id,function(fees){
    res.send(fees);
  });
});


module.exports = router;
