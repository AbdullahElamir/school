var model = require('../models');

module.exports = {

  getAllInOutcomeTypes :function(cb){
    model.InOutcomeType.find({}, function(err, InOutcomeTypes){
      if(!err){
        cb(InOutcomeTypes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  //getAllInOutcomeTypesBySearchValue
  getAllInOutcomeTypesBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.InOutcomeType.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.InOutcomeType.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,InOutcomeTypes){
        if(!err){
          cb({result:InOutcomeTypes,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllInOutcomeTypesCount
  getAllInOutcomeTypesCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.InOutcomeType.count({},function(err, count){
      model.InOutcomeType.find({}).limit(limit).skip(page*limit).exec(function(err,InOutcomeTypes){
        if(!err){
          cb({result:InOutcomeTypes,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getInOutcomeTypesId :function(id,cb){
    model.InOutcomeType.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addInOutcomeTypes : function(body,cb){
    var obj =body;
    InOutcomeTypes1 = new model.InOutcomeType(obj);
    InOutcomeTypes1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateInOutcomeTypes : function(id,body,cb){
    obj = body;
    model.InOutcomeType.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  deleteInOutcomeTypes : function(id,cb){
    model.InOutcomeType.remove({_id:id}, function(err,result) {
      if (!err) {
        cb({result : 2});
      } else {
        console.log(err);
        cb({result : 3});
      }
    });
  }

};
