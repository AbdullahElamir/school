var model = require("../models");
var Admin = null;
var userHelpers = require("./userHelpers");
module.exports = {

  getAllAdmin :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Admin.find(q,function(err, Admins){
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
    var q= {
      $or :[
        {name:new RegExp(searchValue, 'i')},
        {nid:new RegExp(searchValue, 'i')}
      ]
    };
    if(school!= -1){
      q.school=school
    }
    model.Admin.count(q,function(err, count){
      model.Admin.find(q).limit(limit).skip(page*limit).exec(function(err,admins){
        model.Admin.find(q).distinct('_id',function(err,adminsId){
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
    var q= {
      $or :[
        {name:new RegExp(searchValue, 'i')},
        {nid:new RegExp(searchValue, 'i')}
      ]
    };
    if(school!= -1){
      q.school=school
    }
    model.Admin.count(q,function(err, count){
      model.Admin.find(q).limit(limit).skip(page*limit).exec(function(err,Admins){
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
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Admin.count(q,function(err, count){
      model.Admin.find(q).limit(limit).skip(page*limit).exec(function(err,Admins){
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
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Admin.find(q,function(err, Admins){
      if(!err){
        cb(Admins);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getAdminName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school != -1){
      q.school=school
    }
    model.Admin.find(q).limit(30).exec(function(err, Admins){
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
      Admin.save(function(err){
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
    if(body.password){
      userHelpers.Hash(body.password,function(hash){
        obj.password=hash.password;
        obj.salt=hash.salt;
        model.Admin.findOneAndUpdate({_id:id}, obj, function(err) {
          if (!err) {

            cb(true);
          } else {
            // console.log(err);
            cb(false);
          }
        });
      });
    }else{
      model.Admin.findOneAndUpdate({_id:id}, obj, function(err) {
        if (!err) {

          cb(true);
        } else {
          // console.log(err);
          cb(false);
        }
      });
    }
  },

  deleteAdmin : function(id,cb){
    //a function is called to delete
    var deleteFun= function(){
      model.Admin.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["AdminAttendance","InOutcome"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        model[collections.pop()].find({admin:id},function(err,result){
          if(!err){
            //contenue finding in the other collections
            if(result.length===0){
              check();
            }else{
              //this means that there is a document that have this id and we shouldn't delete
              cb(1);
            }
          }else {
            //error
            cb(3);
          }
        });
      }else{
        //this means that we finished the all collections array so delete
        deleteFun();
      }
    };
    check();
  },

  changePass : function(id,passwords,cb){
    if(passwords.newPass === passwords.confirmPass){
      userHelpers.Hash(passwords.oldPass,function(hash){
        model.Admin.findOneAndUpdate({_id:id,password:hash.password}, {password:passwords.newPass}, function(err,Admins) {
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
      });
    }else{
      cb(4); //passwords are not match
    }
  }

};
