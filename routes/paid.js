var express = require('express');
var router = express.Router();
var paid = require("../controller/paid");
var userHelpers = require("../controller/userHelpers");





router.get('/all', userHelpers.isLogin ,function(req, res) {
  paid.getAllPaid(function(paids){
    res.send(paids);
  });
});

// add new   paids
router.post('/add', userHelpers.isLogin ,function(req, res) {
  paid.addPaid(req.body,function(paids){
    res.send(paids);
  });
  
});

// edit paids by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  paid.updatePaid(req.params.id,req.body,function(paids){
    res.send(paids);
  });
});
router.put('/fees/:fees', userHelpers.isLogin ,function(req, res) {
  paid.getPaidFees(req.params.fees,function(paids){
    res.send(paids);
  });
});
router.put('/stuPro/:stuPro', userHelpers.isLogin ,function(req, res) {
  paid.getPaidStu(req.params.stuPro,function(paids){
    res.send(paids);
  });
});
router.put('/FeesStu/:fees/:stu', userHelpers.isLogin ,function(req, res) {
  paid.getPaidFeesStu(req.params.fees,req.params.stu,function(paids){
    res.send(paids);
  });
});
// delete paids by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  paid.updatePaid(req.params.id,{status:0},function(paids){
    res.send({result:paids});
  });
});
// get paids by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  paid.getAllPaidStatus(req.params.status,function(paids){
    res.send(paids);
  });
});

//get all paids By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  paid.getAllPaidesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(paidss){
    res.send(paidss);
  });
});
// get all paids
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  paid.getAllPaidCount(req.params.limit,req.params.page,function(paids){
    res.send(paids);
  });
});
// get  paids by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  paid.getPaidId(req.params.id,function(paids){
    res.send(paids);
  });
});


module.exports = router;
