var model = require('../models');
var SystemYear = null;

module.exports = {

  getAllSystemYear :function(cb){
    model.SystemYear.find({}, function(err, SystemYears){
      if(!err){
        cb(SystemYears);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  


  //getAllSystemYearsCount
  getAllSystemYearCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.SystemYear.count({},function(err, count){
      model.SystemYear.find({}).limit(limit).skip(page*limit).exec(function(err,SystemYears){
        if(!err){
          cb({result:SystemYears,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllSystemYearStatus:function(status,cb){
    model.SystemYear.find({status:status},function(err, SystemYears){
      if(!err){
        cb(SystemYears);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getSystemYear:function(year,cb){
    model.SystemYear.findOne({year:year},function(err, SystemYears){
      if(!err){
        cb(SystemYears);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getSystemYearId :function(id,cb){
    model.SystemYear.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addSystemYear : function(body,cb){
    var obj =body;
    SystemYear = new model.SystemYear(obj);
    SystemYear.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateSystemYear : function(id,body,cb){
    var obj = body;
    model.SystemYear.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  }
  

};