
var model = require("../models");
var Stupro = null;

module.exports = {

  getAllStupro :function(cb){
    model.Stupro.find({},function(err, Stupros){
      if(!err){
        cb(Stupros);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getStuProcessesByClassRoomAndYear: function(classRoom,year,cb){
    model.Stupro.find({classRoom:classRoom,year:year},'student',function(err, stupros){
      if(!err){
        var array = [];
        if( stupros.length == 0){
          cb([]);
          return;
        }
        for( var i in stupros ){
          array.push(stupros[i].student);
          if( i == stupros.length -1 ){
            cb(array);
          }
        }
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllCustomerCount
  getAllStuprosCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Stupro.count({},function(err, count){
      model.Stupro.find({}).limit(limit).skip(page*limit).exec(function(err,Stupros){
        if(!err){
          cb({result:Stupros,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllStuproStatus:function(status,cb){
    model.Stupro.find({status:status},function(err, Stupros){
      if(!err){
        cb(Stupros);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  


  getStuproId :function(id,cb){
    model.Stupro.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addStupro : function(body,cb){
    var obj = body;
    Stupro = new model.Stupro(obj);
    Stupro.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateStupro : function(id,body,cb){
    var obj = body;
    model.Stupro.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getAllClassRoomeStudentsByYear : function(classRoom,year,cb){
    model.Stupro.find({classRoom:classRoom,year:year}).populate('student')
    .exec(function(err,Stupros) {
      if(!err){
        cb(Stupros);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getStudentClassRoom : function(classRoom,cb){
    
    model.Stupro.find({classRoom:classRoom}).distinct('_id',function(err, Stupros){
      if(!err){
        model.Stupro.find({classRoom:classRoom}).populate('student')
        .exec(function(err,Stu) {
          if(!err){
            cb({StuP:Stupros,stu:Stu});
          }else{
            // console.log(err);
            cb(null);
          }
        });
      }else{
        // console.log(err);
        cb(null);
      }
      
    });
  },
  getStuproRoom : function(classRoom,cb){
    model.Stupro.find({classRoom:{$in:classRoom}}).distinct('student',function(err, Stupros){
      if(!err){
        cb(Stupros);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getStudentClassRoomYear : function(classRoom,year,cb){
    model.Stupro.find({classRoom:classRoom,year:year}).distinct('_id',function(err, Stupros){
      if(!err){
        model.Stupro.find({classRoom:classRoom,year:year}).populate('student')
        .exec(function(err,Stu) {
          if(!err){
            cb({StuP:Stupros,stu:Stu});
          }else{
            // console.log(err);
            cb(null);
          }
        });
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getStudentsSto : function(classRoom,student,cb){
    model.Stupro.findOne({classRoom:classRoom,student:student})
    .exec(function(err,Stupros) {
      if(!err){
        cb(Stupros._id);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  addStudentsProcess : function(classRoom,students,cb){
    var obj = {
      student:students._id,
      year:classRoom.year,
      classRoom:classRoom._id
    };
    model.Stupro.findOneAndUpdate(obj,{description:"NULL"}, function(err, stup){
      if(!err){
        if(stup){
          cb(true);
        }else{
          Stupro = new model.Stupro(obj);
          Stupro.save(function(err){
            if (!err) {
              cb(true);  
            } else {
              // console.log(err);
              cb(false);
            }
          });
        }
      }else{
        cb(null);
      }
    });
  },
  getStuPro : function(id,cb){
    model.Stupro.findOne({_id:id}).populate('student')
    .exec(function(err,Stu) {
      if(!err){
        cb(Stu);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  }
};