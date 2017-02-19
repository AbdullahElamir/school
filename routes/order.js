var express = require('express');
var router = express.Router();
var OrderMgr = require("../controller/order");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin,function(req, res) {
  OrderMgr.getNewOrder(req.session.school, function(order){
    res.send(order);
  });

});

router.get('/getOrderById/:id', userHelpers.isLogin,function(req, res) {
  OrderMgr.getOrderById(req.params.id, function(order){
    res.send(order);
  });

});



module.exports = router;
