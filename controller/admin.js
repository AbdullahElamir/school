var model = require("../models");
var Admin = null;
var userHelpers = require("./userHelpers");
module.exports = {

  getAllAdmin :function(school,cb){
    model.Admin.find({school:school,status:1},function(err, Admins){
      if(!err){
        cb(Admins);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAlladminsBySearchValue
  getAllAdminsBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Admin.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school},function(err, count){
      model.Admin.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school}).limit(limit).skip(page*limit).exec(function(err,admins){
        model.Admin.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school}).distinct('_id',function(err,adminsId){
        
          if(!err){
            cb({result:admins,count:count,adminsId:adminsId});
          }else{
            // console.log(err);
            cb(null);
          }
        });
      });
    });
  },

  //getAdminsBySearchValue
  getAdminsBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Admin.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school},function(err, count){
      model.Admin.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school}).limit(limit).skip(page*limit).exec(function(err,Admins){
        if(!err){
          cb({result:Admins,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllAdminCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Admin.count({school:school,status:1},function(err, count){
      model.Admin.find({school:school,status:1}).limit(limit).skip(page*limit).exec(function(err,Admins){
        if(!err){
          cb({result:Admins,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllAdminStatus:function(school,status,cb){
    model.Admin.find({school:school,status:status},function(err, Admins){
      if(!err){
        cb(Admins);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getAdminName :function(school,name,cb){
    model.Admin.find({name :{ $regex:name, $options: 'i' },school:school}).limit(30).exec(function(err, Admins){
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
      // console.log("Admins");
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
    var obj = body;
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
    var obj = body;

    model.Admin.findOneAndUpdate({_id:id}, obj, function(err,Admins) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteAdmin : function(id,cb){
    model.Admin.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  },

  changePass : function(id,passwords,cb){
    if(passwords.newPass === passwords.confirmPass){
      model.Admin.findOneAndUpdate({_id:id,password:passwords.oldPass}, {password:passwords.newPass}, function(err,Admins) {
        if (!err) {
          if(Admins){
            cb(1); // successfully changed
          }else{
            cb(2); //wrong password
          }
        } else {
          // console.log(err);
          cb(3); //error
        }
      });
    }else{
      cb(4); //passwords are not match
    }
  }

};
