var userHelpers = require("./userHelpers");
var model = require("../models");
var parent = null;

module.exports = {

  getAllParent :function(school,cb){
    model.Parent.find({school:school,status:1},function(err, parents){
      if(!err){
        cb(parents);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  
  //getAllParentsBySearchValue
  getAllParentsBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Parent.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school},function(err, count){
      model.Parent.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school}).limit(limit).skip(page*limit).exec(function(err,parents){
        if(!err){
          cb({result:parents,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },


  //getAllParentCount
  getAllParentCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Parent.count({school:school,status:1},function(err, count){
      model.Parent.find({school:school,status:1}).limit(limit).skip(page*limit).exec(function(err,parents){
        if(!err){
          cb({result:parents,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllParentStatus:function(school,status,cb){
    model.Parent.find({status:status,school:school},function(err, parents){
      if(!err){
        cb(parents);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  getParentName :function(school,name,cb){
    model.Parent.find({name :{ $regex:name, $options: 'i' },school:school}).limit(30).exec(function(err, parents){
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
  getParentEmail :function(email,cb){
    model.Parent.findOne({email : email}, function(err, parents){
      if(!err){
        cb(parents);
      }else{
        cb(null);
      }
    });
  },
  addParent : function(body,cb){
    var obj = body;
    userHelpers.Hash(body.password,function(hash){
      obj.password=hash.password;
      obj.salt=hash.salt;
      parent = new model.Parent(obj);
      parent.save(function(err){
        if (!err) {
          cb(true);
        } else {
          // console.log(err);
          cb(false);
        }
      });
    });
  },

  updateParent : function(id,body,cb){
    var obj = body;
    model.Parent.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  
  deleteParent : function(id,cb){
    model.Parent.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }
  
};