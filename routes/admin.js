var express = require('express');
var userHelpers = require("../controller/userHelpers");
var router = express.Router();


router.get('/:folder/:student/:name',userHelpers.isLogin, function(req, res) {
  var folder = req.params.folder;
  var student = req.params.student;
  var name = req.params.name;
  res.render('admin/' + folder +'/'+ student + '/' + name);
});


router.get('/getObject',userHelpers.isLogin, function(req, res) {
  res.send({x:1});  
});


router.get('/:folder/:name',userHelpers.isLogin, function(req, res) {
  var folder = req.params.folder;
  var name = req.params.name;
  res.render('admin/' + folder + '/' + name);
});
module.exports = router;
