var model = require("../models");
var system = null;
var counter,sum,customResult;

function addExams(custom,cb){
  customResult = custom;
  var allExams=[],index=0;
  counter=0;
  sum=0;
  for(var cls=0; cls<custom.sys_class.length ; cls++){
    var classI = custom.sys_class[cls];
    model.Exam.find({system:custom._id,clas:classI.id_class})
    .exec(function(err,examsResult){
      if(!err){
        var exams = examsResult;
        custom.sys_class[index].exams = exams;
        sum+=exams.length;
        index++;
        for(var ex=0;ex<exams.length;ex++){
          var examI = exams[ex];
          addMarks(examI,custom,cb);
        }
      }else{
        cb(null);
        return;
      }
    });
  }
}

function addMarks(examI,custom,cb){
  model.MarksSub.find({exam:examI._id})
  .exec(function(err,marks){
    if(!err){
      examI.subjects=marks;
      counter++;
      if(counter == sum){
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
            subjects:custom.sys_class[i].exams[j].subjects};
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
      console.log(err);
      cb(false);
      return;
    }
  });
}
function saveMark(subjectsI,cb){
  var marksSubject = new model.MarksSub(subjectsI);
  marksSubject.save(function(err,marksResult){
    if(err){
      console.log(err);
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
}

var addSystem = function(body,cb){
  var obj=body;
  system = new model.System(obj);
  system.save(function(err,sysResult){
    if (!err) {
      var classIndex = 0;
      for(var clss in body.sys_class){

        var classI = body.sys_class[classIndex];
        var exams = classI.exams;
        var examsIndex = 0;
        for(var ex in exams){

          var examI=exams[examsIndex];
          examI.system = sysResult._id;
          examI.clas = classI.id_class;
          saveExam(examI,cb);
          examsIndex++;
        }
        classIndex++;
      }
      cb(true);
    } else {
      console.log(err);
      cb(false);
    }
  });
}

module.exports = {

  getAllSystem :function(cb){
    model.System.find({}, function(err, systems){
      if(!err){
        cb(systems);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  //getAllSystems Count
  getAllSystemCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.System.count({},function(err, count){
      model.System.find({}).limit(limit).skip(page*limit)
      .populate('sys_class')
      .populate('selected')
      .exec(function(err,systems){
        if(!err){
          cb({result:systems,count:count});
        }else{
          console.log(err);
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
        console.log(err);
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

  addSystem : addSystem,
  deleteSystem : deleteSystem,
  // still update thier exams and  marks
  updateSystem : function(id,body,cb){
    obj = body;
    deleteSystem(id,function(no){
      if(no == 2){
        addSystem(body,cb);
      }else{
        cb(false);
      }
    });
  }
};
