var express = require('express');
var router = express.Router();
var classMgr = require("../controller/class");
var userHelpers = require("../controller/userHelpers");

/*GET all Classes By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  classMgr.getAllClassesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(parents){
    res.send(parents);
  });
});

// GET all class
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  classMgr.getAllClassCount(req.params.limit,req.params.page,function(_class){
    res.send(_class);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  classMgr.getAllClass(function(_class){
    res.send(_class);
  });
});

// Add new class
router.post('/add', userHelpers.isLogin ,function(req, res) {
  classMgr.addClass(req.body,function(_class){
    res.send(_class);
  });
  
});

// Edit class by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  classMgr.updateClass(req.params.id,req.body,function(_class){
    res.send(_class);
  });
});

// Delete class by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  classMgr.deleteClass(req.params.id,function(_class){
    res.send({result:_class});
  });
});

// GET class by ID
router.get('/:id',userHelpers.isLogin , function(req, res) {
  classMgr.getClassId(req.params.id,function(_class){
    res.send(_class);
  });
});


module.exports = router;
