
var model = require("../models");
var parent = null;

module.exports = {

  getAllParent :function(cb){
    model.Parent.find({},function(err, parents){
      if(!err){
        cb(parents);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  //getAllParentCount
  getAllParentCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Parent.count({},function(err, count){
      model.Parent.find({}).limit(limit).skip(page*limit).exec(function(err,parents){
        if(!err){
          cb({result:parents,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllParentStatus:function(status,cb){
    model.Parent.find({status:status},function(err, parents){
      if(!err){
        cb(parents);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getParentName :function(name,cb){
    model.Parent.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, parents){
      if(!err){
        cb(parents);
      }else{
        cb(null);
      }
    });
  },

  getParentId :function(id,cb){
    model.Parent.findOne({_id : id}, function(err, parents){
      if(!err){
        cb(parents);
      }else{
        cb(null);
      }
    });
  },

  addParent : function(body,cb){
    obj = body
    parent = new model.Parent(obj);
    parent.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateParent : function(id,body,cb){
    obj = body
    console.log(body);
    console.log(id);
    model.Parent.findOneAndUpdate({_id:id}, obj, function(err,parents) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  deleteParent : function(id,cb){
    model.Parent.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2)
      } else {
        console.log(err);
        cb(3);
      }
    });
  },
  
};