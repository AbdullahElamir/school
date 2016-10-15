var express = require('express');
var router = express.Router();
var school = require('../controller/school') ;
var login = require('../controller/login')(router);
    var user={};
    user.school="57fb8d5606d14d29e32b3c86";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});


router.get('/:name', function(req, res) {
  var name = req.params.name;
  school.getSchoolInfo(user.school,function(result){
    var schoolName ="لا يوجد";
    if(result!=null){
      schoolName = result.name
    }
    res.render(name,{schoolName : schoolName});
  });
});


// router.get('/admin', function(req, res, next) {
//   res.render('admin/index', { title: 'Admin Dashboard' });
// });

module.exports = router;
