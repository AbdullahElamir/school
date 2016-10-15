var express = require('express');
var router = express.Router();
var classMgr = require("../controller/class");
var classRoomMgr = require("../controller/classRoom");
var userHelpers = require("../controller/userHelpers");
var user={};
    user.school="57fb8d5606d14d29e32b3c86";
/*GET all Classes By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  classMgr.getAllClassesBySearchValue(user.school,req.params.searchValue,req.params.limit,req.params.page,function(parents){
    res.send(parents);
  });
});

router.get('/classRooms/:year', userHelpers.isLogin ,function(req, res) {
  classRoomMgr.getAllClassesAndClassRoomsByYear(user.school,req.params.year, function(classes){
    var _class = [];
    var obj=[];
    var k = 0;
    for( var i in  classes){
      if(obj[classes[i].class._id]==undefined){
        obj[classes[i].class._id]=k;
        k+=1;
        _class.push({_id:classes[i].class._id,name:classes[i].class.name,classRooms:[]})
      }
      _class[obj[classes[i].class._id]].classRooms.push(classes[i]);
      if(i == classes.length-1){
        res.send(_class);
      }
    }

  });
});

// GET all class
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  classMgr.getAllClassCount(user.school,req.params.limit,req.params.page,function(_class){
    res.send(_class);
  });
});

router.get('/all', userHelpers.isLogin ,function(req, res) {
  classMgr.getAllClass(user.school,function(_class){
    res.send(_class);
  });
});
// Add new class
router.post('/add', userHelpers.isLogin ,function(req, res) {
  req.body.school=user.school;
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
