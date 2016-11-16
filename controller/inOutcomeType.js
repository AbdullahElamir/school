var model = require('../models');

module.exports = {

  getAllInOutcomeTypes :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.InOutcomeType.find(q, function(err, InOutcomeTypes){
      if(!err){
        cb(InOutcomeTypes);
      }else{
        cb(null);
      }
    });
  },

  //getAllInOutcomeTypesBySearchValue
  getAllInOutcomeTypesBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1,
      name:new RegExp(searchValue, 'i')
    };
    if(school!= -1){
      q.school=school
    }
    model.InOutcomeType.count(q,function(err, count){
      model.InOutcomeType.find(q).limit(limit).skip(page*limit).exec(function(err,InOutcomeTypes){
        if(!err){
          cb({result:InOutcomeTypes,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllInOutcomeTypesCount
  getAllInOutcomeTypesCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.InOutcomeType.count(q,function(err, count){
      model.InOutcomeType.find(q).limit(limit).skip(page*limit).exec(function(err,InOutcomeTypes){
        if(!err){
          cb({result:InOutcomeTypes,count:count});
        }else{
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
    var InOutcomeTypes1 = new model.InOutcomeType(obj);
    InOutcomeTypes1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  updateInOutcomeTypes : function(id,body,cb){
    var obj = body;
    model.InOutcomeType.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  deleteInOutcomeTypes : function(id,cb){
    model.InOutcomeType.remove({_id:id}, function(err) {
      if (!err) {
        cb({result : 2});
      } else {
        cb({result : 3});
      }
    });
  }

};
