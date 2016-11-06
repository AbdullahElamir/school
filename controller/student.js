
var model = require("../models");
var student = null;

module.exports = {

 


  // Student id genrate 
  StudentGenerateId :function(gender,cb){
    // number contains
    // 1- (1) = male 
    // 2- (2) = female 
    // 3- (2007) year 
    // 4- (0001) sequance number 
    // 1+2+3+4
    //generated number 
    // 220070001
    model.Student.find({status:1}).sort({'_id':-1}).limit(1).exec(function(err, students){
      var lastYear = new Date();
      // insert for first time 
      if(students.length == 0){
        var year = gender.toString()+lastYear.getFullYear()+""+"0001"
        Id = year+"";
        cb(Id);
      } else {  
        if(!err){
          var lastYear = new Date();
          var number = students[0].studentid 
          var s = number+"";
          while (s.length < 4) s = "0" + s;
          var year = gender.toString()+lastYear.getFullYear()+""+s
          Id = year+"";
          console.log(Id);
          cb(Id);
        }else{
          // console.log(err);
          cb(null);
        }
      }
    });
  },

   

 




  getAllStudent :function(school,cb){
    model.Student.find({school:school,status:1},function(err, students){
      if(!err){
        cb(students);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getStudentByStuProcessAndSearchValue : function(stuProsIds,text,cb){
    model.Student.find({_id : { $in : stuProsIds } , $or :[{name:new RegExp(text, 'i')},{nid:new RegExp(text, 'i')}] },function(err,students){
      if(!err){
        cb(students);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },


  //getAllStudentsBySearchValue
  getAllStudentsBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Student.count({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school},function(err, count){
      model.Student.find({$or :[{name:new RegExp(searchValue, 'i')},{nid:new RegExp(searchValue, 'i')}],school:school}).limit(limit).skip(page*limit).populate("clas").exec(function(err,students){
        if(!err){
          cb({result:students,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllCustomerCount
  getAllStudentsCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Student.count({school:school,status:1},function(err, count){
      model.Student.find({school:school,status:1}).limit(limit).skip(page*limit).populate("clas").exec(function(err,students){
        if(!err){
          cb({result:students,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllStudentStatus:function(school,status,cb){
    model.Student.find({status:status,school:school},function(err, students){
      if(!err){
        cb(students);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getStudentName :function(school,name,cb){
    model.Student.find({name :{ $regex:name, $options: 'i' },school:school}).limit(30).exec(function(err, custom){
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
    var obj = body;
    obj.startDate = new Date();
    student = new model.Student(obj);
    student.save(function(err){
//      console.log(err);
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateStudent : function(id,body,cb){
    var obj = body;
    model.Student.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteStudent : function(id,cb){
    model.Student.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  },
  getStudentStupro : function(school,name,stupro,cb){
    model.Student.find({$and:[{name :{ $regex:name, $options: 'i' }},{_id:{$in:stupro}}],school:school},function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },
  getStudentAllID:function(school,id,cb){
    model.Student.find({_id:{$in:id},school:school},function(err, students){
      if(!err){
        cb(students);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  }
};
