var model = require("../models");
var system = null;

function setTS(system,sys_class,classRoom_id,yearId,counterOfClassRooms,sumOfClassRooms,cb){
  model.TSC.find({classRoom : classRoom_id,year:yearId})
  .populate('subject')
  .exec(function(err, ts){
    if(!err){
      counterOfClassRooms.value++;
      sys_class.ts.push(ts);
      if( counterOfClassRooms.value == sumOfClassRooms.value ){
        cb(system);
        return;
      }
    }
  });
}

function systemSetting(system,sys_class,yearId,counterOfClassRooms,sumOfClassRooms,cb){
  if( system.flag != 1 ){
    model.Fees.findOne({year:yearId,id_class:sys_class.id_class._id}).exec(function(err,fessResult){
      if(!err){
        if( fessResult == null ){  // get new system setting
          system.flag = 1;
          cb(system);
          return;
        }else{                     // get edit system setting
          system.flag = 2;
          sys_class.fees = fessResult;
          model.ClassRoom.find({year:yearId,class:sys_class.id_class._id}).exec(function(err,classRoomsResult){
            if(!err){
              sys_class.classRooms = classRoomsResult;
              sys_class.ts = [];
              sumOfClassRooms.value += sys_class.classRooms.length;
              for(var i in sys_class.classRooms){
                setTS(system,sys_class,sys_class.classRooms[i]._id,yearId,counterOfClassRooms,sumOfClassRooms,cb);
              }
            }
          });
        }
      }
    });
  }
}

function addExams(custom,cb){
  var allExams=[],index=0;
  var counter={value:0};
  var sum={value:0};
  for(var cls=0; cls<custom.sys_class.length ; cls++){
    var classI = custom.sys_class[cls];
    model.Exam.find({system:custom._id,clas:classI.id_class})
    .exec(function(err,examsResult){
      if(!err){
        var exams = examsResult;
        custom.sys_class[index].exams = exams;
        sum.value+=exams.length;
        index++;
        for(var ex=0;ex<exams.length;ex++){
          var examI = exams[ex];
          addMarks(examI,custom,cb,counter,sum);
        }
      }else{
        cb(null);
        return;
      }
    });
  }
}

function addMarks(examI,custom,cb,counter,sum){
  model.MarksSub.find({exam:examI._id})
  .exec(function(err,marks){
    if(!err){
      examI.subjects=marks;
      counter.value++;
      if(counter.value == sum.value){
        var final =  {};
        final._id = custom._id;
        final.name = custom.name;
        final.description = custom.description;
        final.sys_class = [];
        for(var i =0 ; i<custom.sys_class.length ; i++){
          final.sys_class[i]={};
          final.sys_class[i].id_class = custom.sys_class[i].id_class;
          final.sys_class[i].selected = custom.sys_class[i].selected;
          final.sys_class[i].exams = [];
          for(var j =0;j<custom.sys_class[i].exams.length;j++){
            final.sys_class[i].exams[j]={
              _id:custom.sys_class[i].exams[j]._id,
              clas:custom.sys_class[i].exams[j].clas,
              name:custom.sys_class[i].exams[j].name,
              semester:custom.sys_class[i].exams[j].semester,
              type:custom.sys_class[i].exams[j].type,
              status:custom.sys_class[i].exams[j].status,
              system:custom.sys_class[i].exams[j].system,
              subjects:custom.sys_class[i].exams[j].subjects
            };
          }
          if(i== custom.sys_class.length-1){
            cb(final);
          }
        }
      }
    }else{
      cb(null);
      return;
    }
  });
}

function saveExam(examI,cb){
  console.log(examI);
  var exam = new model.Exam(examI);
  exam.save(function(err,examResult){
    if(!err){
      var subjects = examI.subjects;
      var subIndex = 0 ;
      for(var sub in subjects){
        var subjectsI = subjects[subIndex];
        subjectsI.exam = examResult._id;
        subjectsI.system = examI.system;
        saveMark(subjectsI,cb);
        subIndex++;
      }
    }else{
      // console.log(err);
      cb(false);
      return;
    }
  });
}
function saveMark(subjectsI,cb){
  var marksSubject = new model.MarksSub(subjectsI);
  marksSubject.save(function(err,marksResult){
    if(err){
      // console.log(err);
      cb(false);
      return;
    }
  });
}

var deleteSystem = function (id,cb){
  var flag = false;
  model.System.remove({_id:id}, function(err,result) {
    if (!err) {
      model.Exam.remove({system:id},function(err,result){
        if(!err){
          model.MarksSub.remove({system:id},function(err,result){
            if(!err){
              cb(2);
            }else{
              if(!flag){
                flag=true;
                cb(3);
              }
            }
          });
        }else{
          if(!flag){
            flag=true;
            cb(3);
          }
        }
      });
    } else {
      if(!flag){
        flag=true;
        cb(3);
      }
    }
  });
};

var addSystem = function(body,cb){
  var obj=body;
  system = new model.System(obj);
  system.save(function(err,sysResult){
    if (!err) {
      for(var clss in body.sys_class){
        var classI = body.sys_class[clss];
        var exams = classI.exams;
        for(var ex in exams){
          var examI=exams[ex];
          examI.system = sysResult._id;
          examI.clas = classI.id_class;
          saveExam(examI,cb);
        }
      }
      cb(true);
    } else {
      // console.log(err);
      cb(false);
    }
  });
};

function saveTS(tsObject,classRoom_id,counterFinalClassRooms,sumFinalClassRooms,cb){
  var obj = {year:tsObject.year , classRoom:classRoom_id , teacher:tsObject.teacher, subject:tsObject.subject._id };
  var tsObjectSaved = new model.TSC(obj);
  tsObjectSaved.save(function(err,result){
    if (!err) {
      counterFinalClassRooms.value++;
      if( counterFinalClassRooms.value == sumFinalClassRooms.value ){
        cb(true);
        return;
      }
    } else {
      // console.log(err);
      cb(false);
    }
  });
}

function saveClassRoom(classRoom,ts,counterFinalClassRooms,sumFinalClassRooms,cb){
  var obj = {year: classRoom.year, name:classRoom.name , room:classRoom.room , class:classRoom.class , sheft:classRoom.sheft };
  var classRoomSaved = new model.ClassRoom(obj);
  classRoomSaved.save(function(err,result){
    if (!err) {
      for(var i in ts){
        saveTS(ts[i],result._id,counterFinalClassRooms,sumFinalClassRooms,cb);
      }
    } else {
      // console.log(err);
      cb(false);
    }
  });
}

function saveFees(fees,classRooms,tss,counterFinalClassRooms,sumFinalClassRooms,cb){
  var feesSaved = new model.Fees(fees);
  feesSaved.save(function(err,result){
    if (!err) {
      for(var i in classRooms){
        sumFinalClassRooms.value += tss[i].length;
        saveClassRoom(classRooms[i],tss[i],counterFinalClassRooms,sumFinalClassRooms,cb);
      }
    } else {
      // console.log(err);
      cb(false);
    }
  });
}

function updateFees(fees,system,cb){
  model.Fees.remove({year:fees.year},function(err,result){
    if (!err){
      model.ClassRoom.remove({year:fees.year}, function(err,result){
        if(!err){
          model.TSC.remove({year:fees.year}, function(err,result){
            if(!err){
              system.flag = 1;
              addNewSystemSetting(system,cb);
            } else {
              // console.log(err);
              cb(false);
              return;
            }
          });
        } else {
          // console.log(err);
          cb(false);
          return;
        }
      });
    } else {
      // console.log(err);
      cb(false);
      return;
    }
  });
}

function addNewSystemSetting (system,cb){
  var counterFinalClassRooms = {value : 0};
  var sumFinalClassRooms = {value : 0};
  if( system.flag == 1 ){
    for(var i in system.sys_class){
      saveFees(system.sys_class[i].fees,system.sys_class[i].classRooms,system.sys_class[i].ts,counterFinalClassRooms,sumFinalClassRooms,cb);
    }
  }else{
    cb(false);
  }
}

module.exports = {

  addNewSystemSetting :addNewSystemSetting,
  updateSystemSetting : function(system,cb){
    if( system.flag == 2 ){
      updateFees(system.sys_class[0].fees,system,cb);
    }else{
      cb(false);
    }
  },
  
  getAllSystem :function(cb){
    model.System.find({}, function(err, systems){
      if(!err){
        cb(systems);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllSystems Count
  getAllSystemCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.System.count({school:school,status:1},function(err, count){
      model.System.find({school:school,status:1}).limit(limit).skip(page*limit)
      .populate('sys_class')
      .populate('selected')
      .exec(function(err,systems){
        if(!err){
          cb({result:systems,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllSystemStatus:function(status,cb){
    model.System.find({status:status})
    .populate('sys_class')
    .populate('selected')
    .exec(function(err, subjects){
      if(!err){
        cb(subjects);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getSystemName :function(name,cb){
    model.System.find({name :{ $regex:name, $options: 'i' }}).limit(30)
    .populate('sys_class')
    .populate('selected')
    .exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getSystemId :function(id,cb){
    model.System.findOne({_id : id})
    .populate('sys_class')
    .populate('selected')
    .exec(function(err, custom){
      if(!err){
        addExams(custom,cb);
      }else{
        cb(null);
      }
    });
  },

  getClassesAndClassRoomsBySystem :function(id,year,cb){
    model.System.findOne({_id : id})
    .populate('sys_class.id_class')
    .populate('sys_class.selected.id_subject')
    .exec(function(err, system1){
      if(!err){
        var system = JSON.parse(JSON.stringify(system1));
        system.flag = 0;
        var counterOfClassRooms = {value : 0};
        var sumOfClassRooms = {value : 0};
        for(var i in system.sys_class){
          systemSetting(system,system.sys_class[i],year,counterOfClassRooms,sumOfClassRooms,cb);
        }
      }else{
        cb(null);
      }
    });
  },

  addSystem : addSystem,
  deleteSystem : deleteSystem,
  // still update thier exams and  marks
  updateSystem : function(id,body,cb){
    var obj = body;
    deleteSystem(id,function(no){
      if(no == 2){
        addSystem(body,cb);
      }else{
        cb(false);
      }
    });
  }
};
