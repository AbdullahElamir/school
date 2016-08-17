var generatePassword = require('password-generator'),
easyPbkdf2 = require("easy-pbkdf2")();
var model = require("../models");
var subject = null;

module.exports = {

  getAllSubject :function(cb){
    model.Subject.find({},function(err, Subjects){
      if(!err){
        cb(Subjects);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  //getAllCustomerCount
  getAllSubjectCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Subject.count({},function(err, count){
      model.Subject.find({}).limit(limit).skip(page*limit).exec(function(err,subjects){
        if(!err){
          cb({result:subjects,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllSubjectStatus:function(status,cb){
    model.Subject.find({status:status},function(err, subjects){
      if(!err){
        cb(subjects);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getSubjectName :function(name,cb){
    model.Subject.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getSubjectId :function(id,cb){
    model.Subject.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addSubject : function(body,cb){
    var obj ={
      name : body.name,
      description : body.description,
      studyId : body.studyId

    }

    subject = new model.Subject(obj);
    subject.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateSubject : function(id,body,cb){
    // obj = body
    var obj ={
      name : body.name,
      description : body.description,
      studyId : body.studyId
    }
    model.Subject.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  deleteClass : function(id,cb){
    model.Study.find({customer:id}, function(err,resul) {
      if(resul.length > 0){
        cb(1)
      } else{
        model.Subject.remove({_id:id}, function(err,result) {
          if (!err) {
            cb(2)
          } else {
            console.log(err);
            cb(3);
          }
        });
      }
    });
  },
  
};