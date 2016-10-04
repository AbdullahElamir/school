var model = require('../models');
var Paid1 = null;

module.exports = {

  getAllPaid :function(cb){
    model.Paid.find({status:1}).populate('id_fees').populate('StuPro').exec(function(err, Paides){
      if(!err){
        cb(Paides);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllPaidesBySearchValue
  getAllPaidesBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Paid.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Paid.find({name:new RegExp(searchValue, 'i')}).populate('id_fees').populate('StuPro').limit(limit).skip(page*limit).exec(function(err,Paides){
        if(!err){
          cb({result:Paides,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllPaidCount
  getAllPaidCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Paid.count({status:1},function(err, count){
      model.Paid.find({status:1}).limit(limit).populate('id_fees').populate('StuPro').skip(page*limit).exec(function(err,Paides){
        if(!err){
          cb({result:Paides,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllPaidStatus:function(status,cb){
    model.Paid.find({status:status}).populate('id_fees').populate('StuPro').exec(function(err, Paides){
      if(!err){
        cb(Paides);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  

  getPaidId :function(id,cb){
    model.Paid.findOne({_id : id,status:1}).populate('id_fees').populate('StuPro').exec(function(err, Paides){
      if(!err){
        cb(Paides);
      }else{
        cb(null);
      }
    });
  },
  getPaidFees :function(fees,cb){
    model.Paid.find({id_fees : fees,status:1}).populate('id_fees').populate('StuPro').exec(function(err, Paides){
      if(!err){
        cb(Paides);
      }else{
        cb(null);
      }
    });
  },
  getPaidStu:function(stu,cb){
    model.Paid.find({StuPro : stu,status:1}).populate('id_fees').populate('StuPro').exec(function(err, Paides){
      if(!err){
        cb(Paides);
      }else{
        cb(null);
      }
    });
  },

  getPaidFeesStu :function(fees,stu,cb){
    model.Paid.find({id_fees : fees,status:1,StuPro:stu}).populate('id_fees').populate('StuPro').exec(function(err, Paides){
      if(!err){
        cb(Paides);
      }else{
        cb(null);
      }
    });
  },

  getPaidId :function(id,cb){
    model.Paid.findOne({_id : id,status:1}).populate('id_fees').populate('StuPro').exec(function(err, Paides){
      if(!err){
        cb(Paides);
      }else{
        cb(null);
      }
    });
  },
  getPaidReceip :function(num,cb){
    model.Paid.findOne({receip_num : num,status:1}).populate('id_fees').populate('StuPro').exec(function(err, Paides){
      if(!err){
        cb(Paides);
      }else{
        cb(null);
      }
    });
  },
  addPaid : function(body,cb){
    var obj =body;
    Paid1 = new model.Paid(obj);
    Paid1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updatePaid : function(id,body,cb){
    obj = body;
    model.Paid.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  getPaidStuPro:function(id,cb){
    model.Paid.aggregate([
      {$match:{StuPro:id}},
      { $group: {
        _id: '$StuPro',
        paidUp: { $sum :'$paidUp'}
        }
      }
    ], function (err, results) {
      if (!err) {
          cb(results);
      } else {
        console.log(err);
        cb(null);
      }
    });
  },

  // deletePaid : function(id,cb){
  //   model.Paid.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }
  
};