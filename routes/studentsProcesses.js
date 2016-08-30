var express = require('express');
var router = express.Router();
var userHelpers = require("../controller/userHelpers");

//get student information
router.get('/stuPro', userHelpers.isLogin ,function(req, res) {
	var info = [{
		"name":"mohammed",
		"description":"tripoli",
		"id":"1"
	}];
	res.send(info);
  
});

router.get('/studInfo', userHelpers.isLogin ,function(req, res) {
	var info = [{
		"name":"mohammed",
		"subject":"math",
		"classRoom":"four",
		"id":"1"
	}];
	res.send(info);
  
});


module.exports = router;
