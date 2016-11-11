var express = require('express');
var router = express.Router();
var classMgr = require("../controller/class");
var classRoomMgr = require("../controller/classRoom");
var userHelpers = require("../controller/userHelpers");


// get all class rooms by class and year
router.get('/classRooms/:clas/:year',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  classMgr.getAllClassRoomsByClassAndYear(req.user.school,req.params.clas,req.params.year,function(classRooms){
    res.send(classRooms);
  });
});

//get all classes by year
router.get('/classes/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  classMgr.getClassesByYear(req.user.school,req.user.school,req.params.id,function(classes){
    res.send(classes);
  });
});

//get all exams by year and class
router.get('/exams/:year/:clas', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  classMgr.getExamsByYearAndClass(req.user.school,req.params.year,req.params.clas,function(exams){
    res.send(exams);
  });
});

/*GET all Classes By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  classMgr.getAllClassesBySearchValue(req.user.school,req.params.searchValue,req.params.limit,req.params.page,function(parents){
    res.send(parents);
  });
});

router.get('/classRooms/:year', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  classRoomMgr.getAllClassesAndClassRoomsByYear(req.user.school,req.params.year, function(classes){
    var _class = [];
    var obj=[];
    var k = 0;
    if( classes.length === 0 ){
      res.send(_class);
    } else {
      for( var i in  classes){
        if(obj[classes[i].class._id]===undefined){
          obj[classes[i].class._id]=k;
          k+=1;
          _class.push({_id:classes[i].class._id,name:classes[i].class.name,classRooms:[]});
        }
        _class[obj[classes[i].class._id]].classRooms.push(classes[i]);
        if(i == classes.length-1){
          res.send(_class);
        }
      }
    }
  });
});

// GET all class
router.get('/:limit/:page',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  classMgr.getAllClassCount(req.user.school,req.params.limit,req.params.page,function(_class){
    res.send(_class);
  });
});

router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  classMgr.getAllClass(req.user.school,function(_class){
    res.send(_class);
  });
});
// Add new class
router.post('/add', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res) {
  req.body.school=req.user.school;
  classMgr.addClass(req.body,function(_class){
    res.send(_class);
  });

});

// Edit class by id
router.put('/edit/:id', userHelpers.isLogin,userHelpers.isAdmin ,function(req, res) {
  classMgr.updateClass(req.params.id,req.body,function(_class){
    res.send(_class);
  });
});

// Delete class by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res) {
  classMgr.deleteClass(req.params.id,function(_class){
    res.send({result:_class});
  });
});

// GET class by ID
router.get('/:id',userHelpers.isLogin,userHelpers.isAdmin , function(req, res) {
  classMgr.getClassId(req.params.id,function(_class){
    res.send(_class);
  });
});


module.exports = router;
