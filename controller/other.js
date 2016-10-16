var model = require('../models');
var Other = null;

module.exports = {

  getAllOther :function(cb){
    model.Other.find({status:1}, function(err, Others){
      if(!err){
        cb(Others);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllOthersBySearchValue
  getAllOthersBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Other.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Other.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Others){
        if(!err){
          cb({result:Others,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllOthersCount
  getAllOtherCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Other.count({},function(err, count){
      model.Other.find({}).limit(limit).skip(page*limit).exec(function(err,Others){
        if(!err){
          cb({result:Others,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getOtherId :function(id,cb){
    model.Other.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addOther : function(body,cb){
    var obj =body;
    obj.date = new Date();
    Other = new model.Other(obj);
    Other.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateOther : function(id,body,cb){
    var obj = body;
    model.Other.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteOther : function(id,cb){
    model.Other.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }

};
