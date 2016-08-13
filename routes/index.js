var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/:name', function(req, res) {
  var name = req.params.name;
  res.render(name);
});

// router.get('/admin', function(req, res, next) {
//   res.render('admin/index', { title: 'Admin Dashboard' });
// });

module.exports = router;
