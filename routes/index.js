var express = require('express');
var school = require('../school')
var router = express.Router();

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
  res.render(name,{info : school});
});


// router.get('/admin', function(req, res, next) {
//   res.render('admin/index', { title: 'Admin Dashboard' });
// });

module.exports = router;