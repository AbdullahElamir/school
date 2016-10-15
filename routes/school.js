var express = require('express');
var router = express.Router();
var schoolMgr = require("../controller/school");
var userHelpers = require("../controller/userHelpers");
var user={};
    user.school="5801f550e4de0e349c8714c2";

router.get('/info', userHelpers.isLogin ,function(req, res) {
  schoolMgr.getSchoolInfo(user.school,function(info){
    res.send(info);
  });
});

//edit school information
router.put('/edit',function(req, res) {
  schoolMgr.updateSchool(user.school,req.body,function(school){
    res.send(school);
  });
});

router.post('/add',function(req, res) {
  schoolMgr.addSchool(req.body,function(school){
    res.send(school);
  });
});

module.exports = router;
