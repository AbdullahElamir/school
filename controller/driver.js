var model = require("../models");
var driver = null;

module.exports = {

  getAllDrivers :function(cb){
    model.Driver.find({},function(err, drivers){
      if(!err){
        cb(drivers);
      }else{
        // console.log(err);
        cb(null);
      } 
    });
  },

  //getAllDriversBySearchValue
  getAllDriversBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Driver.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]},function(err, count){
      model.Driver.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]}).limit(limit).skip(page*limit).exec(function(err,drivers){
        if(!err){
          cb({result:drivers,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllDriversCount
  getAllDriversCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Driver.count({},function(err, count){
      model.Driver.find({}).limit(limit).skip(page*limit).exec(function(err,drivers){
        if(!err){
          cb({result:drivers,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllDriversStatus:function(status,cb){
    model.Driver.find({status:status},function(err, drivers){
      if(!err){
        cb(drivers);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getDriverName :function(name,cb){
    model.Driver.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getDriverId :function(id,cb){
    model.Driver.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addDriver : function(body,cb){
    var obj = body;
    driver = new model.Driver(obj);
    driver.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateDriver : function(id,body,cb){
    var obj = body;
    model.Driver.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteDriver : function(id,cb){
    model.Driver.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }
  
};