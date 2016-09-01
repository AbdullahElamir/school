var express = require('express');
var router = express.Router();
var systemMgr = require("../controller/system");
var userHelpers = require("../controller/userHelpers");

router.get('/all', userHelpers.isLogin ,function(req, res) {
  systemMgr.getAllSystem(function(system){
    res.send(system);
  });
});











module.exports = router;