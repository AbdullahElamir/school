var model = require("../models");
var Admin = null;
var userHelpers = require("./userHelpers");
module.exports = {

  getAllAdmin :function(cb){
    model.Admin.find({},function(err, Admins){
      if(!err){
        cb(Admins);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  //getAlladminsBySearchValue
  getAllAdminsBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Admin.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]},function(err, count){
      model.Admin.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]}).limit(limit).skip(page*limit).exec(function(err,admins){
        if(!err){
          cb({result:admins,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAdminsBySearchValue
  getAdminsBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Admin.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]},function(err, count){
      model.Admin.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]}).limit(limit).skip(page*limit).exec(function(err,Admins){
        if(!err){
          cb({result:Admins,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllAdminCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Admin.count({},function(err, count){
      model.Admin.find({}).limit(limit).skip(page*limit).exec(function(err,Admins){
        if(!err){
          cb({result:Admins,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllAdminStatus:function(status,cb){
    model.Admin.find({status:status},function(err, Admins){
      if(!err){
        cb(Admins);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getAdminName :function(name,cb){
    model.Admin.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, Admins){
      if(!err){
        cb(Admins);
      }else{
        cb(null);
      }
    });
  },

  getAdminId :function(id,cb){
    model.Admin.findOne({_id : id}, function(err, Admins){
      if(!err){
      console.log("Admins");
        cb(Admins);
      }else{
        cb(null);
      }
    });
  },
  getAdminEmail :function(email,cb){
    model.Admin.findOne({email : email}, function(err, Admins){
      if(!err){
        cb(Admins);
      }else{
        cb(null);
      }
    });
  },
  addAdmin : function(body,cb){
    obj = body;
    userHelpers.Hash(body.password,function(hash){
      obj.password=hash.password;
      obj.salt=hash.salt;
      Admin = new model.Admin(obj);
      Admin.save(function(err,result){
        if (!err) {
          cb(true);
        } else {
          console.log(err);
          cb(false);
        }
      });
    });
  },

  updateAdmin : function(id,body,cb){
    obj = body;

    model.Admin.findOneAndUpdate({_id:id}, obj, function(err,Admins) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  deleteAdmin : function(id,cb){
    model.Admin.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        console.log(err);
        cb(3);
      }
    });
  },

};
