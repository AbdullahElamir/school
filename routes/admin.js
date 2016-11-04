var express = require('express');
var router = express.Router();


router.get('/:folder/:student/:name', function(req, res) {
  var folder = req.params.folder;
  var student = req.params.student;
  var name = req.params.name;
  res.render('admin/' + folder +'/'+ student + '/' + name);
});


router.get('/getObject', function(req, res) {
  res.send({x:1});  
});


router.get('/:folder/:name', function(req, res) {
  var folder = req.params.folder;
  var name = req.params.name;
  res.render('admin/' + folder + '/' + name);
});
module.exports = router;
