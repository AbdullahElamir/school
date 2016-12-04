var model = require('../models');
var Fees1 = null;

module.exports = {

  getAllFees :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school;
    }
    model.Fees.find(q).populate('id_class').exec(function(err, Feeses){
      if(!err){
        cb(Feeses);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getFeesByClassRoom :function(school,classRoom,cb){
    var q= {
      status:1,
      year:classRoom.year,
      id_class:classRoom.class._id
    };
    if(school!= -1){
      q.school=school;
    }
    model.Fees.find(q).exec(function(err, Feeses){
      if(!err){
        cb(Feeses);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllFeesesBySearchValue
  getAllFeesesBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1,
      name:new RegExp(searchValue, 'i')
    };
    if(school!= -1){
      q.school=school;
    }
    model.Fees.count(q,function(err, count){
      model.Fees.find(q).populate('id_class').limit(limit).skip(page*limit).exec(function(err,Feeses){
        if(!err){
          cb({result:Feeses,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllFeesCount
  getAllFeesCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school;
    }
    model.Fees.count(q,function(err, count){
      model.Fees.find(q).limit(limit).populate('id_class').skip(page*limit).exec(function(err,Feeses){
        if(!err){
          cb({result:Feeses,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllFeesStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school;
    }
    model.Fees.find(q).populate('id_class').exec(function(err, Feeses){
      if(!err){
        cb(Feeses);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getFeesName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school;
    }
    model.Fees.find(q).populate('id_class').limit(30).exec(function(err, Feeses){
      if(!err){
        cb(Feeses);
      }else{
        cb(null);
      }
    });
  },

  getFeesId :function(id,cb){
    model.Fees.findOne({_id : id,status:1}).populate('id_class').exec(function(err, Feeses){
      if(!err){
        cb(Feeses);
      }else{
        cb(null);
      }
    });
  },

  addFees : function(body,cb){
    var obj =body;
    Fees1 = new model.Fees(obj);
    Fees1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateFees : function(id,body,cb){
    var obj = body;
    model.Fees.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getSumFees :function(id,cb){
    model.Fees.aggregate([
      {$match:{id_class:id}},
      {
        $group: {
          _id: '$id_class',
          sum: { $sum :'$amount'}
        }
      }
    ], function (err, results) {
      if (!err) {
        cb(results);
      } else {
        // console.log(err);
        cb(null);
      }
    });
  },
  getRequiredFees :function(school,cb){
    var date = new Date();
    // data to next month ........

    var q= {
      status:1,
      feesDate :{$lte : date}
    };
    if(school!= -1){
      q.school=school;
    }
    model.Fees.find(q).exec(function(err, Feeses){
      if(!err){
        cb(Feeses);
      }else{
        cb(null);
      }
    });
  }
  // deleteFees : function(id,cb){
  //   model.Fees.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }

};
