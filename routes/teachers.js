var express = require('express');
var userHelpers = require("../controller/userHelpers");
var router = express.Router();

router.get('/:folder/:name',userHelpers.isLogin, function(req, res) {
  var folder = req.params.folder;
  var name = req.params.name;
  res.render('teachers/' + folder + '/' + name);
});
module.exports = router;