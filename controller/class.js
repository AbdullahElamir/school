var model = require('../models');
var class1 = null;

module.exports = {

  getAllClass :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Class.find(q, function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  getClassesByYear :function(school,year_id,cb){
    var q= {
      status:1,
       _id:year_id
    };
    if(school!= -1){
      q.school=school
    }
    model.Year.findOne(q, function(err, year_obj){
      if(!err){
        var w ={
           _id:year_obj.system
        }
        if(school!= -1){
          q.school=school
        }
        model.System.findOne(w)
        .populate('sys_class.id_class')
        .exec(function(err, system){
          if(!err){
            var classes = [];
            if( system.sys_class.length === 0 ){
              cb([]);
              return;
            }
            for(var i in system.sys_class ){
              classes.push(system.sys_class[i].id_class);
              if( i == system.sys_class.length-1 ){
                cb(classes);
              }
            }
          }else{
            cb(null);
          }
        });
      }else{
        cb(null);
      }
    });
  },

  getExamsByYearAndClass : function(school,year,clas,cb){
    var q= {
      status:1,
       _id:year
    };
    if(school!= -1){
      q.school=school
    }
    model.Year.findOne(q, function(err, year_obj){
      if(!err){
        var w ={
          system:year_obj.system ,
          clas:clas,
          type : { $ne: 2 } 
        }
        if(school!= -1){
          q.school=school
        }
        model.Exam.find(q,function(err, exams){
          if(!err){
            cb(exams);
          } else {
            cb(null);
          }
        });
      } else {
        cb(null);
      }
    });
  },

  //getAllClassesBySearchValue
  getAllClassesBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1,
      name:new RegExp(searchValue, 'i')
    };
    if(school!= -1){
      q.school=school
    }
    model.Class.count(q,function(err, count){
      model.Class.find(q).limit(limit).skip(page*limit).populate("prevClass").exec(function(err,classes){
        if(!err){
          cb({result:classes,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllCustomerCount
  getAllClassCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Class.count(q,function(err, count){
      model.Class.find(q).limit(limit).skip(page*limit).populate("prevClass").exec(function(err,classes){
        if(!err){
          cb({result:classes,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getAllClassRoomsByClassAndYear : function(school,clas,year,cb){
    var q= {
      status:1,
      class:clas,
      year:year
    };
    if(school!= -1){
      q.school=school
    }
    model.ClassRoom.find(q,function(err, classRooms){
      if(!err){
        cb(classRooms);
      }else{
        cb(null);
      }
    });
  },

  getAllClassStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Class.find(q,function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  getClassName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.Class.find(q).limit(30).exec(function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  getClassId :function(id,cb){
    model.Class.findOne({_id : id}, function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  addClass : function(body,cb){
    var obj =body;
    class1 = new model.Class(obj);
    class1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  updateClass : function(id,body,cb){
    var obj = body;
    model.Class.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  deleteClass : function(id,cb){
    model.Class.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  }

};
