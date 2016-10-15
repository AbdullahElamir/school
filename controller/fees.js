var model = require('../models');
var Fees1 = null;

module.exports = {

  getAllFees :function(cb){
    model.Fees.find({status:1}).populate('id_class').exec(function(err, Feeses){
      if(!err){
        cb(Feeses);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllFeesesBySearchValue
  getAllFeesesBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Fees.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Fees.find({name:new RegExp(searchValue, 'i')}).populate('id_class').limit(limit).skip(page*limit).exec(function(err,Feeses){
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
  getAllFeesCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Fees.count({status:1},function(err, count){
      model.Fees.find({status:1}).limit(limit).populate('id_class').skip(page*limit).exec(function(err,Feeses){
        if(!err){
          cb({result:Feeses,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllFeesStatus:function(status,cb){
    model.Fees.find({status:status}).populate('id_class').exec(function(err, Feeses){
      if(!err){
        cb(Feeses);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  getFeesName :function(name,cb){
    model.Fees.find({name :{ $regex:name, $options: 'i' }}).populate('id_class').limit(30).exec(function(err, Feeses){
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
    Fees1.save(function(err,result){
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
    model.Fees.findOneAndUpdate({_id:id}, obj, function(err,result) {
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