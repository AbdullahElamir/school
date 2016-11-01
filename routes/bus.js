var express = require('express');
var router = express.Router();
var BusMgr = require("../controller/bus");
var userHelpers = require("../controller/userHelpers");
var user={};
user.school="5801f550e4de0e349c8714c2";

/*GET all Buses By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  BusMgr.getAllBusesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(buses){
    res.send(buses);
  });
});

/* GET all Buses */
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  BusMgr.getAllBusesCount(req.params.limit,req.params.page,function(buses){
    res.send(buses);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res){
  BusMgr.getAllBuses(function(buses){
    res.send(buses);
  });
});

/* Add new bus  */
router.post('/add',function(req, res) {
  BusMgr.addBus(req.body,function(newBus){
    res.send(newBus);
  });

});

/* Edit Bus by id  */
router.put('/edit/:id',userHelpers.isLogin,function(req, res) {
  BusMgr.updateBus(req.params.id,req.body,function(returnBus){
    res.send(returnBus);
  });
});

/* Delete bus by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  BusMgr.deleteBus(req.params.id,function(bus){
    res.send({result:bus});
  });
});

/* GET Bus by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  BusMgr.getBusId(req.params.id,function(bus){
    res.send(bus);
  });
});

module.exports = router;
