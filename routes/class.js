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

router.get('/classRooms/:year', userHelpers.isLogin ,function(req, res) {
  // classMgr.getAllClassesAndClassRoomsByYear(function(classes){
  //   res.send(classes);
  // });
  res.send([
    {_id:56154115,name:"الصف الاول"
      ,classRooms:[
      {_id:7451486496,name:"1/1"},
      {_id:8754748787,name:"1/2"},
      {_id:6484541888,name:"1/3"},
      ]
    },
    {_id:824968488,name:"الصف الثاني"
      ,classRooms:[
      {_id:2415841638,name:"2/1"},
      {_id:5147574554,name:"2/2"},
      {_id:1551258512,name:"2/3"},
      ]
    }
  ]);
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
