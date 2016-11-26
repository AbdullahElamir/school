
var model = require("../models");
var Stupro = null;

module.exports = {

  getAllStupro :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Stupro.find(q,function(err, Stupros){
      if(!err){
        cb(Stupros);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getStuProcessesByClassRoomAndYear: function(school,classRoom,year,cb){
    var q= {
      status:1,
      classRoom:classRoom,
      year:year
    };
    if(school!= -1){
      q.school=school
    }
    model.Stupro.find(q,'student',function(err, stupros){
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
  getAllStuprosCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Stupro.count(q,function(err, count){
      model.Stupro.find(q).limit(limit).skip(page*limit).exec(function(err,Stupros){
        if(!err){
          cb({result:Stupros,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllStuproStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
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
  getAllClassRoomeStudentsByYear : function(school,classRoom,year,cb){
    var q= {
      status:1,
      classRoom:classRoom,
      year:year
    };
    if(school!= -1){
      q.school=school
    }
    model.Stupro.find(q).populate('student')
    .exec(function(err,Stupros) {
      if(!err){
        cb(Stupros);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getStudentClassRoom : function(school,classRoom,cb){
    var q= {
      status:1,
      classRoom:classRoom,
    };
    if(school!= -1){
      q.school=school
    }
    model.Stupro.find(q).distinct('_id',function(err, Stupros){
      if(!err){
        model.Stupro.find(q).populate('student')
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
  getStuproRoom : function(school,classRoom,cb){
    var q= {
      status:1,
      classRoom:{$in:classRoom}
    };
    if(school!= -1){
      q.school=school
    }
    model.Stupro.find(q).distinct('student',function(err, Stupros){
      if(!err){
        cb(Stupros);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getStudentClassRoomYear : function(school,classRoom,year,cb){
    var q= {
      status:1,
      classRoom:classRoom,
      year:year
    };
    if(school!= -1){
      q.school=school
    }
    model.Stupro.find(q).distinct('_id',function(err, Stupros){
      if(!err){
        model.Stupro.find(q).populate('student')
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
  getStudentsSto : function(school,classRoom,student,cb){
    var q= {
      status:1,
      classRoom:classRoom,
      student:student
    };
    if(school!= -1){
      q.school=school
    }
    model.Stupro.findOne(q)
    .exec(function(err,Stupros) {
      if(!err){
        cb(Stupros._id);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  addStudentsProcess : function(school,classRoom,students,cb){
    var obj = {
      student:students._id,
      year:classRoom.year,
      classRoom:classRoom._id,
      school:school
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