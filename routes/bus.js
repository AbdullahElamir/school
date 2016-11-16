var express = require('express');
var router = express.Router();
var BusMgr = require("../controller/bus");
var userHelpers = require("../controller/userHelpers");


/*GET all Buses By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  BusMgr.getAllBusesBySearchValue(req.user.school,req.params.searchValue,req.params.limit,req.params.page,function(buses){
    res.send(buses);
  });
});

/* GET all Buses */
router.get('/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  BusMgr.getAllBusesCount(req.user.school,req.params.limit,req.params.page,function(buses){
    res.send(buses);
  });
});

router.get('/all', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res){
  BusMgr.getAllBuses(req.user.school,function(buses){
    res.send(buses);
  });
});

/* Add new bus  */
router.post('/add',userHelpers.isAdmin,function(req, res) {
  req.body.school=req.user.school;
  BusMgr.addBus(req.body,function(newBus){
    res.send(newBus);
  });

});

/* Edit Bus by id  */
router.put('/edit/:id',userHelpers.isLogin,userHelpers.isAdmin,function(req, res) {
  BusMgr.updateBus(req.params.id,req.body,function(returnBus){
    res.send(returnBus);
  });
});

/* Delete bus by id  */
router.delete('/delete/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  BusMgr.deleteBus(req.params.id,function(bus){
    res.send({result:bus});
  });
});

/* GET Bus by ID  */
router.get('/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  BusMgr.getBusId(req.params.id,function(bus){
    res.send(bus);
  });
});

module.exports = router;
