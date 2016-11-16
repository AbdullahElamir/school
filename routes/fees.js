var express = require('express');
var router = express.Router();
var feesMgr = require("../controller/fees");
var classRoomMgr = require("../controller/classRoom");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res){
  feesMgr.getAllFees(req.user.school,function(fees){
    res.send(fees);
  });
});

// add new  class fees
router.post('/add', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res){
  feesMgr.addFees(req.body,function(fees){
    res.send(fees);
  });

});

// edit fees by id
router.put('/edit/:id', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res){
  feesMgr.updateFees(req.params.id,req.body,function(fees){
    res.send(fees);
  });
});

// delete fees by id
router.delete('/delete/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.updateFees(req.params.id,{status:0},function(fees){
    res.send({result:fees});
  });
});
// get fees by status
router.get('/status/:status',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.getAllFeesStatus(req.user.school,req.params.status,function(fees){
    res.send(fees);
  });
});
// get fees by name
router.get('/name/:name',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.getFeesName(req.user.school,req.params.name,function(fees){
    res.send(fees);
  });
});

//get total fees of a class in specific year
router.get('/total/:classRoom/:year',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  classRoomMgr.getClassRoomId(req.params.classRoom,function(Croom){
    feesMgr.getSumFees(Croom.class,function(fees){
      if(fees){
        res.send({amount:fees[0].sum});
      }else{
        res.send({amount:0});
      }
    });
  });
});

//get all fees By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.getAllFeesesBySearchValue(req.user.school,req.params.searchValue,req.params.limit,req.params.page,function(feess){
    res.send(feess);
  });
});
router.get('/classRoom/:classRoom',userHelpers.isLogin,userHelpers.isAdmin , function(req, res){
  classRoomMgr.getClassRoomId(req.user.school,req.params.classRoom,function(Croom){
    feesMgr.getFeesByClassRoom(Croom,function(fees){
      res.send(fees);
    });
  });
});
// get all fees
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.getAllFeesCount(req.user.school,req.params.limit,req.params.page,function(fees){
    res.send(fees);
  });
});
// get  fees by id
router.get('/:id',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.getFeesId(req.params.id,function(fees){
    res.send(fees);
  });
});

module.exports = router;
