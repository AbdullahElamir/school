var express = require('express');
var router = express.Router();
var userHelpers = require("../controller/userHelpers");
var stuproMgr = require("../controller/studentProcess");
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
		"subject":"tripoli",
		"classRoom":"tripoli",
		"id":"1"
	}];
	res.send(info);
  
});
router.post('/add', userHelpers.isLogin ,function(req, res) {
  stuproMgr.addStupro(req.body,function(Stupro){
    res.send(Stupro);
  });
  
});


module.exports = router;
