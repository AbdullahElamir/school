var express = require('express');
var router = express.Router();
var school = require('../controller/school') ;
var userHelpers = require("../controller/userHelpers");

var login = require('../controller/login')(router);


/* GET home page. */

router.get('/isLoggedIn', function(req, res) {
  res.send(req.isAuthenticated());
});


router.get('/', function(req, res) {
  res.render('index', { title: 'Login' });
});

router.get('/login', function(req, res) {
  // school.getSchoolInfo(req.session.school,function(result){
    var schoolName ="لا يوجد";
    // if(result!=null){
    //   schoolName = result.name;
    // }
    res.render('login',{schoolName : schoolName});
  // });
});

router.get('/forget', function(req, res) {
	res.render('forget');
});
router.get('/:name',userHelpers.isLogin, function(req, res) {
  var name = req.params.name;
  school.getSchoolInfo(req.session.school,function(result){
    var schoolName ="لا يوجد";
    if(result!=null){
      schoolName = result.name;
    }
    res.render(name,{schoolName : schoolName});
  });
});

// router.get('/admin', function(req, res, next) {
//   res.render('admin/index', { title: 'Admin Dashboard' });
// });

module.exports = router;
