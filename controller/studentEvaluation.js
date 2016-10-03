var model = require('../models');
var Stueva = null;

module.exports = {

  getAllStueva :function(cb){
    model.Stueva.find({}, function(err, Stuevas){
      if(!err){
        cb(Stuevas);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllStuevasCount
  getAllStuevaCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Stueva.count({},function(err, count){
      model.Stueva.find({}).limit(limit).skip(page*limit).exec(function(err,Stuevas){
        if(!err){
          cb({result:Stuevas,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllStuevaStatus:function(status,cb){
    model.Stueva.find({status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  

  getStuevaId :function(id,cb){
    model.Stueva.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addStueva : function(body,cb){
    var obj =body;
    Stueva = new model.Stueva(obj);
    Stueva.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateStueva : function(id,body,cb){
    obj = body;
    model.Stueva.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  
};