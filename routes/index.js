var express = require('express');
var router = express.Router();
var school = require('../controller/school') ;
var login = require('../controller/login')(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});


// router.get('/admin', function(req, res, next) {
//   res.render('admin/index', { title: 'Admin Dashboard' });
// });

router.get('/:name', function(req, res) {
  var name = req.params.name;
  console.log(school);
  school.getSchoolInfo(function(result){
  	console.log(result);
  	schoolName="لا يوجد";
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