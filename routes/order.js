var express = require('express');
var router = express.Router();
var OrderMgr = require("../controller/order");
var userHelpers = require("../controller/userHelpers");


router.get('/all/:limit/:page/:status', userHelpers.isLogin,function(req, res) {
  OrderMgr.getAllOrder(req.params.status,req.params.limit,req.params.page,req.session.school, function(order){
    res.send(order);
  });

});

router.get('/getOrderById/:id', userHelpers.isLogin,function(req, res) {
  OrderMgr.getOrderById(req.params.id, function(order){
    // res.send(order);
  });
});

router.post('/changeStatus', userHelpers.isLogin,function(req, res) {
  OrderMgr.changeStatus(req.body,req.session.school, function(order){
    res.send(order);
  });
});




module.exports = router;
