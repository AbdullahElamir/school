
var model = require("../models");
var student = null;

module.exports = {

  getAllStudent :function(cb){
    model.Student.find({},function(err, students){
      console.log("fff");
      if(!err){
        cb(students);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },



  //getAllStudentsBySearchValue
  getAllStudentsBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Student.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]},function(err, count){
      model.Student.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}]}).limit(limit).skip(page*limit).exec(function(err,students){
        if(!err){
          cb({result:students,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllCustomerCount
  getAllStudentsCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Student.count({},function(err, count){
      model.Student.find({}).limit(limit).skip(page*limit).exec(function(err,students){
        if(!err){
          cb({result:students,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllStudentStatus:function(status,cb){
    model.Student.find({status:status},function(err, students){
      if(!err){
        cb(students);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getStudentName :function(name,cb){
    model.Student.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getStudentId :function(id,cb){
    model.Student.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addStudent : function(body,cb){
    obj = body

    student = new model.Student(obj);
    student.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateStudent : function(id,body,cb){
    obj = body
    model.Student.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  deleteStudent : function(id,cb){
    model.Student.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        console.log(err);
        cb(3);
      }
    });
  }
  
};