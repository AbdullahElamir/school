var express = require('express');
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
  res.render(name);
});

module.exports = router;
