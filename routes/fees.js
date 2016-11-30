var express = require('express');
var router = express.Router();
var feesMgr = require("../controller/fees");
var classRoomMgr = require("../controller/classRoom");
var paidMgr = require("../controller/classRoom");
var stuProMgr = require("../controller/studentProcess");
var userHelpers = require("../controller/userHelpers");


router.get('/all', userHelpers.isLogin ,userHelpers.isAdmin,function(req, res){
  feesMgr.getAllFees(req.session.school,function(fees){
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
  feesMgr.getAllFeesStatus(req.session.school,req.params.status,function(fees){
    res.send(fees);
  });
});
// get fees by name
router.get('/name/:name',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.getFeesName(req.session.school,req.params.name,function(fees){
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
//required fees
router.get('/required/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  var results = [];
  var filterStudents = function(clrStudents,fee,students,lastOne){
    for(var std in clrStudents){
      var found = false;
      for(var s in students){
        if(s.StuPro._id === std._id){
          found = true;
          break;
        }
      }
      if(!found){
        results.push({
          studentName:clrStudents[std].name,
          name:fee.name,
          amount:fee.amount,
          date:fee.feesDate
        });
      }
      if(lastOne){
        res.send({data:results,count:0});
      }
    }
  };
  feesMgr.getRequiredFees(req.session.school,function(fees){
    var fun = function(fee,lastOne){
      paidMgr.studentsPaidFees(fee,function(students){
        classRoomMgr.getClassRoomClass(fee.id_class,function(classRooms){
          stuProMgr.getStudentsOfClassRooms(classRooms,function(clrStudents){
            filterStudents(clrStudents,fee,students,lastOne);
          });
        });
      });
    };
    for(var fee in fees){
    console.log("saaas");
      fun(fees[fee],fee === fees.length-1);
    }
  });
});

//get all fees By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.getAllFeesesBySearchValue(req.session.school,req.params.searchValue,req.params.limit,req.params.page,function(feess){
    res.send(feess);
  });
});
router.get('/classRoom/:classRoom',userHelpers.isLogin,userHelpers.isAdmin , function(req, res){
  classRoomMgr.getClassRoomId(req.session.school,req.params.classRoom,function(Croom){
    feesMgr.getFeesByClassRoom(Croom,function(fees){
      res.send(fees);
    });
  });
});
// get all fees
router.get('/:limit/:page',userHelpers.isLogin ,userHelpers.isAdmin, function(req, res){
  feesMgr.getAllFeesCount(req.session.school,req.params.limit,req.params.page,function(fees){
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
