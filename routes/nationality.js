var express = require('express');
var router = express.Router();
var userHelpers = require("../controller/userHelpers");
var nationality = require('../Nationality');

/* Get All Nationality  */

router.get('/Nat', userHelpers.isLogin ,function(req, res){
  res.send(nationality);
});

module.exports = router;