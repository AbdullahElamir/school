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
      teacher.save(function(err){
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
    model.Teacher.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteTeacher : function(id,cb){
    //a function is called to delete
    var deleteFun= function(){
      model.Teacher.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["ClassRoom","TeacherAttendance","TSC","transferProcessTeachers","TransferProcess","Committee"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        var collection = collections.pop();
        var col = {teacher:id};
        if(collection === "TransferProcess"){
          col = {supervisor:id};
        }else if (collection === "Committee"){
          col = {"proctors.examCommitteeProctors":id};
        }
        model[collection].find(col,function(err,result){
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
