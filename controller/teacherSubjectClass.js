var model = require('../models');
var TSC1 = null;

module.exports = {

  getAllTSC :function(cb){
    model.TSC.find({status:1}, function(err, TSCs){
      if(!err){
        cb(TSCs);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getAllTSCStatus:function(status,cb){
    model.TSC.find({status:status},function(err, TSCs){
      if(!err){
        cb(TSCs);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getTSCId :function(id,cb){
    model.TSC.findOne({_id : id}, function(err, TSCs){
      if(!err){
        cb(TSCs);
      }else{
        cb(null);
      }
    });
  },

  addTSC : function(body,cb){
    var obj =body;
    TSC1 = new model.TSC(obj);
    TSC1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateTSC : function(id,body,cb){
    var obj = body;
    model.TSC.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  
  getTeacherClassSubject : function(id,cb){
    model.Year.findOne({active : 1}, function(err, activeYear){
      if(!err){
        model.TSC.find({teacher:id,status:1,year:activeYear._id}).populate('classRoom subject').exec(function(err, teachers){
          if(!err){
            cb(teachers);
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
  getTeacherSubject : function(classroom,year,cb){
    console.log(classroom+" ammm "+year);
    model.TSC.find({year:year,classRoom:classroom}).exec(function(err, teachers){
      if(!err){
        console.log(teachers);
        var teacherSub=[];
        for(var t in teachers){
          teacherSub[teachers[t].subject]=teachers[t].teacher;
          if(t == teachers.length-1){
            cb(teacherSub);    
          }
        }
      }else{
        // console.log(err);
        cb(null);
      }
    });
  }
};