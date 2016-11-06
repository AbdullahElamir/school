var model = require("../models");
var bus = null;

module.exports = {

  getAllBuses :function(school,cb){
    model.Bus.find({school:school},function(err, buses){
      if(!err){
        cb(buses);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllBusesBySearchValue
  getAllBusesBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Bus.count({school:school,$or :[{name:new RegExp(searchValue, 'i')},{plateNumber:new RegExp(searchValue, 'i')}]},function(err, count){
      model.Bus.find({school:school,$or :[{name:new RegExp(searchValue, 'i')},{plateNumber:new RegExp(searchValue, 'i')}]}).limit(limit).skip(page*limit).exec(function(err,buses){
        if(!err){
          cb({result:buses,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllBusesCount
  getAllBusesCount :function(school,imit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Bus.count({school:school},function(err, count){
      model.Bus.find({school:school}).limit(limit).skip(page*limit).exec(function(err,buses){
        if(!err){
          cb({result:buses,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllBusesStatus:function(status,cb){
    model.Bus.find({status:status},function(err, buses){
      if(!err){
        cb(buses);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getBusesName :function(name,cb){
    model.Bus.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getBusId :function(id,cb){
    model.Bus.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addBus : function(body,cb){
    var obj = body;
    bus = new model.Bus(obj);
    bus.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateBus : function(id,body,cb){
    var obj = body;
    model.Bus.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteBus : function(id,cb){
    model.Bus.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }

};
