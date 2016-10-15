var model = require("../models");
var teacher = null;
var userHelpers = require("./userHelpers");
module.exports = {

  getAllTeacher :function(school,cb){
    model.Teacher.find({school:school,status:1},function(err, teachers){
      if(!err){
        cb(teachers);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getTeachersBySearchValue
  // getTeachersBySearchValue :function(school,searchValue,limit,page,cb){
  //   page = parseInt(page);
  //   page-=1;
  //   limit = parseInt(limit);
  //   model.Teacher.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school},function(err, count){
  //     model.Teacher.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school}).limit(limit).skip(page*limit).exec(function(err,teachers){
  //       if(!err){
  //         cb({result:teachers,count:count});
  //       }else{
  //         // console.log(err);
  //         cb(null);
  //       }
  //     });
  //   });
  // },
  getTeachersBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Teacher.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school},function(err, count){
      model.Teacher.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school}).limit(limit).skip(page*limit).exec(function(err,teachers){
        model.Teacher.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school}).distinct('_id',function(err,teachersId){
          if(!err){
            cb({result:teachers,count:count,teachersId:teachersId});
          }else{
            // console.log(err);
            cb(null);
          }
        });
      });
    });
  },
  getAllTeacherCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Teacher.count({school:school,status:1},function(err, count){
      model.Teacher.find({school:school,status:1}).limit(limit).skip(page*limit).exec(function(err,teachers){
        if(!err){
          cb({result:teachers,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllTeacherStatus:function(school,status,cb){
    model.Teacher.find({status:status,school:school},function(err, teachers){
      if(!err){
        cb(teachers);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getTeacherName :function(school,name,cb){
    model.Teacher.find({name :{ $regex:name, $options: 'i' },school:school}).limit(30).exec(function(err, teachers){
      if(!err){
        cb(teachers);
      }else{
        cb(null);
      }
    });
  },

  getTeacherId :function(id,cb){
    model.Teacher.findOne({_id : id}, function(err, teachers){
      if(!err){
        cb(teachers);
      }else{
        cb(null);
      }
    });
  },
  getTeacherEmail :function(email,cb){
    model.Teacher.findOne({email : email}, function(err, teachers){
      if(!err){
        cb(teachers);
      }else{
        cb(null);
      }
    });
  },
  addTeacher : function(body,cb){
    var obj = body;
    userHelpers.Hash(body.password,function(hash){
      obj.password=hash.password;
      obj.salt=hash.salt;
      teacher = new model.Teacher(obj);
      teacher.save(function(err,result){
        if (!err) {
          cb(true);
        } else {
          // console.log(err);
          cb(false);
        }
      });
    });
  },

  updateTeacher : function(id,body,cb){
    var obj = body;
    model.Teacher.findOneAndUpdate({_id:id}, obj, function(err,teachers) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteTeacher : function(id,cb){
    model.Teacher.remove({_id:id}, function(err,result) {
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
      model.Teacher.findOneAndUpdate({_id:id,password:passwords.oldPass}, {password:passwords.newPass}, function(err,Teachers) {
        if (!err) {
          if(Teachers){
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
