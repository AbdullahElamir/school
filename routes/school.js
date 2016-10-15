var express = require('express');
var router = express.Router();
var schoolMgr = require("../controller/school");
var userHelpers = require("../controller/userHelpers");
var user={};
    user.school="5801f550e4de0e349c8714c2";

//get all school By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  schoolMgr.getSchoolsBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(school){
    res.send(school);
  });
});

// get all school
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  schoolMgr.getAllSchoolCount(req.params.limit,req.params.page,function(school){
    res.send(school);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  schoolMgr.getAllSchool(function(school){
    res.send(school);
  });
});

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
router.get('/all', userHelpers.isLogin ,function(req, res) {
  schoolMgr.getAllSchool(function(info){
    res.send(info);
  });
});

// delete school by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  schoolMgr.deleteSchool(req.params.id,function(school){
    res.send({result:school});
  });
});

// get school by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  schoolMgr.getSchoolInfo(req.params.id,function(school){
    res.send(school);
  });
});

module.exports = router;
