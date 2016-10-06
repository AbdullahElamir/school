var express = require('express');
var router = express.Router();
var paid = require("../controller/paid");
var stuproMgr = require("../controller/studentProcess");
var classRoomMgr = require("../controller/classRoom");
var feesMgr = require("../controller/fees");
var userHelpers = require("../controller/userHelpers");





router.get('/all', userHelpers.isLogin ,function(req, res) {
  paid.getAllPaid(function(paids){
    res.send(paids);
  });
});

// add new   paids
router.post('/add', userHelpers.isLogin ,function(req, res) {
  paid.addPaid(req.body,function(paids){
    res.send(paids);
  });

});

// edit paids by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  paid.updatePaid(req.params.id,req.body,function(paids){
    res.send(paids);
  });
});
router.put('/fees/:fees', userHelpers.isLogin ,function(req, res) {
  paid.getPaidFees(req.params.fees,function(paids){
    res.send(paids);
  });
});
//pay for a specific stuPro
router.put('/student/:stupro', userHelpers.isLogin ,function(req, res) {
  //##########################
  req.body.StuPro=req.params.stupro;
  req.body.receip_num="123";
  paid.addPaid(req.body,function(paid){
    res.send(paid);
  });
});

router.put('/stuPro/:stuPro', userHelpers.isLogin ,function(req, res) {
  paid.getPaidStu(req.params.stuPro,function(paids){
    res.send(paids);
  });
});
router.put('/FeesStu/:fees/:stu', userHelpers.isLogin ,function(req, res) {
  paid.getPaidFeesStu(req.params.fees,req.params.stu,function(paids){
    res.send(paids);
  });
});
// delete paids by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  paid.updatePaid(req.params.id,{status:0},function(paids){
    res.send({result:paids});
  });
});
// get paids by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  paid.getAllPaidStatus(req.params.status,function(paids){
    res.send(paids);
  });
});

// get paids and stupro
router.get('/students/:classRoom/:year',userHelpers.isLogin , function(req, res) {
  //####################
  
      stuproMgr.getStudentClassRoomYear(req.params.classRoom,req.params.year,function(stupro){
        var _student=[];
        for (i in stupro.stu){
          paid.getPaidStuPro(stupro.stu[i]._id,function(paid){
          var obj={
            _id:stupro.stu[i]._id,
            name:stupro.stu[i].student.name
          };
          if(paid){
            obj.paidUp= paid[0].paidUp;

          }else{
            obj.paidUp= 0;
          }
          _student.push(obj);
          if(i == stupro.stu.length-1){
            res.send(_student);
          }
        });
        }
      });

  // res.send([
  //   {_id:1456165,name:"abdo",paidUp:500},
  //   {_id:8745175,name:"ahmed",paidUp:300},
  //   {_id:5214565,name:"taha",paidUp:1000},
  //   {_id:5489665,name:"salem",paidUp:0}
  // ]);
});

//get all paids By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  paid.getAllPaidesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(paidss){
    res.send(paidss);
  });
});
// get all paids
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  paid.getAllPaidCount(req.params.limit,req.params.page,function(paids){
    res.send(paids);
  });
});
// get  paids by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  paid.getPaidId(req.params.id,function(paids){
    res.send(paids);
  });
});


module.exports = router;
