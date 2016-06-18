var express = require('express');
var router = express.Router();


router.get('/:folder/:name', function(req, res) {
  var folder = req.params.folder;
  var name = req.params.name;
  res.render('admin/' + folder + '/' + name);
});

module.exports = router;