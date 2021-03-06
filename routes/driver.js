var express = require('express');
var router = express.Router();
var DriverMgr = require("../controller/driver");
var userHelpers = require("../controller/userHelpers");



/*GET all Drivers By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  DriverMgr.getAllDriversBySearchValue(req.session.school,req.params.searchValue,req.params.limit,req.params.page,function(drivers){
    res.send(drivers);
  });
});

/* GET all Drivers */
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  DriverMgr.getAllDriversCount(req.session.school,req.params.limit,req.params.page,function(drivers){
    res.send(drivers);
  });
});

router.get('/all', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res){
  DriverMgr.getAllDrivers(req.session.school,function(drivers){
    res.send(drivers);
  });
});

/* Add new driver  */
router.post('/add',userHelpers.isAdmin,function(req, res) {
  req.body.school = req.session.school;
  DriverMgr.addDriver(req.body,function(newDriver){
    res.send(newDriver);
  });

});

/* Edit Driver by id  */
router.put('/edit/:id',userHelpers.isLogin,userHelpers.isAdmin,function(req, res) {
  DriverMgr.updateDriver(req.params.id,req.body,function(returnDriver){
    res.send(returnDriver);
  });
});

/* Delete Driver by id  */
router.delete('/delete/:id',userHelpers.isAdmin,userHelpers.isLogin , function(req, res) {
  DriverMgr.deleteDriver(req.params.id,function(driver){
    res.send({result:driver});
  });
});

/* GET Driver by ID  */
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  DriverMgr.getDriverId(req.params.id,function(driver){
    res.send(driver);
  });
});

module.exports = router;
