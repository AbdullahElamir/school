var express = require('express');
var router = express.Router();
var schoolMgr = require("../controller/school");
var userHelpers = require("../controller/userHelpers");

//get school information
router.get('/info', userHelpers.isLogin ,function(req, res) {
  schoolMgr.getSchoolInfo(function(info){
    res.send(info);
  });
});

//edit school information
router.put('/edit',function(req, res) {
  schoolMgr.updateSchool(req.body,function(school){
    res.send(school);
  });
});


module.exports = router;
