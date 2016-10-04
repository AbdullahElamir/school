var model = require("../models");
var teacher = null;
var userHelpers = require("./userHelpers");
module.exports = {

  getAllTeacher :function(cb){
    model.Teacher.find({},function(err, teachers){
      if(!err){
        cb(teachers);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  //getTeachersBySearchValue
  getTeachersBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Teacher.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]},function(err, count){
      model.Teacher.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]}).limit(limit).skip(page*limit).exec(function(err,teachers){
        if(!err){
          cb({result:teachers,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllTeacherCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Teacher.count({},function(err, count){
      model.Teacher.find({}).limit(limit).skip(page*limit).exec(function(err,teachers){
        if(!err){
          cb({result:teachers,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllTeacherStatus:function(status,cb){
    model.Teacher.find({status:status},function(err, teachers){
      if(!err){
        cb(teachers);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getTeacherName :function(name,cb){
    model.Teacher.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, teachers){
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
    obj = body;
    userHelpers.Hash(body.password,function(hash){
      obj.password=hash.password;
      obj.salt=hash.salt;
      teacher = new model.Teacher(obj);
      teacher.save(function(err,result){
        if (!err) {
          cb(true);
        } else {
          console.log(err);
          cb(false);
        }
      });
    });
  },

  updateTeacher : function(id,body,cb){
    obj = body;
    
    model.Teacher.findOneAndUpdate({_id:id}, obj, function(err,teachers) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  deleteTeacher : function(id,cb){
    model.Teacher.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        console.log(err);
        cb(3);
      }
    });
  },
};